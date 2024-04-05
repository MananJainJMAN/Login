import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
import pymongo
from pymongo import MongoClient
import pandas as pd

# Load environment variables from .env file
load_dotenv()

# Access the MongoDB connection string from environment variables
db_string = os.getenv('DB_String')

# Check if the connection string is present
if db_string is None:
    raise ValueError("DB_String environment variable is not set.")

# Connect to MongoDB
mongo_client = MongoClient(db_string)
mongo_db = mongo_client['usermodel']  # Replace 'your_database' with your actual database name
collectionUsers = mongo_db['users']
collectionModules = mongo_db['trainingmodules']
collectionPlans = mongo_db['trainingplans']
collectionAsessment = mongo_db['trainingassessments']
collectionProgress = mongo_db['progresstrackings']
# Connect to SSMS
SERVER_NAME = 'DESKTOP-K331LQJ'
DATABASE_NAME = 'ETMS'
connection_string = f"mssql+pyodbc://{SERVER_NAME}/{DATABASE_NAME}?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
engine = create_engine(connection_string)


#loading User table

UserData = collectionUsers.find({})

df = pd.DataFrame(UserData)
df.to_excel('users_data.xlsx',index = False)

TABLE_NAME = 'users_data'
excel_fileUsers = pd.read_excel('users_data.xlsx', sheet_name=None)
for sheet_name, df_data in excel_fileUsers.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)
    
#loading modules

ModuleData = collectionModules.find({})
df = pd.DataFrame(ModuleData)
df.to_excel('module_data.xlsx',index =False)

TABLE_NAME = 'modules_data'
excel_fileModules = pd.read_excel('module_data.xlsx',sheet_name=None)
for sheet_name, df_data in excel_fileModules.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

#loading plans

PlanData = collectionPlans.find({})
df = pd.DataFrame(PlanData)
df.to_excel('plan_data.xlsx',index =False)

TABLE_NAME = 'plans_data'
excel_filePlans = pd.read_excel('plan_data.xlsx',sheet_name=None)
for sheet_name, df_data in excel_filePlans.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

#loading assessmentsData

AssessData = collectionAsessment.find({})
df = pd.DataFrame(AssessData)
df.to_excel('assessment_data.xlsx',index =False)

TABLE_NAME = 'assessment_data'
excel_fileAssessment = pd.read_excel('assessment_data.xlsx',sheet_name=None)
for sheet_name, df_data in excel_fileAssessment.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)


#loading ProgressData

ProgressData = collectionProgress.find({})
df = pd.DataFrame(ProgressData)
df.to_excel('progress_data.xlsx',index =False)

TABLE_NAME = 'progress_data'
excel_fileProgress = pd.read_excel('progress_data.xlsx',sheet_name=None)
for sheet_name, df_data in excel_fileProgress.items():
    df_data.to_sql(TABLE_NAME, engine, if_exists='replace', index=False)

