## DBMSGRAM 

This is a dbms project about creating a Instagram like application from scratch.


Still a working in progress..... 


##So far:

1. Backend API + basic necessary queries pretty much finished, although, still need to change  

##TODO:

1. User Authentication !!!
2. Backend and frontend connection: such as upload photos, edit profiles etc. i.e., frontend action talk with backend API

## Setup && How to get it running

# Preq: 
1. Postgres 9.4.5
2. Node 4.2.2

# Setup
1. need to run build.sql in 'server/models/' like this (assuming psql setup):
psql -f build.sql

2. need to run this command at the root directory to get the frontend running:
python -m SimpleHTTPServer

3. need to run this command at the root directory to get the backend running:
npm start

4. goto localhost:8000 to launch Dbmsgram 

NOTE: 
- so far login/signup does not work... (sad..)
- so far only some backend API endpoints are available
- so far only http://localhost:8000/client/#/userpersonalfeed works



© Hua (Michael) Chen
