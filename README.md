# DBMSGRAM

This is a dbms project about creating a Instagram like application from scratch.

Still a working in progress.....

# Setup && How to get it running

## Preq:
1. Postgres 9.4.5
2. Node 4.2.2

## Setup

###### Postgres assumption:
<p>psql username: mc</p>
<p>psql connection password: dbms-project-3753</p>

1. need to run build.sql in *'server/models/'* like below (assuming in that directory):

    `psql -f build.sql`

2. need to install all necessary *node_modules* for the backend to work: (**the code below only install it in a subdirectory of the project root directory. It won't mess up your computer**)

    `npm install`

3. need to run this command at the root directory of the project to get the frontend running:

    `python -m SimpleHTTPServer`

4. need to run this command at the root directory of the project to get the backend running:

    `npm start`

5. goto http://localhost:8000/client/ to launch Dbmsgram



#### What works so far:

1. Backend API + basic necessary queries pretty much finished, although, still need to change  
2. Can upload photo by goto http://localhost:8000/client/#/upload
3. Can view all uploaded photo at http://localhost:8000/client/#/userpersonalfeed

###### NOTE:
- so far login/signup does not work... (sad..)
- so far only some backend API endpoints are available
- so far only http://localhost:8000/client/#/userpersonalfeed works

## TODO:

1. User Authentication !!!
2. Backend and frontend connection: such as post comments, follow others, edit profiles etc. i.e., frontend action talk with backend API


© Hua (Michael) Chen
