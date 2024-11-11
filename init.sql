CREATE DATABASE IF NOT EXISTS dextrading;
CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON dextrading.* TO 'your_user'@'%';
FLUSH PRIVILEGES;