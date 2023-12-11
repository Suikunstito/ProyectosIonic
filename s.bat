@echo off

:menu
cls
echo *************************************************************
echo MENU DE OPCIONES PARA USAR COMANDO "ionic" CON CAPACITOR
echo Desarrollado por: Cristian Gomez Vega
echo cgomezvega@triskeledu.cl, cri.gomezv@profesor.duoc.cl
echo *************************************************************
echo.
echo (1) Ejecutar en navegador (ionic serve)
echo (2) Compilar y ejecutar en android
echo (3) Compilar y ejecutar en ios con
echo (4) Agregar soporte de capacitor para android
echo (5) Agregar soporte de capacitor para ios
echo (6) Solo compilar
echo (7) Solo ejecutar en android
echo (8) Solo ejecutar en ios
echo (9) Instalar paquetes de node de la aplicacion
echo (10) Actualizar paquetes de node de la aplicacion
echo (11) Actualizar paquetes globales
echo (12) Instalar JSON-SERVER
echo (13) Ejecutar JSON-SERVER usando localhost
echo (14) Ejecutar JSON-SERVER usando una IP
echo (15) Salir
echo.
set /p opcion="Selecciona una opcion: "
if %opcion%==1 (
  call : 
) else if %opcion%==2 (
  call :opcion2
) else if %opcion%==3 (
  call :opcion3
) else if %opcion%==4 (
  call :opcion4
) else if %opcion%==5 (
  call :opcion5
) else if %opcion%==6 (
  call :opcion6
) else if %opcion%==7 (
  call :opcion7
) else if %opcion%==8 (
  call :opcion8
) else if %opcion%==9 (
  call :opcion9
) else if %opcion%==10 (
  call :opcion10
) else if %opcion%==11 (
  call :opcion11
) else if %opcion%==12 (
  call :opcion12
) else if %opcion%==13 (
  call :opcion13
) else if %opcion%==14 (
  call :opcion14
) else if %opcion%==15 (
  call :opcion15
) else (
    echo Opcion no valida. Por favor, selecciona una opcion válida.
    pause
    goto menu
)
exit /b



rem +++++++++ OPCION 1: Ejecutar en navegador (ionic serve) ++++++
:opcion1
call :ver "[1] EJECUTAR EN NAVEGADOR DE INTERNET: ionic serve"
call ionic serve
exit /b



rem ++++++++++ OPCION 2: Compilar y ejecutar en Android+++++++++++
:opcion2
cls
call :ver "[2] COMPILAR Y EJECUTAR APLICACION EN ANDROID"
set host=""
set port=""
set target=""
set /p host="Introduce direccion IP de tu equipo (default: 192.168.100.34): "
if %host%=="" set "host=192.168.100.34"
set /p port="Introduce el puerto (default: 8100): "
if %port%=="" set port=8100
set /p target="Introduce el nombre del dispositivo (default: R58T614VCGP): "
if %target%=="" set "target=R58T614VCGP"
call :ver "COMPILAR APLICACION: ionic build"
call ionic build
echo *************************************************************
echo EJECUTAR APLICACION
echo   Comando: ionic cap run android
echo   Para usar live reload  : -l --external 
echo   Para indicar tu equipo : --host=[IP de tu equipo]
echo   Para indicar tu movil  : --target=[Nombre de tu movil]
echo *************************************************************
echo.
echo.
call ionic cap run android -l --external --host=%host% --port=%port% --target=%target%
exit /b



rem ++++++++++++ OPCION 3: Compilar y ejecutar en ios+++++++++++++
:opcion3
cls
call :ver "[3] COMPILAR Y EJECUTAR APLICACION EN IOS"
set host=""
set port=""
set target=""
set /p host="Introduce direccion IP de tu equipo (default: 192.168.100.34): "
if %host%=="" set "host=192.168.100.34"
set /p port="Introduce el puerto (default: 8100): "
if %port%=="" set port=8100
set /p target="Introduce el nombre del dispositivo (default: R58T614VCGP): "
if %target%=="" set "target=R58T614VCGP"
call :ver "COMPILAR APLICACION: ionic build"
call ionic build
echo *************************************************************
echo EJECUTAR APLICACION
echo   Comando: ionic cap run ios
echo   Para usar live reload  : -l --external 
echo   Para indicar tu equipo : --host=[IP de tu equipo]
echo   Para indicar tu movil  : --target=[Nombre de tu movil]
echo *************************************************************
echo.
echo.
call ionic cap run ios -l --external --host=%host% --port=%port% --target=%target%
exit /b



rem +++++++++++++ OPCION 4: Agregar soporte android+++++++++++++++
:opcion4
cls
call :ver "[4] AGREGAR SOPORTE PARA ANDROID: ionic cap add android"
call ionic cap add android
exit /b



rem ++++++++++++++++ OPCION 5: Agregar soporte ios +++++++++++++++
:opcion5
cls
call :ver "[5] AGREGAR SOPORTE PARA IOS: ionic cap add ios"
call ionic cap add ios
exit /b



rem ++++++++++++++++ OPCION 6: Solo compilar +++++++++++++++++++++
:opcion6
cls
call :ver "[6] COMPILAR APLICACION: ionic build"
call ionic build
exit /b



