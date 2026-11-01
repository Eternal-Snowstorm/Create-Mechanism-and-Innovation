@echo off
rem ===========================================================================
rem  CMI pack updater - one-click GitHub sync entry point (Windows)
rem
rem  Double-click this file to bring this pack up to date with the GitHub repo.
rem  It only calls update-cmi.ps1 next to it; keep both files in one folder.
rem
rem  PURE ASCII on purpose (same reason as updater\setup-gitee-sync.bat):
rem  cmd.exe parses .bat files by byte offset, so multi-byte characters mixed
rem  with a mid-file "chcp" can break parsing; and UTF-8 Chinese would show as
rem  mojibake on a cp936 console. All Chinese messages live in update-cmi.ps1.
rem
rem  NOTE ON ENCODING OF THE .ps1 (important):
rem  We do NOT hand the script to "powershell -File", because Windows PowerShell
rem  5.1 parses a .ps1 that has NO BOM as the system ANSI codepage (GBK here) and
rem  every Chinese message turns into mojibake / a parse error. Instead we read
rem  the file explicitly as UTF-8 and run the resulting scriptblock, so it works
rem  whether or not the file kept its BOM. (-ScriptDir replaces $PSScriptRoot,
rem  which is empty inside a scriptblock.)
rem
rem  Shipped with the pack: this file lives in updater/ and IS tracked by git,
rem  so every player receives it. Keep it next to update-cmi.ps1.
rem ===========================================================================
setlocal
chcp 936 >nul

rem ===========================================================================
rem  Opening banner: ASCII "cube" artwork supplied by a collaborator (cmi.bat).
rem  Kept pure ASCII so it renders identically on any console code page.
rem ===========================================================================
echo                     __________________________________     _____
echo                    /                                 /}   /    /}
echo                   /    ________________________     / }  /____/_}__
echo                  /    /}                      /    / /  }    /    /}
echo                 /    / }_____________________/____/ /   }___/____/_}__
echo                /    / /                     }    } /       }    /    /}
echo               /    / /         _____        }____}/_____   }___/____/_}__
echo              /    / /         /    /}             /    /}     }    /    /}
echo             /    / /         /    /_}__     _____/    / }     }___/____/ }
echo            /    / /         /         /}   /         / /         }    } /
echo           /    /_/___      /    _____/_}__/____     / /  ________}____}/
echo          /          /}    /    /}   /    /}   /    / /  /          /}
echo         /__________/ }   /    / }__/____/ }__/    / /  /    ______/ }
echo        }          } /   /    / /  }    } /  /    / /  /    /}    } /
echo       _}__________}/   /    / /   }____}/  /    / /  /    / }____}/
echo      /    /}          /    / /            /    / /  /    / /
echo     /____/_}__       /____/ /            /____/ /  /    / /
echo    }    /    /}     }    } /            }    } /  /    / /
echo    }___/____/_}__   }____}/             }____}/  /    / /
echo       }    /    /}                              /    / /
echo       }___/____/_}__       ____________________/    /_/___
echo          }    /    /}     /                              /}
echo          }___/____/ }    /______________________________/ }
echo             }     } /   }                              } /
echo             }_____}/    }______________________________}/
echo .
echo .
timeout /t 2 >NUL
echo Development Preview
echo .
timeout /t 2 >NUL

set "PS1=%~dp0update-cmi.ps1"
if not exist "%PS1%" (
  echo [ERROR] update-cmi.ps1 is missing.
  echo         Keep Update-CMI.bat and update-cmi.ps1 in the same folder.
  echo.
  pause
  exit /b 1
)

where powershell >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Windows PowerShell not found on this system.
  echo.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$src = Get-Content -LiteralPath '%~dp0update-cmi.ps1' -Raw -Encoding UTF8; & ([scriptblock]::Create($src)) -ScriptDir '%~dp0'"
set "RC=%ERRORLEVEL%"

echo.
pause
exit /b %RC%
