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
collection = db['trainingplans']

# Define departments
departments = ['HR', 'IT', 'Finance']

# Fetch all module IDs
module_ids = db['trainingmodules'].distinct('_id')

# List to store training plan data
training_plan_data = []

# Set to store used module IDs
used_module_ids = set()

# Function to format date as ISO 8601 string
def format_iso_date(date):
    return date.strftime('%Y-%m-%dT%H:%M:%S')

# Generate training plan data
for i in range(6000):  # Adjust the number of training plans to generate as needed
    plan_name = f"Training Plan {i + 1}"  # Example plan name
    department = random.choice(departments)
    description = f"Training plan for {department} department"  # Example description
    
    # Randomly select a module ID that hasn't been used yet
    available_module_ids = list(set(module_ids) - used_module_ids)
    if not available_module_ids:
        break  # Break if all module IDs have been used
    module_id = random.choice(available_module_ids)
    
    # Add the used module ID to the set
    used_module_ids.add(module_id)
    # Randomly select a start date within the past few years
    start_date = datetime.now() - timedelta(days=random.randint(1, 365 * 3))  # Random date within the past 3 years
    
    # Randomly select a duration within 6 to 8 hours
    duration_hours = random.randint(6, 8)
    
    # Calculate end date based on the duration (ensuring it stays within the same day)
    end_date = start_date + timedelta(hours=duration_hours)
    

    # Append data to the training_plan_data list
    training_plan_data.append({
        'planName': plan_name,
        'department': department,
        'description': description,
        'moduleID': str(module_id).split("'")[0],
        'schedule': {
              'startDate': format_iso_date(start_date),
            'endDate': format_iso_date(end_date)
        }
    })
    print(training_plan_data[i])

# Insert training plan data into the database
try:
    result = collection.insert_many(training_plan_data)
    print(f"{len(result.inserted_ids)} training plan data inserted successfully.")
except Exception as e:
    print("Error inserting training plan data:", e)

# #inventory.delete_many({})
# cursor = collection.find({})

# # Iterate over the cursor to print and count documents
# document_count = 0
# for document in cursor:
#     print(document)
#     document_count += 1

# print("Total documents:", document_count)  # This will show the total count of documents

# # Delete all documents in the 'inventory' collection
# result = collection.delete_many({})

# print("Number of documents deleted:", result.deleted_count)

# Disconnect from MongoDB
client.close()