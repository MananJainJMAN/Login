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
collection = db['trainingmodules']

# Initialize Faker
fake = Faker()

# Define a list of difficulty levels
difficulty_levels = ['Beginner', 'Intermediate', 'Advanced']

module_descriptions = [
    "Learn the fundamentals of Python programming language.",
    "Explore the development of interactive web applications using JavaScript.",
    "Master the concepts and syntax of Java programming.",
    "Develop applications using C# programming language and .NET framework.",
    "Learn to write code in Ruby programming language.",
    "Develop iOS applications using Swift programming language.",
    "Build Android apps using Kotlin programming language.",
    "Learn to use TypeScript for building scalable and maintainable web applications.",
    "Understand the basics of HTML5 and CSS3 for web development.",
    "Learn techniques for creating websites that adapt to various screen sizes.",
    "Develop dynamic user interfaces with React.js library.",
    "Explore the Angular framework for building web applications.",
    "Learn to build backend servers and APIs using Node.js.",
    "Master the Express.js framework for building web applications.",
    "Get hands-on experience in full-stack web development.",
    "Introduction to the field of data science and its applications.",
    "Learn data analysis techniques using Python libraries like Pandas and NumPy.",
    "Master data visualization with Matplotlib library in Python.",
    "Understand the fundamentals of machine learning algorithms and techniques.",
    "Explore deep learning concepts using TensorFlow and Keras libraries.",
    "Learn natural language processing techniques for text analysis.",
    "Introduction to big data technologies like Hadoop and Spark.",
    "Understand the basics of cloud computing and its services.",
    "Learn the fundamentals of Amazon Web Services (AWS).",
    "Explore the core concepts of Microsoft Azure cloud platform.",
    "Understand the key services offered by Google Cloud Platform (GCP).",
    "Learn best practices for securing cloud environments.",
    "Explore the architecture and benefits of serverless computing.",
    "Understand the principles and practices of DevOps.",
    "Learn about continuous integration and continuous deployment pipelines.",
    "Master Ansible for automating configuration management tasks.",
    "Explore Docker for containerization of applications.",
    "Understand Kubernetes for container orchestration.",
    "Learn to manage infrastructure using Terraform.",
    "Introduction to cybersecurity and its importance.",
    "Explore ethical hacking techniques for security testing.",
    "Understand the fundamentals of network security.",
    "Learn techniques for securing web applications from common threats.",
    "Introduction to cryptography and its applications in security.",
    "Understand security compliance requirements and governance frameworks.",
    "Learn to develop iOS applications using Swift programming language.",
    "Explore Android app development using Kotlin programming language.",
    "Learn to develop cross-platform mobile apps using React Native.",
    "Understand principles of mobile UI and UX design.",
    "Learn techniques for testing and debugging mobile applications.",
    "Explore the fundamentals of user experience design.",
    "Understand principles of user interface design.",
    "Learn to create wireframes and prototypes for UX/UI design.",
    "Explore Adobe XD or Sketch for designing user interfaces.",
    "Learn techniques for conducting usability testing and user research.",
    "Understand the concept of design systems and component libraries.",
    "Introduction to agile methodologies for project management.",
    "Understand the basic principles of project management.",
    "Explore tools like Jira and Trello for agile project management.",
    "Learn techniques for project planning and estimation.",
    "Understand risk management strategies in project management.",
    "Learn effective communication techniques for project teams.",
    "Explore techniques for optimizing websites for search engines.",
    "Learn to run effective search engine marketing campaigns.",
    "Explore strategies for marketing on social media platforms.",
    "Learn techniques for creating and distributing content online.",
    "Understand best practices for email marketing campaigns.",
    "Learn to analyze website traffic and user behavior.",
    "Understand the basics of financial management and budgeting.",
    "Learn time management techniques for improved productivity.",
    "Explore effective communication skills for professional environments.",
    "Learn techniques for leading and managing teams.",
    "Understand negotiation techniques for business deals.",
    "Learn effective presentation skills for professional settings.",
    "Introduction to blockchain technology and its applications.",
    "Explore the Internet of Things (IoT) and its use cases.",
    "Understand the concepts of augmented reality (AR) and virtual reality (VR).",
    "Introduction to quantum computing and its potential applications.",
    "Learn about robotic process automation (RPA) technologies.",
    "Explore the concept of edge computing and its benefits."
]
training_modules = [
    "Python Programming",
    "JavaScript Development",
    "Java Programming",
    "C# Programming",
    "Ruby Programming",
    "Swift Programming",
    "Kotlin Programming",
    "TypeScript Development",
    "HTML5 and CSS3 Fundamentals",
    "Responsive Web Design",
    "React.js Development",
    "Angular Development",
    "Node.js Development",
    "Express.js Framework",
    "Full-Stack Web Development",
    "Introduction to Data Science",
    "Data Analysis with Python",
    "Data Visualization with Matplotlib",
    "Machine Learning Fundamentals",
    "Deep Learning with TensorFlow",
    "Natural Language Processing",
    "Big Data Technologies",
    "Introduction to Cloud Computing",
    "AWS Fundamentals",
    "Azure Fundamentals",
    "GCP Fundamentals",
    "Cloud Security Best Practices",
    "Serverless Architecture",
    "Introduction to DevOps",
    "CI/CD",
    "Configuration Management with Ansible",
    "Containerization with Docker",
    "Orchestration with Kubernetes",
    "Infrastructure as Code with Terraform",
    "Introduction to Cybersecurity",
    "Ethical Hacking and Penetration Testing",
    "Network Security Fundamentals",
    "Web Application Security",
    "Cryptography Basics",
    "Security Compliance and Governance",
    "iOS App Development",
    "Android App Development",
    "Cross-Platform App Development",
    "Mobile UI/UX Design Principles",
    "Mobile App Testing and Debugging",
    "User Experience Design Fundamentals",
    "User Interface Design Principles",
    "Wireframing and Prototyping",
    "Design with Adobe XD or Sketch",
    "Usability Testing and User Research",
    "Design Systems and Component Libraries",
    "Agile Methodologies",
    "Project Management Fundamentals",
    "Agile Project Management Tools",
    "Project Planning and Estimation",
    "Risk Management",
    "Stakeholder Communication and Collaboration",
    "Search Engine Optimization",
    "Search Engine Marketing and PPC",
    "Social Media Marketing",
    "Content Marketing Strategies",
    "Email Marketing",
    "Web Analytics and Reporting",
    "Financial Literacy and Budgeting",
    "Time Management and Productivity",
    "Effective Communication Skills",
    "Leadership and Team Management",
    "Negotiation Skills",
    "Presentation Skills",
    "Blockchain Development",
    "Internet of Things",
    "Augmented Reality and Virtual Reality",
    "Quantum Computing",
    "Robotic Process Automation",
    "Edge Computing"
]

