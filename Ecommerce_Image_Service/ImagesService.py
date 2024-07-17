from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import firebase_admin
from firebase_admin import credentials, storage
import uuid

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:4200",  # Añade aquí la URL específica de Angular
    "http://127.0.0.1",
    "http://127.0.0.1:4200",  # También puedes añadir la versión con puerto específico
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Inicializar Firebase
cred = credentials.Certificate("arquitecturapoyecto-firebase-adminsdk-xqkno-f5967a7a6b.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'arquitecturapoyecto.appspot.com'
})

bucket = storage.bucket()

@app.post("/upload/")
async def upload_image(name: str = Form(...), file: UploadFile = File(...)):
    try:
        # Crear un ID único para la imagen
        file_id = str(uuid.uuid4())
        
        # Guardar la imagen en Firebase Storage
        blob = bucket.blob(f"{file_id}/{file.filename}")
        blob.upload_from_file(file.file, content_type=file.content_type)
        
        # Hacer que el archivo sea público
        blob.make_public()

        # Obtener la URL de descarga pública del archivo
        file_url = blob.public_url

        # Devolver la URL de descarga en la respuesta JSON
        return JSONResponse(status_code=200, content={"id": file_id, "name": name, "url": file_url})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/delete/{file_id}/{file_name}")
async def delete_image(file_id: str, file_name: str):
    try:
        blob = bucket.blob(f"{file_id}/{file_name}")
        
        if not blob.exists():
            raise HTTPException(status_code=404, detail="File not found")

        blob.delete()

        return JSONResponse(status_code=200, content={"message": "File deleted successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ejecutar el servidor de desarrollo
if __name__:
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
