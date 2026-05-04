"""
Pokemon TCG – Backend API
=========================
Ejecutar localmente:
    cd backend
    uvicorn main:app --reload

Documentación interactiva disponible en:
    http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import text
from typing import List
import os
from passlib.context import CryptContext

from database import Base, engine, get_db
from models import User, Card, Favorite
from schemas import UserCreate, UserOut, LoginRequest, LoginResponse, UserLogin, UserResponse, UserUpdate, CardOut, GameStatIn, LeaderboardOut, AdminSecret

# ──────────────────────────────────────────
# Inicialización de la app
# ──────────────────────────────────────────

app = FastAPI(
    title="Pokémon TCG API",
    description="API RESTful para gestión de usuarios del sitio Pokémon TCG.",
    version="1.0.0",
)

# ──────────────────────────────────────────
# Middleware CORS
# Permite peticiones desde cualquier origen (útil para desarrollo local)
# ──────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────
# Crear tablas al iniciar (si no existen)
# ──────────────────────────────────────────

Base.metadata.create_all(bind=engine)

# ──────────────────────────────────────────
# Migraciones manuales de esquema
# SQLite no soporta ALTER TABLE automático.
# Esta función añade columnas nuevas a tablas
# existentes sin borrar datos.
# ──────────────────────────────────────────

def run_migrations():
    """
    Aplica migraciones de esquema que create_all() no puede manejar.
    Usa ALTER TABLE para añadir columnas nuevas a tablas ya existentes.
    Es seguro ejecutarlo cada vez: falla silenciosamente si la columna ya existe.
    """
    with engine.connect() as conn:
        # Añadir columna is_admin si no existe
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT 0"))
            conn.commit()
            print("[Migracion] Columna 'is_admin' añadida a la tabla 'users'.")
        except Exception:
            # La columna ya existe en la BD — no es un error
            pass

run_migrations()

# ──────────────────────────────────────────
# Seeding de Cartas (Solo si está vacío)
# ──────────────────────────────────────────

def seed_cards():
    db = next(get_db())
    if db.query(Card).count() == 0:
        initial_cards = [
            # Pack A
            Card(name="Giratina", pack_type="A", slot_index=1, description="Pokémon legendario de tipo Fantasma/Dragón. Se dice que fue desterrado al Mundo Distorsión por su extrema violencia."),
            Card(name="Gardevoir", pack_type="A", slot_index=2, description="Pokémon de tipo Psíquico/Hada. Tiene la capacidad innata de leer el futuro. Protegerá a su entrenador con agujeros negros."),
            Card(name="Gengar", pack_type="A", slot_index=3, description="Pokémon de tipo Fantasma/Veneno. Le divierte imitar las sombras de las personas y reírse de su terror."),
            Card(name="Pikachu", pack_type="A", slot_index=4, description="Pokémon de tipo Eléctrico. Almacena grandes cantidades de electricidad en las bolsas rojas de sus mejillas."),
            # Pack B
            Card(name="Koraidon", pack_type="B", slot_index=1, description="Pokémon legendario de tipo Lucha/Dragón. Es un misterioso ser originario del foso de Paldea con un poder físico inmenso."),
            Card(name="Miraidon", pack_type="B", slot_index=2, description="Pokémon legendario de tipo Eléctrico/Dragón. Parece ser la forma futurista de un Pokémon conocido, dotado de tecnología."),
            Card(name="Arcanine", pack_type="B", slot_index=3, description="Pokémon de tipo Fuego. Es célebre desde la antigüedad por su velocidad inalcanzable y su majestuosidad en combate."),
            Card(name="Gyarados", pack_type="B", slot_index=4, description="Pokémon de tipo Agua/Volador. Su asombrosa evolución desde el débil Magikarp es un símbolo de superación."),
            # Pack C
            Card(name="Mega Charizard X", pack_type="C", slot_index=1, description="Al alcanzar la megaevolución, su cuerpo se torna oscuro y sus llamas arden con un tono azul intenso."),
            Card(name="Mega Gengar EX", pack_type="C", slot_index=2, description="Al megaevolucionar, la energía que emana este Pokémon se desborda y su cuerpo parece hundirse en otra dimensión."),
            Card(name="Mismagius", pack_type="C", slot_index=3, description="Pokémon de tipo Fantasma. Sus enigmáticos cánticos suenan como conjuros ancestrales que pueden provocar dolor o felicidad."),
            Card(name="Mega Diancie", pack_type="C", slot_index=4, description="Conocida afectuosamente como la 'Princesa Real'. Su cuerpo de diamante puro brilla con un esplendor inigualable."),
        ]
        db.add_all(initial_cards)
        db.commit()

seed_cards()

# Configuración de archivos estáticos
# root_dir es la carpeta raíz del proyecto (donde están index.html, app.js, styles.css)
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.get("/", tags=["Frontend"])
def read_index():
    """Sirve el archivo index.html en la raíz."""
    return FileResponse(os.path.join(root_dir, "index.html"))

# ──────────────────────────────────────────
# Utilidad de hashing de contraseñas
# ──────────────────────────────────────────

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ──────────────────────────────────────────
# Endpoints
# ──────────────────────────────────────────

@app.get("/health", tags=["Health"])
def health_check():
    """Verifica que el servidor está en línea."""
    return {"status": "ok", "message": "Pokémon TCG API corriendo correctamente."}


@app.post(
    "/auth/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    tags=["Auth"],
    summary="Registrar un nuevo usuario",
)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Crea una cuenta nueva con:
    - **user_name**: nombre de usuario
    - **birth_date**: fecha de nacimiento (YYYY-MM-DD)
    - **email**: correo electrónico (debe ser único)
    - **password**: contraseña en texto plano (se almacena hasheada)
    """
    # Verificar si el email ya existe
    existing_email = db.query(User).filter(User.email == payload.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"field": "email", "msg": "Ya existe una cuenta registrada con ese correo electrónico."},
        )

    # Verificar si el nombre de usuario ya existe
    existing_user = db.query(User).filter(User.user_name == payload.user_name).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"field": "user_name", "msg": "El nombre de usuario ya está en uso."},
        )

    new_user = User(
        user_name=payload.user_name,
        birth_date=payload.birth_date,
        email=payload.email,
        hashed_password=hash_password(payload.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post(
    "/auth/login",
    response_model=LoginResponse,
    tags=["Auth"],
    summary="Iniciar sesión",
)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """
    Autentica un usuario con:
    - **email**: correo electrónico registrado
    - **password**: contraseña en texto plano

    Devuelve los datos públicos del usuario si las credenciales son correctas.
    """
    # Intentar buscar por email o por nombre de usuario con carga inmediata de favoritos
    user = db.query(User).options(joinedload(User.favorites)).filter(
        (User.email == payload.email) | (User.user_name == payload.email)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas. Verifica tu usuario/email y contraseña.",
        )

    return LoginResponse(
        message="Inicio de sesión exitoso.",
        user=UserOut.model_validate(user),
    )


# ──────────────────────────────────────────
# Endpoint canónico solicitado: POST /api/login
# (misma lógica, ruta preferida del frontend)
# ──────────────────────────────────────────

@app.post(
    "/api/login",
    response_model=UserResponse,
    tags=["Auth"],
    summary="Iniciar sesión (ruta principal del frontend)",
)
def api_login(payload: UserLogin, db: Session = Depends(get_db)):
    """
    Endpoint principal para el formulario de inicio de sesión del frontend.

    - **email**: correo electrónico registrado (validado con EmailStr)
    - **password**: contraseña en texto plano

    Retorna `200 OK` con los datos públicos del usuario (sin contraseña)
    o `401 Unauthorized` si las credenciales son incorrectas.
    """
    # Intentar buscar por email o por nombre de usuario con carga inmediata de favoritos
    user = db.query(User).options(joinedload(User.favorites)).filter(
        (User.email == payload.email) | (User.user_name == payload.email)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas. Verifica tu usuario/email y contraseña.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return UserResponse.model_validate(user)

@app.put(
    "/api/users/{user_id}",
    response_model=UserOut,
    tags=["Users"],
    summary="Actualizar información del usuario",
)
def update_user(user_id: int, payload: UserUpdate, db: Session = Depends(get_db)):
    """
    Actualiza el perfil del usuario:
    - **user_name**: nuevo nombre de usuario (opcional)
    - **password**: nueva contraseña (opcional)
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado.",
        )

    if payload.user_name:
        # Verificar si el nombre de usuario ya está en uso por otro
        existing_user = db.query(User).filter(
            User.user_name == payload.user_name,
            User.id != user_id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"field": "user_name", "msg": "El nombre de usuario ya está en uso."},
            )
        user.user_name = payload.user_name

    if payload.password:
        user.hashed_password = hash_password(payload.password)

    db.commit()
    db.refresh(user)
    return user


@app.get("/api/cards", response_model=List[CardOut], tags=["Resources"])
def get_cards(db: Session = Depends(get_db)):
    """Consulta la DB y devuelve la lista de todas las cartas."""
    return db.query(Card).all()


@app.get("/api/users", response_model=List[UserOut], tags=["Resources"])
def get_users(db: Session = Depends(get_db)):
    """Consulta la DB y devuelve la lista de usuarios registrados (Comunidad)."""
    return db.query(User).options(joinedload(User.favorites)).all()

@app.post(
    "/api/users/{user_id}/make_admin",
    response_model=UserOut,
    tags=["Users"],
    summary="Hacer a un usuario administrador",
)
def make_admin(user_id: int, payload: AdminSecret, db: Session = Depends(get_db)):
    if payload.secret_code != "admin123":
        raise HTTPException(status_code=403, detail="Código de administrador incorrecto.")
    
    user = db.query(User).options(joinedload(User.favorites)).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    
    user.is_admin = True
    db.commit()
    db.refresh(user)
    return user


@app.post(
    "/api/favorites/{card_id}",
    response_model=UserOut,
    tags=["Favorites"],
    summary="Alternar favorito para una carta",
)
def toggle_favorite(card_id: int, user_id: int, db: Session = Depends(get_db)):
    """
    Añade o quita una carta de los favoritos del usuario.
    
    - **card_id**: ID de la carta a marcar/desmarcar.
    - **user_id**: ID del usuario que realiza la acción.
    """
    # Carga inmediata para asegurar que Pydantic vea la relación actualizada
    user = db.query(User).options(joinedload(User.favorites)).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Carta no encontrada.")

    # Verificar si ya es favorita
    existing_fav = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.card_id == card_id
    ).first()

    if existing_fav:
        # Si ya existe, se elimina (Toggle OFF)
        db.delete(existing_fav)
    else:
        # Si no existe, se crea (Toggle ON)
        new_fav = Favorite(user_id=user_id, card_id=card_id)
        db.add(new_fav)

    db.commit()
    db.refresh(user)
    return user


@app.get(
    "/api/users/{user_id}/favorites",
    response_model=List[CardOut],
    tags=["Favorites"],
    summary="Obtener lista de cartas favoritas de un usuario",
)
def get_user_favorites(user_id: int, db: Session = Depends(get_db)):
    """Devuelve la lista completa de cartas que el usuario ha marcado como favoritas."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    return user.favorites

# ──────────────────────────────────────────
# Endpoints del Juego Pokémon
# ──────────────────────────────────────────
@app.post(
    "/api/game/stats",
    tags=["Game"],
    summary="Registrar estadísticas de juego",
)
def save_game_stats(stat: GameStatIn, db: Session = Depends(get_db)):
    """
    Registra una victoria si is_victory es verdadero.
    """
    if stat.is_victory:
        user = db.query(User).filter(User.id == stat.user_id).first()
        if user:
            user.victories += 1
            db.commit()
            return {"message": "Victoria registrada exitosamente."}
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")
    return {"message": "Partida terminada sin victoria registrada."}

@app.get(
    "/api/leaderboard",
    response_model=List[LeaderboardOut],
    tags=["Game"],
    summary="Obtener el top 10 de entrenadores con más victorias",
)
def get_leaderboard(db: Session = Depends(get_db)):
    """
    Devuelve los 10 mejores entrenadores ordenados por número de victorias.
    """
    users = db.query(User).order_by(User.victories.desc()).limit(10).all()
    return users

# ──────────────────────────────────────────
# Montaje final de archivos estáticos
# ──────────────────────────────────────────
# Esto debe ir AL FINAL para no interferir con los endpoints de la API.
# Permite que archivos como app.js y styles.css sean accesibles directamente.
app.mount("/", StaticFiles(directory=root_dir), name="main_static")
