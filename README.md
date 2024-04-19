# Three-tier deployments with ReactJS, Flask, and MySQL
## Project roadmap
- Create a VPC  
- Create two subnets (public and private)
- Create an Internet Gateway for the public subnet
- Create a NAT Gateway for the public subnet
- One public route with the public subnet
- One private route with the private subnet
- Create two EC2 instances. One for the frontend server and another for the backend+database server
- Clone the three-tier project
- Install all the dependencies for the database on the backend+database server
- Create the database, database user, and tables in MySQL
- Install the backend dependencies on the backend+database server
- Connect the database with the backend
- Install the frontend dependencies
- Connect the frontend to the backend
- View the result

## Requirements
    - Frontend (ReactJS)
    - Backend (Python, Flask)
    - Database (MySQL)

## Prerequisites
Create and deploy the MySQL Database Server and then run the following SQL commands in order to get the DB ready to deploy-

Create Tables
```
CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, email varchar(100) NOT NULL, password varchar(100) NOT NULL, primary key(id));
CREATE TABLE history (id int NOT NULL AUTO_INCREMENT, number varchar(100) NOT NULL, response varchar(100) NOT NULL, type varchar(30) NOT NULL, time timestamp default current_timestamp, primary key(id));
```

Create Users
```
CREATE USER 'twotieruser'@'%' IDENTIFIED BY 'super-secret-password';
GRANT ALL PRIVILEGES ON *.* TO 'twotieruser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
# Thank You!
