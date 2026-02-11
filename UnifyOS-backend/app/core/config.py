from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CareOps Unified Platform"
    DATABASE_URL: str  # Railway provides this
    SECRET_KEY: str = "DEVELOPMENT_SECRET"
    
    class Config:
        env_file = ".env"

settings = Settings()