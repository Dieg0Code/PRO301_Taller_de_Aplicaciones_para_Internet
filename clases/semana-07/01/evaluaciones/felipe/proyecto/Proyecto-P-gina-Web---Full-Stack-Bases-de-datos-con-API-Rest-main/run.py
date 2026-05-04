"""
Pokemon TCG - Lanzador Principal
=================================
Ejecuta este archivo a través de EJECUTAR_SERVIDOR.bat
No ejecutar directamente salvo para desarrollo.
"""

import os
import sys
import subprocess
import socket
import webbrowser
import importlib.util
import importlib.metadata
import threading
import time

# msvcrt solo disponible en Windows (teclado sin buffering)
try:
    import msvcrt
    _HAS_MSVCRT = True
except ImportError:
    _HAS_MSVCRT = False

# ================================================================================
# CONFIGURACIÓN
# ================================================================================

PYTHON_DOWNLOAD_URL = "https://www.python.org/downloads/release/python-31210/"
PYTHON_MIN = (3, 10)       # Mínimo absoluto (por debajo = error bloqueante)
PYTHON_RECOMMENDED = [(3, 11), (3, 12)]  # Versiones con soporte garantizado

# ================================================================================
# COLORES ANSI
# ================================================================================

class C:
    """Colores ANSI para terminal profesional."""
    HEADER  = '\033[95m'
    BLUE    = '\033[94m'
    CYAN    = '\033[96m'
    GREEN   = '\033[92m'
    YELLOW  = '\033[93m'
    RED     = '\033[91m'
    ENDC    = '\033[0m'
    BOLD    = '\033[1m'
    DIM     = '\033[2m'

def enable_colors():
    """Habilita colores ANSI en Windows (requiere Win10 1511+)."""
    if os.name == 'nt':
        os.system('color')

def header(text: str):
    print(f"\n{C.BOLD}{text}{C.ENDC}")

def ok(text: str):
    print(f"  {C.GREEN}[OK]{C.ENDC} {text}")

def warn(text: str):
    print(f"  {C.YELLOW}[!]{C.ENDC}  {text}")

def err(text: str):
    print(f"  {C.RED}[X]{C.ENDC}  {text}")

def info(text: str):
    print(f"  {C.CYAN}[i]{C.ENDC}  {text}")

def sep(char="-", width=60):
    print(f"  {C.DIM}{char * width}{C.ENDC}")

def show_download_hint():
    """Muestra el bloque de ayuda con el link de descarga de Python."""
    print()
    info(f"Version recomendada para este proyecto: {C.BOLD}Python 3.12{C.ENDC}")
    info(f"Descarga oficial: {C.CYAN}{PYTHON_DOWNLOAD_URL}{C.ENDC}")
    info("Durante la instalacion, activa:")
    print(f"           {C.BOLD}\"Add Python to PATH\"{C.ENDC}")
    print()

# ================================================================================
# PASO 0: VERIFICACIÓN DE VERSIÓN DE PYTHON
# ================================================================================

def check_python_version() -> bool:
    """
    Verifica que la versión de Python sea compatible.
    - 3.11 / 3.12  → OK directo
    - ≥ 3.10 (fuera de rango) → Modo Compatibilidad (advertencia + pregunta)
    - < 3.10  → Error bloqueante con link de descarga
    Retorna True si se debe continuar, False si se debe abortar.
    """
    major = sys.version_info.major
    minor = sys.version_info.minor
    ver_str = f"{major}.{minor}.{sys.version_info.micro}"

    header(f"[0] Verificando version de Python...")

    is_recommended = (major, minor) in PYTHON_RECOMMENDED

    if is_recommended:
        ok(f"Python {ver_str} — Version recomendada. {C.GREEN}Compatibilidad garantizada.{C.ENDC}")
        return True

    if (major, minor) < PYTHON_MIN:
        err(f"Python {ver_str} es demasiado antiguo para este proyecto.")
        print()
        warn("Version minima requerida: Python 3.10")
        warn("Version recomendada:      Python 3.12")
        show_download_hint()
        input(f"  {C.BOLD}Presiona Enter para salir...{C.ENDC}")
        return False

    # --- MODO COMPATIBILIDAD ---
    warn(f"Python {ver_str} detectado fuera del rango recomendado (3.11 / 3.12).")
    print()

    if minor >= 13:
        print(f"  {C.YELLOW}Riesgos conocidos con Python 3.{minor}:{C.ENDC}")
        print(f"    - Algunas dependencias pueden requerir compilar desde Rust.")
        print(f"    - Si la instalacion de dependencias falla, usa Python 3.12.")
    elif minor == 10:
        print(f"  {C.YELLOW}Riesgos conocidos con Python 3.{minor}:{C.ENDC}")
        print(f"    - Algunas APIs de pydantic v2 pueden no estar disponibles.")
        print(f"    - Actualizar a Python 3.12 es fuertemente recomendado.")

    print()
    info(f"Version recomendada: Python 3.12")
    info(f"Descarga: {C.CYAN}{PYTHON_DOWNLOAD_URL}{C.ENDC}")
    print()

    respuesta = input(f"  {C.BOLD}Desea continuar de todas formas? [S/n]: {C.ENDC}").strip().lower()
    if respuesta in ('n', 'no'):
        print()
        warn("Ejecucion cancelada por el usuario.")
        show_download_hint()
        input(f"  {C.BOLD}Presiona Enter para salir...{C.ENDC}")
        return False

    warn("Continuando en Modo Compatibilidad. Pueden ocurrir errores inesperados.")
    return True


