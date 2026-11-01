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
rem      updater\update-from-gitee.bat [--source auto|github|gitee]
rem  Extra arguments are forwarded to sync.ps1 as-is (both -Source and
rem  --source spellings are accepted by PowerShell).
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
cd /d "%~dp0.."

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1" -Mode update %*
set "RC=%ERRORLEVEL%"

echo.
pause
exit /b %RC%
