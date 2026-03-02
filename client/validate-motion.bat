@echo off
echo ================================
echo Motion Import Validation Script
echo ================================
echo.

echo 1. Checking framer-motion installation...
npm list framer-motion >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] framer-motion is installed
    npm list framer-motion | findstr framer-motion
) else (
    echo    [ERROR] framer-motion is NOT installed
    echo    Installing framer-motion...
    npm install framer-motion
)

echo.
echo 2. Verifying imports in all files...

set "files=src\components\Navbar.jsx src\components\ProjectCard.jsx src\components\CertificateCard.jsx src\sections\HomeSection.jsx src\sections\AboutSection.jsx src\sections\ProjectsSection.jsx src\sections\EngineeringHighlightsSection.jsx src\sections\GitHubSection.jsx src\sections\CertificatesSection.jsx src\sections\ContactSection.jsx"

set all_good=1

for %%f in (%files%) do (
    if exist "%%f" (
        findstr /i "import.*motion.*framer-motion" "%%f" >nul 2>&1
        if !errorlevel! equ 0 (
            echo    [OK] %%f
        ) else (
            echo    [ERROR] %%f - MISSING IMPORT
            set all_good=0
        )
    ) else (
        echo    [WARNING] %%f - FILE NOT FOUND
    )
)

echo.
echo 3. Running build test...
npm run build >nul 2>&1
if %errorlevel% equ 0 (
    echo    [OK] Build successful
) else (
    echo    [ERROR] Build failed
    set all_good=0
)

echo.
echo ================================
if %all_good% equ 1 (
    echo [OK] ALL CHECKS PASSED - PRODUCTION READY
) else (
    echo [ERROR] SOME CHECKS FAILED - REVIEW ABOVE
)
echo ================================
pause
