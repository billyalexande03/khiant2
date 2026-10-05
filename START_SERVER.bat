@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title CetakFlow - Server
color 0F

echo.
echo ============================================================
echo                    CETAKFLOW SERVER
 echo ============================================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js tidak ditemukan.
  echo Jalankan INSTALL_SERVER.bat setelah Node.js terinstall.
  pause
  exit /b 1
)
if not exist "%CD%\dist" (
  echo [ERROR] Folder dist belum ada.
  echo Jalankan INSTALL_SERVER.bat terlebih dahulu.
  pause
  exit /b 1
)

echo Server sedang dijalankan...
echo Jangan tutup jendela ini selama CetakFlow digunakan.
echo.
echo PC ini: http://localhost:3000
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R /C:"IPv4 Address" /C:"IPv4"') do echo Jaringan: http://%%A:3000
 echo.
echo ============================================================
call npm.cmd start

echo.
echo Server berhenti. Tekan tombol apa saja untuk menutup.
pause >nul
