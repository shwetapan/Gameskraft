# -*- coding: utf-8 -*-
"""skill_based.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1OjYiHUlSBhIsII4zV7Ai3J19RUIHiwSr
"""

import numpy as np
import pandas as pd

data = pd.read_excel(r'/content/Chaalaang_Gameskraft_Input Data.xlsx', sheet_name='User Game Skill & Interest Data')
data

pd.read_excel(r'/content/Chaalaang_Gameskraft_Input Data.xlsx', sheet_name='User Game Skill & Interest Data').to_csv('User Game Skill & Interest Data.csv',index=False)

data=pd.read_csv(r'/content/User Game Skill & Interest Data.csv')

data.head()

data = data.rename(columns={'Skill Score (out of 10)':'Skill_Score','Interest Level (out of 10)':'Interest_Level'})

data.head()

!pip install surprise

from sklearn.metrics.pairwise import cosine_similarity
from surprise import  Reader,Dataset

reader = Reader(rating_scale=(0, 10))
data_cf = Dataset.load_from_df(data[['UserId', 'GameId','Interest_Level']], reader)

#Content-Based Filtering
# Assume 'SkillScore' is normalized between 0 and 1
data_cb = data[['UserId', 'GameId', 'Skill_Score', 'Interest_Level']]
user_interests = data_cb.pivot_table(index='UserId', columns='GameId', values='Interest_Level', fill_value=0)
user_skills = data_cb.pivot_table(index='UserId', columns='GameId', values='Skill_Score', fill_value=0)

user_skills

# Calculate similarity matrices
similarity_interest = cosine_similarity(user_interests)
similarity_skills = cosine_similarity(user_skills)

def suggest_similar_users(user_id, n=5):
    print("Finding similar users...")
    # Assuming 'data' contains the user-game interaction data and user features

    # Collaborative Filtering: Find similar users based on game interactions
    similar_users_cf = collaborative_filtering(user_id)

    # Content-Based Filtering: Find similar users based on skill scores and interest levels
    similar_users_cb = content_based_filtering(user_id)

    # Combine results from CF and CB using a hybrid approach
    hybrid_similar_users = combine_results(similar_users_cf, similar_users_cb)

    # Return the top n similar users
    print("Similar users found.")
    return hybrid_similar_users[:n]

def collaborative_filtering(user_id):
    print("Performing collaborative filtering...")
    # Implement collaborative filtering to find similar users based on game interactions
    # Return a list of similar users

    # Example: Find users who played similar games
    user_games = data[data['UserId'] == user_id]['GameId'].unique()
    similar_users_cf = []
    for game_id in user_games:
        similar_users_cf.extend(data[data['GameId'] == game_id]['UserId'].unique())
    similar_users_cf = set(similar_users_cf) - set([user_id])
    print("Collaborative filtering done.")
    return list(similar_users_cf)

def content_based_filtering(user_id, threshold=0.1):
    print("Performing content-based filtering...")
    # Filter users based on skill score and interest level thresholds
    user_skills = data[data['UserId'] == user_id]['Skill_Score'].mean()
    user_interest = data[data['UserId'] == user_id]['Interest_Level'].mean()

    similar_users_cb = data[
        (abs(data['Skill_Score'] - user_skills) <= threshold) &
        (abs(data['Interest_Level'] - user_interest) <= threshold) &
        (data['UserId'] != user_id)  # Exclude the current user
    ]['UserId'].unique()
    return similar_users_cb

def combine_results(similar_users_cf, similar_users_cb):
    # Ensure both lists are lists
    if not isinstance(similar_users_cf, list):
        similar_users_cf = []
    if not isinstance(similar_users_cb, list):
        similar_users_cb = []

    # Concatenate the lists
    hybrid_similar_users = similar_users_cf + similar_users_cb

    # Remove duplicates
    hybrid_similar_users = list(set(hybrid_similar_users))

    return hybrid_similar_users

user_id = 5
data=pd.DataFrame(data)
similar_users = suggest_similar_users(user_id)
similar_users = suggest_similar_users(user_id)

import random

def suggest_random_users(similar_users, num_users=3):
    if similar_users:
        return random.sample(similar_users, min(num_users, len(similar_users)))
    else:
        return []

random_users = suggest_random_users(similar_users, num_users=3)
if random_users:
    print("Random suggested users:", random_users)
else:
    print("No similar users found to suggest.")

# Dictionary to store connections (friends) for each user
connections = {}

def add_connection(user_id, connected_user_id):
    if user_id not in connections:
        connections[user_id] = set()  # Initialize set for user's connections
    connections[user_id].add(connected_user_id)

def connect_suggested_users(user_id, suggested_users):
    for suggested_user_id in suggested_users:
        add_connection(user_id, suggested_user_id)
        # Optionally, add reciprocal connection
        add_connection(suggested_user_id, user_id)




# Connect the suggested users to the current user
connect_suggested_users(user_id, random_users)

# Print connections for the current user
print("Connections for user", user_id, ":", connections.get(user_id, "No connections"))





