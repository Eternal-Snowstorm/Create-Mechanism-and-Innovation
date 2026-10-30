@echo off
rem ===========================================================================
rem  CMI pack updater - first-time setup entry point (Windows)
rem
rem  Links this client to the repository (GitHub first; the Gitee mirror is
rem  used when GitHub is unreachable or has no remote yet), applies its
rem  content, then downloads / verifies mods against the update manifest.
rem
rem  PURE ASCII on purpose - see updater\update-from-gitee.bat for the reason.
rem  All user-facing Chinese messages live in sync.ps1 (UTF-8 encoded).
rem
rem  Usage: double-click this file, or run from cmd:
rem      updater\setup-gitee-sync.bat [--source auto|github|gitee]
rem  Extra arguments are forwarded to sync.ps1 as-is (both -Source and
rem  --source spellings are accepted by PowerShell).
rem ===========================================================================
setlocal
chcp 936 >nul
cd /d "%~dp0.."

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1" -Mode setup %*
set "RC=%ERRORLEVEL%"

echo.
pause
exit /b %RC%
