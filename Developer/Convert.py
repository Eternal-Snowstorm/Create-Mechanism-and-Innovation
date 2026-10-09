#!/usr/bin/env python3
import os
import json
import hashlib
import argparse
from pathlib import Path

def calculate_sha256(file_path):
	"""计算文件的 SHA-256 哈希值"""
	sha256_hash = hashlib.sha256()
	with open(file_path, "rb") as f:
		for byte_block in iter(lambda: f.read(4096), b""):
			sha256_hash.update(byte_block)
	return sha256_hash.hexdigest()

def is_targeted_file(rel_path, target_folders):
	"""
	判断某个相对路径是否属于指定的目标文件夹列表
	"""
	if not target_folders:
		return True  # 如果没有指定，则扫描全部（兼容旧逻辑）
	
	# 标准化路径格式：去除开头/结尾斜杠，统一使用正斜杠
	rel_path = rel_path.replace("\\", "/").strip("/")
	
	for folder in target_folders:
		folder = folder.replace("\\", "/").strip("/")
		# 精确匹配该文件夹本身，或者以该文件夹/开头
		if rel_path == folder or rel_path.startswith(folder + "/"):
			return True
	return False

def should_ignore(rel_path, ignore_patterns):
	"""根据忽略模式跳过文件（例如临时文件, 日志等）"""
	for pattern in ignore_patterns:
		pattern = pattern.replace("\\", "/")
		if pattern in rel_path or Path(rel_path).match(pattern):
			return True
	return False

def generate_checksums(root_dir, target_folders, ignore_patterns=None,
					   default_severity_missing="INFO",
					   default_severity_changed="WARNING",
					   default_required=False):
	"""
	只扫描 target_folders 中指定的文件夹，生成 VartaPack 格式的 JSON
	"""
	if ignore_patterns is None:
		ignore_patterns = ["*.tmp", "*.log", "__pycache__", ".git", "logs", "cache"]

	root_path = Path(root_dir).resolve()
	files_list = []

	for file_path in root_path.rglob("*"):
		if not file_path.is_file():
			continue
		
		# 获取相对路径（使用正斜杠）
		rel_path = str(file_path.relative_to(root_path)).replace("\\", "/")
		
		# 1. 先检查是否在目标文件夹内（核心过滤）
		if not is_targeted_file(rel_path, target_folders):
			continue
		
		# 2. 再检查是否忽略
		if should_ignore(rel_path, ignore_patterns):
			continue

		# 计算哈希
		try:
			sha256 = calculate_sha256(file_path)
		except Exception as e:
			print(f"⚠️ 无法读取文件 {rel_path}: {e}")
			continue

		entry = {
			"path": rel_path,
			"sha256": sha256,
			"required": default_required,
			"severityIfMissing": default_severity_missing,
			"severityIfChanged": default_severity_changed,
			"displayName": f"File: {file_path.name}",
			"reason": "File integrity check",
			"fix": "Restore from backup or reinstall"
		}
		files_list.append(entry)

	result = {
		"schema": 1,
		"files": files_list
	}
	return result

def main():
	parser = argparse.ArgumentParser(description="VartaPack 专用：仅扫描指定文件夹生成文件校验 JSON")
	parser.add_argument("--root", default=".", help="整合包根目录 (默认当前目录)")
	parser.add_argument("--targets", nargs="+", required=True,
						help="要扫描的子文件夹，相对于 root，例如: --targets kubejs/startup_scripts config scripts")
	parser.add_argument("--output", default="checksums.json", help="输出 JSON 文件名")
	parser.add_argument("--severity-missing", default="ERROR", choices=["INFO", "WARNING", "ERROR", "CRITICAL"],
						help="文件缺失时的默认严重级别")
	parser.add_argument("--severity-changed", default="ERROR", choices=["INFO", "WARNING", "ERROR", "CRITICAL"],
						help="文件哈希不匹配时的默认严重级别")
	parser.add_argument("--required", action="store_true", default=True,
						help="默认将所有文件设为 required (必需)")
	parser.add_argument("--ignore", nargs="*", default=[],
						help="额外忽略模式，例如 --ignore '*.bak' 'temp/*'")
	args = parser.parse_args()

	# 默认忽略常见无用文件
	default_ignores = ["*.tmp", "*.log", "__pycache__", ".git", "logs", "cache"]
	ignore_patterns = default_ignores + args.ignore

	print(f"🔍 扫描目录: {args.root}")
	print(f"📁 仅限目标文件夹: {args.targets}")
	
	result = generate_checksums(
		args.root,
		target_folders=args.targets,
		ignore_patterns=ignore_patterns,
		default_severity_missing=args.severity_missing,
		default_severity_changed=args.severity_changed,
		default_required=args.required
	)

	with open(args.output, "w", encoding="utf-8") as f:
		json.dump(result, f, indent=2, ensure_ascii=False)

	print(f"✅ 完成！共生成 {len(result['files'])} 个文件条目，保存至 {args.output}")

if __name__ == "__main__":
	main()

# ==========用法==========
# 在命令行(cmd)里用cd转到.py文件所处的目录里,输入
# python [文件名].py --root [需要检测的文件夹的根(上级)目录] --targets [需要检测的文件夹名，可以写多个，中间用空格分隔] --output [输出文件名].json
# =======================