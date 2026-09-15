@echo off
rem ===========================================================================
rem  CMI pack updater - daily update entry point (Windows)
rem
rem  This file is intentionally kept PURE ASCII (English comments only).
rem  Reason: cmd.exe parses .bat files by byte offset, so a file that mixes
rem  multi-byte characters (Chinese) with a mid-file "chcp" can be parsed out
rem  of sync; storing Chinese as UTF-8 instead shows mojibake on a cp936
rem  console. Keeping the entry point ASCII makes it readable in any editor
rem  and in any encoding, including UTF-8.
rem
rem  All user-facing Chinese messages live in sync.ps1 (UTF-8 encoded).
rem
rem  Usage: double-click this file, or run from cmd:
rem      updater\update-from-gitee.bat
rem ===========================================================================
setlocal
chcp 936 >nul
cd /d "%~dp0.."

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1" -Mode update
set "RC=%ERRORLEVEL%"

echo.
pause
exit /b %RC%
