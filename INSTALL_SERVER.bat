@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title CetakFlow - Instalasi Server
color 0F

echo.
echo ============================================================
echo              CETAKFLOW - INSTALASI SERVER
 echo ============================================================
echo Folder aplikasi: %CD%
echo.

echo [1/4] Memeriksa Node.js...
where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js belum terinstall atau belum masuk PATH.
  echo Install Node.js LTS dari:
  echo https://nodejs.org/
  echo Setelah install, TUTUP SEMUA CMD lalu jalankan file ini lagi.
  echo.
  goto :failed
)
node --version
echo.

echo [2/4] Memeriksa npm...
where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] npm tidak ditemukan.
  goto :failed
)
call npm.cmd --version
echo.

echo [3/4] Menginstall dependency. Proses ini bisa beberapa menit...
echo.
call npm.cmd install
if errorlevel 1 (
  echo.
  echo [INFO] Instalasi dependency standar gagal.
  echo Mencoba mode kompatibilitas npm...
  echo.
  call npm.cmd install --legacy-peer-deps
  if errorlevel 1 (
    echo.
    echo [ERROR] Instalasi dependency tetap gagal.
    echo Periksa pesan error di atas.
    goto :failed
  )
)

echo.
echo [4/4] Membuat production build...
echo.
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build aplikasi gagal.
  goto :failed
)

echo.
if not exist "%CD%\data" mkdir "%CD%\data"

echo ============================================================
echo                 INSTALASI BERHASIL!
echo ============================================================
echo.
echo Jalankan START_SERVER.bat untuk menjalankan CetakFlow.
echo Komputer lain dapat membuka: http://IP-KOMPUTER-SERVER:3000
 echo.
pause
exit /b 0

:failed
echo.
echo ============================================================
echo INSTALASI GAGAL - JANGAN TUTUP JENDELA INI
 echo ============================================================
echo Screenshot pesan error ini dan kirim kepada saya.
echo.
pause
exit /b 1
