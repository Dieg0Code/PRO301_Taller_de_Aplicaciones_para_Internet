from typing import Optional, List, Any
from datetime import date
from pydantic import BaseModel, EmailStr, field_validator, Field, model_validator


# ──────────────────────────────────────────
# Schemas para registro de usuario
# ──────────────────────────────────────────

class UserCreate(BaseModel):
    """
    Datos que el cliente envía para crear una cuenta.
    Incluye validaciones de seguridad para prevenir entradas maliciosas.
    """
    user_name:  str = Field(..., min_length=3, max_length=50)
    birth_date: date
    email:      EmailStr = Field(..., max_length=150)
    password:   str = Field(..., min_length=8, max_length=100)

    @field_validator("user_name")
    @classmethod
    def user_name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("El nombre de usuario no puede estar vacío.")
        return v


class UserOut(BaseModel):
    """Datos públicos del usuario que se devuelven al cliente."""
    id:         int
    user_name:  str
    birth_date: date
    email:      EmailStr
    victories:  int = 0
    is_admin:   bool = False

    # Lista de IDs de cartas que el usuario tiene como favoritas
    favorite_ids: List[int] = Field(default_factory=list)
    # Nombres de los pokemon favoritos
    favorite_pokemons: List[str] = Field(default_factory=list)

    @model_validator(mode='before')
    @classmethod
    def validate_from_orm(cls, data: Any) -> Any:
        """
        Extrae manualmente los IDs de la relación 'favorites' antes de la validación.
        Esto soluciona el problema de sincronización entre el ORM y el esquema.
        """
        if hasattr(data, "favorites"):
            # Si es un objeto SQLAlchemy, extraemos los IDs
            fav_ids = [card.id for card in data.favorites]
            fav_names = [card.name for card in data.favorites]

            # Si 'data' es un objeto, no podemos añadirle atributos fácilmente
            # así que lo convertimos a un diccionario compatible o usamos un wrapper
            if not isinstance(data, dict):
                # Convertimos los campos básicos a dict y añadimos favorite_ids
                return {
                    "id": data.id,
                    "user_name": data.user_name,
                    "birth_date": data.birth_date,
                    "email": data.email,
                    "victories": data.victories,
                    "is_admin": data.is_admin,
                    "favorite_ids": fav_ids,
                    "favorite_pokemons": fav_names
                }
        return data

    model_config = {"from_attributes": True}


# ──────────────────────────────────────────
# Schemas para inicio de sesión
# ──────────────────────────────────────────

class LoginRequest(BaseModel):
    """Credenciales para autenticación."""
    email:    str = Field(..., max_length=150)
    password: str = Field(..., max_length=100)


class LoginResponse(BaseModel):
    """Respuesta exitosa de login."""
    message:  str
    user:     UserOut


class UserUpdate(BaseModel):
    """Datos que el cliente envía para actualizar su perfil."""
    user_name: Optional[str] = Field(None, min_length=3, max_length=50)
    password:  Optional[str] = Field(None, min_length=8, max_length=100)

    @field_validator("user_name")
    @classmethod
    def user_name_not_empty(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            v = v.strip()
            if not v:
                raise ValueError("El nombre de usuario no puede estar vacío.")
        return v


# ──────────────────────────────────────────
# Aliases con los nombres canónicos pedidos
# ──────────────────────────────────────────

UserLogin    = LoginRequest
UserResponse = UserOut

class AdminSecret(BaseModel):
    secret_code: str


# ──────────────────────────────────────────
# Schemas para Cartas
# ──────────────────────────────────────────

class CardOut(BaseModel):
    """Datos de una carta."""
    id:          int
    name:        str
    description: str
    pack_type:   str
    slot_index:  int

    model_config = {"from_attributes": True}

# ──────────────────────────────────────────
# Schemas para Mini-Juego
# ──────────────────────────────────────────

class GameStatIn(BaseModel):
    """Datos enviados por el mini-juego tras una partida."""
    user_id: int
    is_victory: bool

class LeaderboardOut(BaseModel):
    """Datos devueltos para el ranking del Leaderboard."""
    user_name: str
    victories: int
    
    model_config = {"from_attributes": True}
