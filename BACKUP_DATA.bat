@echo off
cd /d "%~dp0"
if not exist data mkdir data
if not exist backups mkdir backups
for /f "tokens=1-3 delims=/- " %%a in ('date /t') do set d=%%c-%%a-%%b
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set t=%%a%%b
set t=%t::=-%
copy /Y data\db.json backups\db-%date:~-4,4%-%date:~-10,2%-%date:~-7,2%-%time:~0,2%-%time:~3,2%.json >nul
 echo Backup selesai di folder backups.
pause
