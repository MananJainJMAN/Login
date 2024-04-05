import os
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient
import random
from datetime import datetime, timedelta

# Load environment variables from .env file
load_dotenv()

# Access the MongoDB connection string from environment variables
db_string = os.getenv('DB_String')

# Check if the connection string is present
if db_string is None:
    raise ValueError("DB_String environment variable is not set.")

# Connect to MongoDB
client = MongoClient(db_string)
db = client['usermodel']  # Replace 'your_database' with your actual database name
collection = db['trainingassessments']

# Function to generate a random date within a given range
def get_random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)

# Fetch all user IDs
user_ids = db['users'].distinct('_id')

# Fetch all module IDs
module_ids = db['trainingmodules'].distinct('_id')


# Set to store used combinations of User ID and Module ID
used_combinations = set()

# List to store progress tracking data
progress_data = []

# Generate progress tracking data for each user and module
for user_id in user_ids:
    
     # Shuffle the module IDs to ensure randomness
    random.shuffle(module_ids)
     # Generate progress data for at least 10 modules for each user
    for module_id in module_ids[:random.randint(10,20)]:
        # Check if the combination of User ID and Module ID is already used
        if (user_id, module_id) in used_combinations:
            continue
        # Generate random score and totalScore
        score = random.randint(50, 100)
        
        # Append data to the progress_data list
        progress_data.append({
            'userId': user_id,
            'moduleId': module_id,
            'score': score,
            'totalScore': 100
        })

print(len(progress_data))
# Insert progress tracking data into the database
try:
    result = collection.insert_many(progress_data)
    print(f"{len(result.inserted_ids)} progress tracking data inserted successfully.")
except Exception as e:
    print("Error inserting progress tracking data:", e)

# Disconnect from MongoDB
client.close()
