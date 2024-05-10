# Three-tier deployment with ReactJS, Flask, and MySQL
## Tools: VPC, Nginx, Load Balancer, Auto Scaling, and RDS
## Project roadmap
- Create a VPC with 6 subnets, 4 route tables, an IGW, and a NAT using VPC Wizard
- Create 4 EC2 servers for the bastion, backend, frontend, and database. Keep the bastion in a public subnet and others in private subnets
- Configure the database server. Create the database, tables, and users.
- Prepare the deployment environment in the backend server and deploy the backend application
- Prepare the frontend environment and deploy it with Nginx
- Create a Load Balancer for the backend servers
- Create a Load Balancer for the frontend servers
- Create a custom AMI of the frontend server
- Run new frontend servers from the custom AMI
- Create Auto Scaling Group(ASG) for the frontend servers
- Stress the frontend servers manually and check if the ASG is working
- Automate the running of the backend server with a shell script and Cron
- Create an RDS database in the AWS
- Connect to the RDS database in the AWS from the database server
- Import data from the local database server to the RDS database
- Create a custom AMI of the backend server
- Run new backend servers from the custom AMI
- Create Auto Scaling Group(ASG) for the backend servers
- Check if the Backend ASG is working
- View the deployment result
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
