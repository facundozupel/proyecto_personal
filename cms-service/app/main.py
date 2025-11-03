from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from typing import List
import secrets
import os
from datetime import datetime
from pydantic import BaseModel

app = FastAPI(title="CMS Service - Blog API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:4321").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic Auth
security = HTTPBasic()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not correct_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Schemas
class PostCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    author: str = "Facundo Zupel"
    tags: List[str] = []
    published: bool = True

class PostUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    excerpt: str | None = None
    tags: List[str] | None = None
    published: bool | None = None

class Post(BaseModel):
    id: int
    title: str
    slug: str
    content: str
    excerpt: str
    author: str
    tags: List[str]
    published: bool
    created_at: str
    updated_at: str

# In-memory storage (temporal - migrar a Google Sheets o DB después)
posts_db: List[dict] = []
next_id = 1

# Endpoints públicos
@app.get("/")
async def root():
    return {"message": "CMS Service - Blog API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/posts", response_model=List[Post])
async def get_posts(published_only: bool = True):
    """Obtener lista de posts (públicos por defecto)"""
    if published_only:
        return [p for p in posts_db if p["published"]]
    return posts_db

@app.get("/api/posts/{slug}", response_model=Post)
async def get_post_by_slug(slug: str):
    """Obtener un post por su slug"""
    post = next((p for p in posts_db if p["slug"] == slug), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

# Endpoints de administración (requieren auth)
@app.post("/api/admin/posts", response_model=Post, dependencies=[Depends(verify_admin)])
async def create_post(post: PostCreate):
    """Crear un nuevo post (requiere autenticación)"""
    global next_id

    # Verificar que el slug no exista
    if any(p["slug"] == post.slug for p in posts_db):
        raise HTTPException(status_code=400, detail="Slug already exists")

    now = datetime.utcnow().isoformat()
    new_post = {
        "id": next_id,
        "title": post.title,
        "slug": post.slug,
        "content": post.content,
        "excerpt": post.excerpt,
        "author": post.author,
        "tags": post.tags,
        "published": post.published,
        "created_at": now,
        "updated_at": now,
    }

    posts_db.append(new_post)
    next_id += 1

    return new_post

@app.put("/api/admin/posts/{post_id}", response_model=Post, dependencies=[Depends(verify_admin)])
async def update_post(post_id: int, post_update: PostUpdate):
    """Actualizar un post existente (requiere autenticación)"""
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Actualizar campos
    if post_update.title is not None:
        post["title"] = post_update.title
    if post_update.content is not None:
        post["content"] = post_update.content
    if post_update.excerpt is not None:
        post["excerpt"] = post_update.excerpt
    if post_update.tags is not None:
        post["tags"] = post_update.tags
    if post_update.published is not None:
        post["published"] = post_update.published

    post["updated_at"] = datetime.utcnow().isoformat()

    return post

@app.delete("/api/admin/posts/{post_id}", dependencies=[Depends(verify_admin)])
async def delete_post(post_id: int):
    """Eliminar un post (requiere autenticación)"""
    global posts_db
    post = next((p for p in posts_db if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    posts_db = [p for p in posts_db if p["id"] != post_id]

    return {"message": "Post deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
