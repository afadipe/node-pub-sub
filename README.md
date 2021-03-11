
# GCP PubSub Project

# Getting started
==================
Create a service account in GCP,also give the following roles to the service account
Pub/Sub Admin
Pub/Sub Editor
Pub/Sub Publisher
Pub/Sub Subsscriber
Pub/Sub Viewer

# Copy the json secret key for the account created above
==========================================================
An replace it witht the one in credentials

# Enable the following API on the service account Project
==========================================================
Cloud Pub/Sub  API

# To set environment deployment variable i.e db name etc
create a .env  file, then add your detail using key pair i.e Name=value
===================================
List of NameValue for .env 
===================================
GOOGLE_APPLICATION_CREDENTIALS= "./credentials/secrets.json"
PORT = 5000
TopicName = 'order_delivery'
SubscriptionName= 'order_delivery_sub'
===================================




