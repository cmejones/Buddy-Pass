# Buddy-Pass

Buddy Pass is an internal networking application developed for the purpose of bringing together teams across the
company to network and build community.  To use the application, the user will need a LinkedIn account in order to
create and log-in to the application. Once logged in, user will be taken to the profile view where one can
then update their profile by clicking on the update button. An option to delete their account 
is also available should the user decide they no longer want to participate. 


## Live Demo
A working demo of the project can be found [here](https://www.buddy-pass.herokuapp.com).

## Getting Started

###Pre-requisites
You will need to install PostgreSQL on your machine. For instructions on how to do this, please see this [link](https://postgresapp.com/)
Configure the database on your local machine for the project. 

### Installation
To install this project locally on your machine, use git clone repository to your machine. 
In your terminal, enter: 
``npm install``

This will install specified dependencies in the package.json file.

In your terminal, run 
```sequelize db:migrate```

This will run the migrations located in the migrations folder.


Run server: ```npm start```

View the website at: http://localhost:3000


#### Tools

- Database: PostgreSQL, Sequelize, Postico
- Server side: express and axios
- Authentication: PassportJS
- Templating: EJS




#### Contributors

- [Christina Jones](https://github.com/cmejones)

- [Leah Harrichand](https://github.com/leah-h)