# ================================================================================
# PASO 1: VERIFICACIÓN DE DEPENDENCIAS CON TABLA DE VERSIONES
# ================================================================================

def _get_installed_version(import_name: str) -> str | None:
    """Devuelve la version instalada de un paquete usando importlib.metadata."""
    # Mapeo de nombres de importación a nombres de paquete en PyPI
    pypi_name_map = {
        "multipart":       "python-multipart",
        "email_validator": "email-validator",
        "passlib":         "passlib",
        "bcrypt":          "bcrypt",
        "fastapi":         "fastapi",
        "uvicorn":         "uvicorn",
        "sqlalchemy":      "SQLAlchemy",
        "pydantic":        "pydantic",
        "pydantic_extra_types": "pydantic-extra-types",
        "packaging":       "packaging",
    }
    pkg_name = pypi_name_map.get(import_name, import_name)
    try:
        return importlib.metadata.version(pkg_name)
    except importlib.metadata.PackageNotFoundError:
        return None


def _parse_req_line(line: str) -> tuple[str, str, str]:
    """
    Parsea una linea de requirements.txt.
    Retorna (import_name, display_name, specifier_str).
    Ejemplo: 'bcrypt>=4.0.1,<5.0.0' → ('bcrypt', 'bcrypt', '>=4.0.1,<5.0.0')
    """
    import_alias = {
        "passlib[bcrypt]":    "passlib",
        "pydantic[email]":    "email_validator",   # valida el extra [email] via email-validator
        "python-multipart":   "multipart",
        "pydantic-extra-types": "pydantic_extra_types",
        "sqlalchemy":         "sqlalchemy",
    }

    # Separar nombre de especificadores (>=, ==, <, etc.)
    for sep_char in ['>=', '==', '<=', '!=', '~=', '<', '>']:
        if sep_char in line:
            raw_name = line.split(sep_char)[0].strip()
            specifier = line[len(raw_name):]
            break
    else:
        raw_name = line.strip()
        specifier = ""

    display_name = raw_name.split('[')[0].lower()
    import_name = import_alias.get(raw_name.lower(), display_name.replace('-', '_'))
    return import_name, display_name, specifier


