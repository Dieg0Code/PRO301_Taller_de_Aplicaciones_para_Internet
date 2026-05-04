from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Ruta del archivo SQLite — se creará automáticamente en la carpeta backend/
DATABASE_URL = "sqlite:///./pokemon_tcg.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Necesario para SQLite con FastAPI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base declarativa moderna (SQLAlchemy 2.x)
class Base(DeclarativeBase):
    pass


# Dependencia de sesión para inyectar en los endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
