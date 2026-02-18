@echo off
echo ========================================
echo   Portfolio Development Environment
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd server && venv\Scripts\activate && python main.py"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