def check_dependencies() -> bool:
    """
    Lee requirements.txt, verifica cada paquete con su version instalada
    y muestra una tabla visual con el estado de cada uno.
    Retorna True si se puede continuar (con o sin instalacion).
    """
    header("[1] Verificando dependencias...")

    req_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "requirements.txt")
    if not os.path.exists(req_file):
        err(f"No se encontro requirements.txt en: {req_file}")
        return False

    with open(req_file, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip() and not l.startswith("#")]

    # Verificar si packaging está disponible para comparar versiones
    try:
        from packaging.specifiers import SpecifierSet
        from packaging.version import Version
        can_check_versions = True
    except ImportError:
        can_check_versions = False
        warn("'packaging' no instalado — solo se verificara presencia de paquetes.")

    # Cabecera de tabla
    print()
    COL_PKG  = 22
    COL_REQ  = 20
    COL_INST = 12
    print(f"  {'Paquete':<{COL_PKG}} {'Requerido':<{COL_REQ}} {'Instalado':<{COL_INST}} Estado")
    sep()

    needs_install   = []
    needs_upgrade   = []
    has_wrong_ver   = False

    for line in lines:
        import_name, display_name, specifier = _parse_req_line(line)
        installed_ver = _get_installed_version(import_name)

        req_display = specifier if specifier else "(cualquiera)"

        if installed_ver is None:
            estado = f"{C.RED}[No instalado]{C.ENDC}"
            print(f"  {display_name:<{COL_PKG}} {req_display:<{COL_REQ}} {'---':<{COL_INST}} {estado}")
            needs_install.append(display_name)
            has_wrong_ver = True
            continue

        # Verificar si la version instalada satisface el especificador
        version_ok = True
        if can_check_versions and specifier:
            try:
                spec_set = SpecifierSet(specifier)
                version_ok = Version(installed_ver) in spec_set
            except Exception:
                version_ok = True  # Si hay error parseando, asumir OK

        if version_ok:
            estado = f"{C.GREEN}[OK]{C.ENDC}"
            print(f"  {display_name:<{COL_PKG}} {req_display:<{COL_REQ}} {installed_ver:<{COL_INST}} {estado}")
        else:
            estado = f"{C.YELLOW}[VERSION INCORRECTA]{C.ENDC}"
            print(f"  {display_name:<{COL_PKG}} {req_display:<{COL_REQ}} {installed_ver:<{COL_INST}} {estado}")
            needs_upgrade.append(display_name)
            has_wrong_ver = True

    sep()
    print()

    if not has_wrong_ver:
        ok("Todas las dependencias estan correctamente instaladas.")
        return True

    # Mostrar resumen de problemas
    if needs_install:
        warn(f"Paquetes no instalados:      {', '.join(needs_install)}")
    if needs_upgrade:
        warn(f"Versiones incorrectas:       {', '.join(needs_upgrade)}")

    print()
    respuesta = input(f"  {C.BOLD}Desea instalar/actualizar las dependencias ahora? [S/n]: {C.ENDC}").strip().lower()
    if respuesta in ('n', 'no'):
        err("El servidor no puede iniciarse sin las dependencias requeridas.")
        return False

    print()
    print(f"  {C.YELLOW}Instalando dependencias... (puede tardar unos minutos){C.ENDC}")
    result = subprocess.run(
        [sys.executable, "-m", "pip", "install", "-r", req_file, "--upgrade", "-q"],
        capture_output=False
    )

    if result.returncode != 0:
        print()
        err("Algunas dependencias no se pudieron instalar.")
        warn("Intenta ejecutar manualmente:")
        print(f"    python -m pip install -r requirements.txt --upgrade")
        return False

    ok("Dependencias actualizadas correctamente.")
    return True


# ================================================================================
# PASO 2: VERIFICACIÓN DE COMPATIBILIDAD BCRYPT
# ================================================================================

def check_bcrypt_compatibility():
    """
    Detecta si bcrypt >= 5.0 está instalado (incompatible con passlib 1.7.4)
    y lo reemplaza automáticamente con una versión compatible.
    """
    try:
        import bcrypt as _bcrypt
        version_str = getattr(_bcrypt, '__version__', '0.0.0')
        major = int(version_str.split('.')[0])
        if major >= 5:
            print()
            warn(f"bcrypt {version_str} es INCOMPATIBLE con passlib 1.7.4.")
            warn("El inicio de sesion fallaria. Instalando version compatible...")
            result = subprocess.run(
                [sys.executable, "-m", "pip", "install", "bcrypt>=4.0.1,<5.0.0", "--force-reinstall", "-q"],
                capture_output=True, text=True
            )
            if result.returncode == 0:
                ok("bcrypt actualizado a una version compatible.")
            else:
                err("No se pudo actualizar bcrypt. El login puede fallar.")
    except ImportError:
        pass  # No instalado aun, se instalara con requirements.txt


# ================================================================================
# PASO 3: VERIFICACIÓN DE PUERTO
# ================================================================================

