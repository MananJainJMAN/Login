import os
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient
from faker import Faker
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
collection = db['progresstrackings']

# Initialize Faker
fake = Faker()

# Function to generate a random date within a given range
def get_random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)

# # Function to generate dummy progress tracking data
# def generate_dummy_progress_data(num_entries):
#     progress_data = []
#     user_ids = db['users'].distinct('_id')  # Fetch all user IDs
#     module_ids = db['training_modules'].distinct('_id')  # Fetch all module IDs
#     completion_statuses = ['Completed', 'In Progress']
    
#     for _ in range(10):
#         user_id = random.choice(user_ids)
#         module_id = random.choice(module_ids)
#         completion_status = random.choice(completion_statuses)
#         last_accessed_date = get_random_date(datetime(2023, 1, 1), datetime.now())
        
#         progress_data.append({
#             'UserID': user_id,
#             'moduleID': module_id,
#             'completionStatus': completion_status,
#             'lastAccessedDate': last_accessed_date
#         })
    
#     print(progress_data)

# # Function to insert generated progress tracking data into the database
# def insert_dummy_progress_data(num_entries):
#     try:
#         dummy_data = generate_dummy_progress_data(num_entries)
#         # result = collection.insert_many(dummy_data)
#         # print(f"{len(result.inserted_ids)} dummy progress tracking data inserted successfully.")
#     except Exception as e:
#         print("Error inserting dummy progress tracking data:", e)

# # # Call the function to insert dummy data (adjust the number of entries as needed)
# insert_dummy_progress_data(10)

# Fetch all user IDs
user_ids = db['users'].distinct('_id')

# Fetch all module IDs
module_ids = db['trainingmodules'].distinct('_id')

# Define completion statuses
completion_statuses = ['Completed', 'In Progress']

# Set to store used combinations of User ID and Module ID
used_combinations = set()

# List to store progress data
progress_data = []

# Generate progress data for each user
for user_id in user_ids:
    # Shuffle the module IDs to ensure randomness
    random.shuffle(module_ids)
    
    # Generate progress data for at least 10 modules for each user
    for module_id in module_ids[:random.randint(10,20)]:
        # Check if the combination of User ID and Module ID is already used
        if (user_id, module_id) in used_combinations:
            continue
        
        completion_status = random.choice(completion_statuses)
        last_accessed_date = get_random_date(datetime(2023, 1, 1), datetime.now())
        
        progress_data.append({
            'UserID': user_id,
            'moduleID': module_id,
            'completionStatus': completion_status,
            'lastAccessedDate': last_accessed_date
        })
        
        # Add the used combination to the set
        used_combinations.add((user_id, module_id))

print(len(progress_data))

# Insert progress data into the database
try:
    result = collection.insert_many(progress_data)
    print(f"{len(result.inserted_ids)} progress tracking data inserted successfully.")
except Exception as e:
    print("Error inserting progress tracking data:", e)
    
# Disconnect from MongoDB
client.close()
