@echo off
:: ============================================================
::   POKEMON TCG - LANZADOR DE SERVIDOR
::   Compatible con Windows 10 y Windows 11
:: ============================================================

:: Habilitar UTF-8 y colores ANSI en la terminal de Windows
chcp 65001 >nul 2>&1
title Pokemon TCG - Lanzando servidor...

:: Fijar el directorio de trabajo al directorio del archivo .bat
:: (funciona sin importar desde donde se ejecute: escritorio, CMD, etc.)
cd /d "%~dp0"

echo.
echo ============================================================
echo    POKEMON TCG - SISTEMA DE DESPLIEGUE SEGURO
echo ============================================================
echo.

:: ============================================================
:: PASO 1: Detectar Python con la siguiente prioridad:
::   py -3.12  (Python Launcher, version optima)
::   py -3.11  (Python Launcher, version optima)
::   py -3.13  (Python Launcher, modo compatibilidad)
::   py -3.10  (Python Launcher, modo compatibilidad)
::   py        (Python Launcher, version desconocida)
::   python    (comando global, puede ser Microsoft Store)
:: ============================================================

set PYTHON_EXE=
set PYTHON_VER=
set COMPAT_MODE=0

:: Intentar py -3.12
py -3.12 --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_EXE=py -3.12
    set PYTHON_VER=3.12
    goto :python_found
)

:: Intentar py -3.11
py -3.11 --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_EXE=py -3.11
    set PYTHON_VER=3.11
    goto :python_found
)

:: Intentar py -3.13 (modo compatibilidad)
py -3.13 --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_EXE=py -3.13
    set PYTHON_VER=3.13
    set COMPAT_MODE=1
    goto :python_found
)

:: Intentar py -3.10 (modo compatibilidad)
py -3.10 --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_EXE=py -3.10
    set PYTHON_VER=3.10
    set COMPAT_MODE=1
    goto :python_found
)

:: Intentar py generico (version desconocida - dejar que run.py la valide)
py --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_EXE=py
    goto :python_found
)

:: Intentar python (ultima opcion - puede ser Microsoft Store en Win10/11)
python --version >nul 2>&1
if %errorlevel% == 0 (
    :: Verificar que no sea el stub de Microsoft Store (devuelve 9009 al ejecutar)
    python -c "import sys; sys.exit(0)" >nul 2>&1
    if %errorlevel% == 0 (
        set PYTHON_EXE=python
        goto :python_found
    )
)

:: ---- Python no encontrado ----
echo   [X] ERROR: No se encontro Python en este equipo.
echo.
echo   Este proyecto requiere Python 3.11 o 3.12 para funcionar.
echo.
echo   [i] Descarga Python 3.12 (version recomendada):
echo       https://www.python.org/downloads/release/python-31210/
echo.
echo   IMPORTANTE: Durante la instalacion, activa la opcion
echo               "Add Python to PATH" antes de instalar.
echo.
pause
exit /b 1

:python_found
:: ============================================================
:: PASO 2: Manejar Modo Compatibilidad
:: ============================================================

if %COMPAT_MODE% == 0 goto :version_ok

echo   [!] ATENCION: Python %PYTHON_VER% detectado.
echo.
echo   Este software fue probado exclusivamente en Python 3.11 y 3.12.
echo   Con Python %PYTHON_VER% pueden ocurrir errores inesperados.
echo.

if "%PYTHON_VER%" == "3.13" (
    echo   Riesgo conocido con Python 3.13:
    echo     - Algunas dependencias pueden requerir compilar desde Rust.
    echo     - Si la instalacion de dependencias falla, usa Python 3.12.
)
if "%PYTHON_VER%" == "3.10" (
    echo   Riesgo conocido con Python 3.10:
    echo     - Algunas APIs de pydantic v2 pueden no estar disponibles.
    echo     - Actualizar a Python 3.12 es muy recomendado.
)

echo.
echo   [i] Version recomendada: Python 3.12
echo       https://www.python.org/downloads/release/python-31210/
echo.
set /p CONTINUAR="   Desea continuar de todas formas? [S/n]: "

if /i "%CONTINUAR%" == "n" goto :usuario_cancelo
if /i "%CONTINUAR%" == "no" goto :usuario_cancelo
goto :version_ok

:usuario_cancelo
echo.
echo   Ejecucion cancelada.
echo.
echo   [i] Para una experiencia garantizada, instala Python 3.12:
echo       https://www.python.org/downloads/release/python-31210/
echo.
echo   IMPORTANTE: Durante la instalacion, activa la opcion
echo               "Add Python to PATH" antes de instalar.
echo.
pause
exit /b 0

:version_ok
:: ============================================================
:: PASO 3: Ejecutar el lanzador principal run.py
:: ============================================================

if defined PYTHON_VER (
    echo   [OK] Python %PYTHON_VER% detectado. Iniciando...
) else (
    echo   [OK] Python detectado. Iniciando...
)
echo.

%PYTHON_EXE% run.py
if errorlevel 1 goto :error_handler

echo.
pause
exit /b 0

:error_handler
echo.
echo   ============================================================
echo   [!] El servidor termino 
echo   ============================================================
echo.
echo   Posibles causas:
echo     - Dependencias no instaladas o con version incorrecta.
echo     - El puerto 8000 esta en uso por otra aplicacion.
echo     - Falta el archivo run.py en la carpeta del proyecto.
echo.
echo   Revisa los mensajes de error arriba para mas detalles.
echo.
pause
exit /b 1
