# Articles API

A RESTful API for managing articles, topics, comments, and users. 
This project is a backend service built with Node.js, Express.js, and PostgreSQL. 
It provides endpoints to create, read, update, and delete articles and comments, 
with user authentication and topic management.

## Hosted Version
Check out the live version of the API https://jesjin-nc-news.onrender.com.

## Project Summary
This project serves as the backend for an articles management system. 
It allows users to:

- View a list of articles, filterable by topics.
- View detailed information about a single article, including comment counts.
- Add comments to articles.
- Update the votes on articles.
- Delete comments.
- Manage topics and users.

The API is designed to be robust and flexible, supporting a variety of queries and 
ensuring data integrity through comprehensive validation and error handling.


## Getting Started
Follow these instructions to set up the project on your local machine.


### Installation

**Clone the repository:**
   git clone https://github.com/jesjin/jesjin_nc_news.git
   cd jesjin_nc_news

**Setting Up Environment Variables**
To run this project locally, you need to set up environment variables that are not included in the repository due to the .gitignore file. Follow the instructions below to create the necessary environment variable files.

1. Create '.env.development' and '.env.test' Files
   - These files will store the environment variables required to connect to your local developement and test database.
2. Database Connection Strings 
   - Inside each of these files, define the 'PGDATABASE' environment variable. 
   - Replace 'your_developmnent_database' and 'your_test_database' with the names of your local development and test database which is 'nc_news' and 'nc_news_test'

**Setting Up Seed the local database**
Ensure your PostgreSQL service is running and then run the following commands to create and seed your database:
 * npm run setup-dbs
 * npm run seed
 * Run the tests: npm test

Ensure you have the following installed on your local machine:
- Node.js v21.7.2
- PostgreSQL 14.11


# Contact
For any inquiries or issues, please reach out to: jess.hk.jin@gmail.com

