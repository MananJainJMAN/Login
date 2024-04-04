import os
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient
from faker import Faker  # Optional: Library to generate fake data
import random 

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
collection = db['users']
departments = ['HR', 'IT', 'Finance']
# Function to generate user data
def generate_user_data():
    fake = Faker()

    department = random.choice(departments)

# Define user data dictionary with random values
    user_data = {
        'email': fake.email(),
        'password': fake.password(),  # You may want to generate a secure password
        'role': 'Employee',
        'department': department
    }

    return user_data


# Populate the User collection
def populate_users(num_users):
    for _ in range(num_users):
        user_data = generate_user_data()
        collection.insert_one(user_data)

if __name__ == "__main__":
    num_users_to_generate = 300  # Define the number of users to generate
    populate_users(num_users_to_generate)
    print(f"{num_users_to_generate} users inserted successfully.")
