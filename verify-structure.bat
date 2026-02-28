@echo off
REM TypeScript Structure Verification Script
echo ========================================
echo TypeScript Structure Verification
echo ========================================
echo.

cd /d "%~dp0client\src"

echo [1/5] Checking for duplicate ContactSection files...
dir /s /b ContactSection.* 2>nul | find /c /v "" > nul
if %errorlevel% equ 0 (
    dir /s /b ContactSection.*
    echo.
) else (
    echo No ContactSection files found
    echo.
)

echo [2/5] Checking for .jsx files in sections/...
cd sections
dir /b *.jsx 2>nul
if %errorlevel% equ 0 (
    echo Found .jsx files (OK - mixed structure allowed)
) else (
    echo No .jsx files found
)
echo.

cd ..
echo [3/5] Checking for phantom components/sections/ directory...
if exist "components\sections" (
    echo ERROR: components/sections/ exists - should not exist!
    dir /b components\sections
) else (
    echo OK: No components/sections/ directory
)
echo.

echo [4/5] Running TypeScript type check...
cd ..\..
cd client
call npm run build > nul 2>&1
if %errorlevel% equ 0 (
    echo OK: TypeScript build passed
) else (
    echo ERROR: TypeScript build failed
)
echo.

echo [5/5] Verifying dist output...
if exist "dist\index.html" (
    echo OK: dist/index.html exists
    dir dist\assets\*.js | find /c ".js" > nul
    echo OK: JavaScript bundles generated
) else (
    echo ERROR: dist folder not found
)
echo.

echo ========================================
echo Verification Complete
echo ========================================
