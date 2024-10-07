import pandas as pd
import os
import json

def extract_data(id):
    csv_folder = 'csvs'
    filename = f"{id}.csv"
    print(filename)
    file_path = os.path.join(csv_folder, filename)
    print(file_path)

    if not os.path.isfile(file_path):
        return json.dumps({"error": "File not found."})

    try:
        df = pd.read_csv(file_path)
        
        # Dropping missing values and duplicates
        df.dropna(inplace=True)
        df.drop_duplicates(inplace=True)

        # Converting the DataFrame to JSON format suitable for JavaScript
        data_json = df.to_json(orient='records')
        
        return data_json

    except Exception as e:
        return json.dumps({"error": str(e)})
