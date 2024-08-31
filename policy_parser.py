import os
import json
import csv
from datetime import datetime

"""
processes a collection of vaccine policy text files and their associated metadata,
metrics, and analysis results. It combines all this information into a structured JSON format
"""

def process_policy_files(directory):
    policies = []
    
    # First, find all the main .txt files (excluding analysis results, meta, and metrics)
    base_files = [f for f in os.listdir(directory) if f.endswith('.txt') and not any(x in f for x in ['_analysis_results', '_meta', '_metrics'])]
    
    for base_file in base_files:
        base_name = os.path.splitext(base_file)[0]
        policy = {"title": base_name}
        
        # Process main content file
        with open(os.path.join(directory, base_file), 'r') as f:
            policy["content"] = f.read().strip()
        
        # Process metrics file
        metrics_file = f"{base_name}_metrics.csv"
        if os.path.exists(os.path.join(directory, metrics_file)):
            with open(os.path.join(directory, metrics_file), 'r') as f:
                reader = csv.reader(f)
                next(reader)  # Skip header
                for row in reader:
                    key, value = row
                    policy[key.strip()] = float(value)
        
        # Process meta file
        meta_file = f"{base_name}_meta.txt"
        if os.path.exists(os.path.join(directory, meta_file)):
            with open(os.path.join(directory, meta_file), 'r') as f:
                for line in f:
                    if line.startswith("Publication Date:"):
                        date_str = line.split(":", 1)[1].strip()
                        # policy["date"] = int(datetime.strptime(date_str, "%d %B %Y").timestamp() * 1000)
                        policy["date"] = datetime.strptime(date_str, "%d %B %Y").strftime("%Y-%m-%d")
        # Process analysis results file
        analysis_file = f"{base_name}_analysis_results.csv"
        policy["analysis"] = []
        if os.path.exists(os.path.join(directory, analysis_file)):
            with open(os.path.join(directory, analysis_file), 'r') as f:
                reader = csv.reader(f)
                next(reader)  # Skip header
                for row in reader:
                    text, metric = row
                    policy["analysis"].append({"text": text.strip(), "metric": metric.strip()})
        
        policies.append(policy)
    
    return policies

# Replace with the path to your vaccine_policy_texts folder
directory = "vaccine_policy_texts"
policies = process_policy_files(directory)

# Save the processed policies to a JSON file
with open("vaccine_policies.json", "w") as f:
    json.dump(policies, f, indent=4)

print(f"Processed {len(policies)} policies and saved to vaccine_policies.json")