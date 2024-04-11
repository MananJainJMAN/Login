from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from flask_cors import CORS


app = Flask(__name__)

CORS(app)  # Enable CORS for all routes in the app
# Load the pre-trained model with best parameters
best_model = RandomForestRegressor(
    max_depth=30,
    min_samples_leaf=4,
    min_samples_split=10,
    n_estimators=100
)

# Load the training data and preprocess
finalData_train = pd.read_csv('./FinalData.csv')
df_ohe = pd.get_dummies(finalData_train, columns=['Category', 'Interactive Exercises'], drop_first=True)
X_train = df_ohe.drop(["Duration (weeks)"], axis=1)
y_train = df_ohe["Duration (weeks)"]

# Fit the model on the training data
best_model.fit(X_train, y_train)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from JSON request
        input_data = request.get_json()
        
        # Create a DataFrame from the input data
        user_data = pd.DataFrame([input_data])

        # Predict using the pre-trained model
        predicted_duration = best_model.predict(user_data)
        
        # Convert the predicted duration to an integer
        predicted_duration_integer = int(predicted_duration[0])
        
        # Return the predicted duration as a JSON response
        return jsonify({'predicted_duration_weeks': predicted_duration_integer})

    except Exception as e:
        # Return error message if an exception occurs
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
