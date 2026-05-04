from sqlalchemy import Column, Integer, String, Date, UniqueConstraint, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    """Modelo ORM para la tabla 'users' en SQLite."""
    __tablename__ = "users"

    id             = Column(Integer, primary_key=True, index=True)
    user_name      = Column(String(50), nullable=False, unique=True, index=True)
    birth_date     = Column(Date, nullable=False)
    email          = Column(String(150), nullable=False, unique=True, index=True)
    hashed_password = Column(String(255), nullable=False)
    victories      = Column(Integer, default=0, nullable=False)
    is_admin       = Column(Boolean, default=False, nullable=False)

    # Relación técnica: Un usuario puede tener muchas cartas favoritas
    favorites = relationship("Card", secondary="favorites", back_populates="favorited_by")

    __table_args__ = (
        UniqueConstraint("email", name="uq_users_email"),
        UniqueConstraint("user_name", name="uq_users_username"),
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email!r}>"


class Card(Base):
    """Modelo ORM para la tabla 'cards'."""
    __tablename__ = "cards"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(100), nullable=False)
    description = Column(String(500), nullable=False)
    pack_type   = Column(String(1), nullable=False)  # 'A', 'B', 'C'
    slot_index  = Column(Integer, nullable=False)   # 1, 2, 3, 4

    # Relación inversa: Saber qué usuarios han marcado esta carta como favorita
    favorited_by = relationship("User", secondary="favorites", back_populates="favorites")


class Favorite(Base):
    """
    Tabla de relación (Join Table) que vincula Usuarios con Cartas.
    Implementa el requisito de Relaciones Técnicas mediante Llaves Foráneas (FK).
    """
    __tablename__ = "favorites"

    id      = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    card_id = Column(Integer, ForeignKey("cards.id", ondelete="CASCADE"), nullable=False)

    # Restricción para evitar que un usuario marque la misma carta varias veces
    __table_args__ = (
        UniqueConstraint("user_id", "card_id", name="uq_user_card_favorite"),
    )