module_prerequisites = [
    [],  # Python Programming
    [],  # JavaScript Development
    [],  # Java Programming
    [],  # C# Programming
    [],  # Ruby Programming
    [],  # Swift Programming
    [],  # Kotlin Programming
    [],  # TypeScript Development
    [],  # HTML5 and CSS3 Fundamentals
    [],  # Responsive Web Design
    [],  # React.js Development
    [],  # Angular Development
    [],  # Node.js Development
    [],  # Express.js Framework
    [],  # Full-Stack Web Development
    [],  # Introduction to Data Science
    ["Python Programming"],  # Data Analysis with Python
    ["Python Programming"],  # Data Visualization with Matplotlib
    ["Python Programming", "Mathematics"],  # Machine Learning Fundamentals
    ["Python Programming", "Machine Learning Fundamentals"],  # Deep Learning with TensorFlow
    ["Python Programming"],  # Natural Language Processing
    ["Python Programming", "Big Data Technologies"],  # Big Data Technologies
    [],  # Introduction to Cloud Computing
    [],  # AWS Fundamentals
    [],  # Azure Fundamentals
    [],  # GCP Fundamentals
    ["Introduction to Cloud Computing"],  # Cloud Security Best Practices
    [],  # Serverless Architecture
    [],  # Introduction to DevOps
    [],  # CI/CD
    [],  # Configuration Management with Ansible
    [],  # Containerization with Docker
    [],  # Orchestration with Kubernetes
    [],  # Infrastructure as Code with Terraform
    [],  # Introduction to Cybersecurity
    [],  # Ethical Hacking and Penetration Testing
    ["Network Security Fundamentals"],  # Network Security Fundamentals
    ["JavaScript Development"],  # Web Application Security
    [],  # Cryptography Basics
    [],  # Security Compliance and Governance
    [],  # iOS App Development
    [],  # Android App Development
    [],  # Cross-Platform App Development
    ["Mobile UI/UX Design Principles"],  # Mobile UI/UX Design Principles
    [],  # Mobile App Testing and Debugging
    ["User Experience Design Fundamentals"],  # User Experience Design Fundamentals
    ["User Interface Design Principles"],  # User Interface Design Principles
    [],  # Wireframing and Prototyping
    ["Wireframing and Prototyping"],  # Design with Adobe XD or Sketch
    ["User Research"],  # Usability Testing and User Research
    [],  # Design Systems and Component Libraries
    [],  # Agile Methodologies
    [],  # Project Management Fundamentals
    [],  # Agile Project Management Tools
    [],  # Project Planning and Estimation
    [],  # Risk Management
    [],  # Stakeholder Communication and Collaboration
    [],  # Search Engine Optimization
    [],  # Search Engine Marketing and PPC
    [],  # Social Media Marketing
    [],  # Content Marketing Strategies
    [],  # Email Marketing
    [],  # Web Analytics and Reporting
    [],  # Financial Literacy and Budgeting
    [],  # Time Management and Productivity
    [],  # Effective Communication Skills
    [],  # Leadership and Team Management
    [],  # Negotiation Skills
    [],  # Presentation Skills
    [],  # Blockchain Development
    [],  # Internet of Things
    [],  # Augmented Reality and Virtual Reality
    [],  # Quantum Computing
    [],  # Robotic Process Automation
    []   # Edge Computing
]



# Generate and upload fake data
num_modules_to_generate = 100  # Adjust the number of modules to generate as needed


generated_modules = []
for module_name in training_modules:
    module_index = training_modules.index(module_name)
    module = {
        'moduleName': module_name,
        'description': module_descriptions[module_index],
        'duration': random.randint(1, 8),  # Generate a random duration between 1 and 24 hours
        'difficultyLevel': random.choice(difficulty_levels),
        'prerequisites': module_prerequisites[module_index],
        'resourceLinks': [
            {'title': fake.word(), 'url': fake.url()} for _ in range(random.randint(1, 5))  # Generate 1 to 5 random resource links
        ]
    }
    # Check if the generated module is unique
    if module not in generated_modules:
        generated_modules.append(module)
        collection.insert_one(module)
        # print(module)
    else:
        print("Duplicate module found. Skipping...")

print("Data uploaded successfully")


# Disconnect from MongoDB
client.close()