def check_port(host: str, port: int) -> bool:
    """
    Verifica si el puerto está libre intentando enlazarse a él.
    Retorna True si el puerto está disponible.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
            return True
        except OSError:
            return False


# ================================================================================
# PASO 4: LANZAR SERVIDOR
# ================================================================================

def _esc_listener(proc: subprocess.Popen):
    """
    Corre en un hilo daemon. Detecta la tecla ESC (\x1b) usando msvcrt
    y termina el subproceso uvicorn de forma ordenada.
    No bloquea stdin ni interfiere con la salida del servidor.
    """
    while proc.poll() is None:   # Mientras uvicorn este corriendo
        if _HAS_MSVCRT and msvcrt.kbhit():
            key = msvcrt.getwch()
            if ord(key) == 27:   # ESC = \x1b = 27
                print()
                warn("Tecla [ESC] presionada. Deteniendo servidor...")
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    proc.kill()
                break
        time.sleep(0.05)


def start_server():
    """
    Configura y lanza el servidor privado.
    - Host restringido a 127.0.0.1 (seguridad: sin acceso externo).
    - uvicorn lanzado via sys.executable para garantizar el entorno correcto.
    - Usa subprocess.Popen + hilo daemon para escuchar tecla ESC.
      Esto evita que Ctrl+C llegue a CMD y muestre el mensaje
      'Desea terminar el trabajo por lotes'.
    """
    host = "127.0.0.1"
    port = 8000
    local_url = f"http://{host}:{port}"

    header("[2] Configuracion de Red y Seguridad:")
    print(f"  URL de acceso:  {C.CYAN}{local_url}{C.ENDC}")
    print(f"  Estado:         {C.GREEN}Privado (solo acceso local){C.ENDC}")
    info("El acceso desde otros dispositivos esta bloqueado por seguridad.")

    header("[3] Guia rapida de resolucion de problemas:")
    print(f"  {C.YELLOW}*{C.ENDC} Puerto ocupado:   Cierra otras aplicaciones de desarrollo.")
    print(f"  {C.YELLOW}*{C.ENDC} Firewall:         Permite conexiones a 127.0.0.1.")
    print(f"  {C.YELLOW}*{C.ENDC} Base de datos:    Asegurate de tener permisos en la carpeta.")
    print(f"  {C.YELLOW}*{C.ENDC} Cache:            Usa Ctrl + F5 para limpiar el navegador.")

    # Verificar puerto antes de intentar arrancar
    header("[4] Verificando puerto...")
    if not check_port(host, port):
        err(f"El puerto {port} ya esta en uso.")
        warn("Cierra cualquier aplicacion que use ese puerto y vuelve a intentarlo.")
        warn("Tip: En el Administrador de Tareas busca procesos de Python o Node.js.")
        return

    ok(f"Puerto {port} disponible.")

    header(f"[5] Iniciando servidor en {C.CYAN}{local_url}{C.BOLD}...")
    print()

    if _HAS_MSVCRT:
        print(f"  {C.BOLD}{C.YELLOW}>>> Presiona [ESC] para detener el servidor <<<{C.ENDC}")
    else:
        print(f"  {C.BOLD}{C.YELLOW}>>> Presiona Ctrl+C para detener el servidor <<<{C.ENDC}")
    print()

    # Abrir navegador antes de iniciar (uvicorn tarda ~1 segundo)
    try:
        webbrowser.open(local_url)
    except Exception:
        pass

    # Cambiar al directorio backend para que uvicorn encuentre main.py
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_path = os.path.join(base_dir, "backend")

    if not os.path.exists(backend_path):
        err(f"No se encontro la carpeta 'backend' en: {backend_path}")
        return

    os.chdir(backend_path)

    cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", host, "--port", str(port)]

    try:
        # Popen en lugar de run() para poder controlar el proceso externamente
        proc = subprocess.Popen(cmd)

        # Hilo daemon: escucha ESC y termina uvicorn sin propagar señal a CMD
        if _HAS_MSVCRT:
            t = threading.Thread(target=_esc_listener, args=(proc,), daemon=True)
            t.start()

        proc.wait()   # Bloquear hasta que uvicorn termine (por ESC o error)

    except KeyboardInterrupt:
        # Fallback: usuario presiono Ctrl+C (mostrara 'trabajo por lotes' en CMD)
        print()
        warn("Ctrl+C detectado. Deteniendo servidor...")
        try:
            proc.terminate()
            proc.wait(timeout=5)
        except Exception:
            pass
    except Exception as e:
        err(f"Error critico al iniciar el servidor: {e}")
        return

    print()
    ok("Servidor detenido correctamente.")



# ================================================================================
# PUNTO DE ENTRADA
# ================================================================================

if __name__ == "__main__":
    enable_colors()
    os.system('cls' if os.name == 'nt' else 'clear')

    print(f"{C.CYAN}{'=' * 62}{C.ENDC}")
    print(f"{C.BOLD}{C.YELLOW}       POKEMON TCG - SISTEMA DE DESPLIEGUE SEGURO{C.ENDC}")
    print(f"{C.CYAN}{'=' * 62}{C.ENDC}")

    # 0. Verificar version de Python
    if not check_python_version():
        sys.exit(1)

    # 1. Verificar dependencias con tabla de versiones
    if not check_dependencies():
        print()
        try:
            input(f"  {C.BOLD}Presiona Enter para salir...{C.ENDC}")
        except (EOFError, KeyboardInterrupt):
            pass
        sys.exit(1)

    # 2. Verificar compatibilidad bcrypt (problema conocido)
    check_bcrypt_compatibility()

    # 3 + 4. Verificar puerto y lanzar servidor
    start_server()

    # Salir con exito. El .bat se encargara de mostrar el mensaje final.
    sys.exit(0)