# 3-tier-application deployment

## Components
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
