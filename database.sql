-- creating the database and granting all the permissions

CREATE DATABASE IF NOT EXISTS LakeSite;
CREATE USER IF NOT EXISTS 'arbes'@'localhost' IDENTIFIED BY 'arbes123';
GRANT ALL PRIVILEGES ON LakeSite.* TO 'arbes'@'localhost';
FLUSH PRIVILEGES;

-- change the database to use the one we created
USE LakeSite; 

--creating tables for users,
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating tables for lakes
CREATE TABLE lakes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create a table to maintain the reservations
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lake_id INT,
    reservation_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lake_id) REFERENCES lakes(id)
);
