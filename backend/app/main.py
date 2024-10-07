from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.meta_data_routes import router 

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://20.249.216.138"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

app.include_router(router)

# Define a root route
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

if __name__ == "__main__":
    print("FastAPI application is running...")
