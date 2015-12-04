## Prerequisite for running, PostgreSQL
Version: 
Postgres 9.4.4

## Running command

# option 1: 
#   BIG assumption that user has already have setup psql
#   i.e., psql -d userDBname -h localhost -U userDBLoginName
psql -f build.sql 

# option 2:
#   Big assumption on the there is a default postgres database called 'postgres'
psql -d postgres -h localhost -U userDBLoginName -f build.sql

## Running the select.sql script
using either options from above, replace 'build.sql' with 'select.sql'

## NOTE
The database is very likely to change slightly once starting building the backend.
