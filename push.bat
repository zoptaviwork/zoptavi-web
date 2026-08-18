@echo off
cd /d "%~dp0"
echo ===================================
echo   Pushing Zoptavi E-commerce to GitHub
echo ===================================
echo.

git add .
git commit -m "Update site %date% %time%"
git push origin main

echo.
echo ===================================
echo   Done. Press any key to close.
echo ===================================
pause >nul
