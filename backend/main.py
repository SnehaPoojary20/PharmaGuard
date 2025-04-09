from fastapi import FastAPI, Depends, HTTPException, Header, File, UploadFile
import pandas as pd
from pymongo import MongoClient
import io
from firebase_auth import verify_token

app = FastAPI()

# ✅ MongoDB Connection
MONGO_URI = "mongodb+srv://snehapoojary2004:2020@medicines.vvzel.mongodb.net/?retryWrites=true&w=majority&appName=medicines"
client = MongoClient(MONGO_URI)
db = client["medicine_db"]
collection = db["medicines"]

# ✅ Authentication Dependency
def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing auth token")

    token = authorization.split("Bearer ")[-1]
    user = verify_token(token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return user

# ✅ Home Route
@app.get("/")
def home():
    return {"message": "PharmaGuard API is running!"}

# ✅ Upload CSV with Medicine Data (Admin Access Only)
@app.post("/upload_csv/")
async def upload_csv(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    try:
        # Restrict access
        if user["email"] != "admin@example.com":
            raise HTTPException(status_code=403, detail="Only admin can upload data")

        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")), encoding="utf-8")

        data_dict = df.to_dict(orient="records")
        collection.insert_many(data_dict)

        return {"message": "CSV file uploaded and data inserted successfully!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Get Medicine Recommendations Based on User Medical History
@app.get("/recommendations/{medicine_name}")
def get_medicine_recommendations(medicine_name: str, user: dict = Depends(get_current_user)):
    medicine = collection.find_one({"name": medicine_name})
    
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    safer_alternatives = medicine.get("safer_alternatives", [])
    return {"medicine": medicine_name, "alternatives": safer_alternatives}

# ✅ Save User History (Used Medicines)
@app.post("/user/medicine-history")
def save_medicine_history(data: dict, user: dict = Depends(get_current_user)):
    user_id = user["uid"]
    history_collection = db["user_history"]

    # Store user medicine history
    history_collection.update_one(
        {"user_id": user_id},
        {"$push": {"history": data}},
        upsert=True
    )

    return {"message": "User history updated!"}

# ✅ Get User Medicine History
@app.get("/user/medicine-history")
def get_medicine_history(user: dict = Depends(get_current_user)):
    user_id = user["uid"]
    history_collection = db["user_history"]

    doc = history_collection.find_one({"user_id": user_id})
    if not doc:
        return {"history": []}

    return {"history": doc["history"]}
