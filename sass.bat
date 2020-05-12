@echo off
cd /d "C:\Users\Plante Amor\OneDrive\Development\murau-files"
cmd /k "sass scss/bootstrap.scss:css/murau-bootstrap.min.js --style=compressed --watch"
cmd /k "sass scss/bootstrap.scss:css/murau-bootstrap.js --watch"
pause