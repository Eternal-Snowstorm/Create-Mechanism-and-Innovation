@echo off
rem ===========================================================================
rem  CMI pack updater - first-time setup entry point (Windows)
rem
rem  Links this client to the Gitee mirror repository, applies its content,
rem  then downloads / verifies mods against the update manifest.
rem
rem  PURE ASCII on purpose - see updater\update-from-gitee.bat for the reason.
rem  All user-facing Chinese messages live in sync.ps1 (UTF-8 encoded).
rem
rem  Usage: double-click this file, or run from cmd:
rem      updater\setup-gitee-sync.bat
rem ===========================================================================
setlocal
chcp 936 >nul
cd /d "%~dp0.."

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1" -Mode setup
set "RC=%ERRORLEVEL%"

echo.
pause
exit /b %RC%
