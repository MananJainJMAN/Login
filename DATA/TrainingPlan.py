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
    
   # Generate random start and end dates within 8 hours
    start_date = datetime.now() + timedelta(hours=random.randint(0, 7))  # Example start date within 8 hours
    end_date = start_date + timedelta(hours=random.randint(1, 8))  # Example end date within 8 hours
    
    # Format start and end dates as strings
    start_date_str = start_date.strftime('%Y-%m-%dT%H:%M')
    end_date_str = end_date.strftime('%Y-%m-%dT%H:%M')
    
    # Append data to the training_plan_data list
    training_plan_data.append({
        'planName': plan_name,
        'department': department,
        'description': description,
        'moduleID': str(module_id).split("'")[0],
        'schedule': {
              'startDate': start_date_str,
            'endDate': end_date_str
        }
    })
    print(training_plan_data[i])

# Insert training plan data into the database
try:
    result = collection.insert_many(training_plan_data)
    print(f"{len(result.inserted_ids)} training plan data inserted successfully.")
except Exception as e:
    print("Error inserting training plan data:", e)

# Disconnect from MongoDB
client.close()