rem ++++++++++++++ OPCION 7: Solo ejecutar en android ++++++++++++
:opcion7
cls
echo *************************************************************
echo [7] EJECUTAR APLICACION
echo   Comando: ionic cap run android
echo   Para usar live reload  : -l --external 
echo   Para indicar tu equipo : --host=[IP de tu equipo]
echo   Para indicar tu movil  : --target=[Nombre de tu movil]
echo *************************************************************
echo.
echo.
set host=""
set port=""
set target=""
set /p host="Introduce la direccion IP de tu equipo (default: 192.168.100.34): "
if %host%=="" set "host=192.168.100.34"
set /p port="Introduce el puerto (default: 8100): "
if %port%=="" set port=8100
set /p target="Introduce el nombre del dispositivo (default: R58T614VCGP): "
if %target%=="" set "target=R58T614VCGP"
call ionic cap run android -l --external --host=%host% --port=%port% --target=%target%
exit /b



rem ++++++++++++++++ OPCION 8: Solo ejecutar en ios ++++++++++++++
:opcion8
cls
echo *************************************************************
echo [8] EJECUTAR APLICACION
echo   Comando: ionic cap run ios
echo   Para usar live reload  : -l --external 
echo   Para indicar tu equipo : --host=[IP de tu equipo]
echo   Para indicar tu movil  : --target=[Nombre de tu movil]
echo *************************************************************
echo.
echo.
set host=""
set port=""
set target=""
set /p host="Introduce la direccion IP del host (default: 192.168.100.34): "
if %host%=="" set "host=192.168.100.34"
set /p port="Introduce el puerto (default: 8100): "
if %port%=="" set port=8100
set /p target="Introduce el nombre del dispositivo (default: R58T614VCGP): "
if %target%=="" set "target=R58T614VCGP"
call ionic cap run ios -l --external --host=%host% --port=%port% --target=%target%
exit /b



rem ++++ OPCION 9: Instalar paquetes de node de la aplicacion+++++
:opcion9
cls
call :ver "[9] ACTUALIZAR PAQUETES NODE DE LA APLICACION"
call npm install
exit /b



rem +++ OPCION 10: Actualizar paquetes de node de la aplicacion ++
:opcion10
cls
call :ver "[10] ACTUALIZAR PAQUETES NODE DE LA APLICACION"
call :ver "ng add @angular/material"
call ng add @angular/material
call :ver "npm i typescript@5.0.4"
call npm i typescript@5.0.4
call :ver "npm i rxjs@7.4.0"
call npm i rxjs@7.4.0
call :ver "npm i native-run"
call npm i native-run
call :ver "npm i @capacitor/device"
call npm i @capacitor/device
call :ver "npm i @capacitor/camera"
call npm i @capacitor/camera
call :ver "echo npm i @capacitor/geolocation"
call npm i @capacitor/geolocation
call :ver "npm i @capacitor-community/sqlite --save"
call npm i @capacitor-community/sqlite --save
call :ver "npm i @ionic/storage-angular"
call npm i @ionic/storage-angular
call :ver "npm i jsqr@latest --save"
call npm i jsqr@latest --save
call :ver "npm i jeep-sqlite --save"
call npm i jeep-sqlite --save
call :ver "npm install --save sql.js"
call npm install --save sql.js
call :ver "npm install @capacitor-mlkit/barcode-scanning"
call npm install @capacitor-mlkit/barcode-scanning
exit /b

rem ++++++++++ OPCION 11: Actualizar paquetes globales +++++++++++
:opcion11
cls
call :ver "[11] Actualizar paquetes globales"
call nvm use 18.10.0
call npm i --location=global @angular/cli@16.1.7
call npm i --location=global @capacitor/app@latest
call npm i --location=global @capacitor/cli@latest
call npm i --location=global @capacitor/core@latest
call npm i --location=global @capacitor/haptics@latest
call npm i --location=global @capacitor/keyboard@latest
call npm i --location=global @capacitor/status-bar@latest
call npm i --location=global @ionic/cli@7.1.1
call npm i --location=global cordova-res@latest
call npm i --location=global cordova@latest
call npm i --location=global corepack@latest
call npm i --location=global native-run@1.7.2
call npm i --location=global npm@9.8.1
call npm i --location=global rxjs@7.4.0
call npm i --location=global typescript@5.1.6
exit /b



rem +++++++++++++++ OPCION 12: Instalar JSON-SERVER ++++++++++++++
:opcion12
cls
call :ver "[12] Instalar JSON-SERVER"
call npm install -g json-server
exit /b



rem ++++++ OPCION 13: Ejecutar JSON-SERVER usando localhost ++++++
:opcion13
cls
call :ver "[13] Ejecutar JSON-SERVER usando localhost"
call json-server --watch .\_JSON-SERVER\publicaciones.json
exit /b



rem +++++++ OPCION 14: Ejecutar JSON-SERVER usando una IP ++++++++
:opcion14
cls
call :ver "[14] Ejecutar JSON-SERVER usando una IP"
set host=""
set /p host="Introduce la direccion IP de tu equipo (default: 192.168.100.34): "
if %host%=="" set "host=192.168.100.34"
call json-server --host=%host% --watch .\_JSON-SERVER\publicaciones.json
exit /b



rem ++++++++++++++++++++ OPCION 15: Salir ++++++++++++++++++++++++
:opcion15
cls
call :ver "Autor: Cristian Gomez Vega, cgomezvega@triskeledu.cl, cri.gomezv@profesor.duoc.cl"
exit /b



rem +++ FUNCION ver: Para mostrar un mensaje en pantalla+++
:ver
echo.
echo *************************************************************
echo %1
echo *************************************************************
echo.
echo.
goto :EOF
