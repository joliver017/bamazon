CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  stock_quantity INTEGER (6),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Daft Punk - Random Access Memories (Vinyl)", "Music", 29.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coco (Blu-Ray)", "Movies", 19.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Yung-1", "Shoes", 89.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Hoodie", "Clothes", 34.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Audio Technica LP120", "Music", 199.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The xx (self-titled) - Vinyl", "Music", 14.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Deerupt", "Shoes", 59.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kid Cudi - Man on the Moon (Vinyl)", "Music", 24.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("J Cole - 2014 Forest Hills Drive (Vinyl)", "Music", 14.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Track Pants", "Clothes", 29.99, 100);

SELECT * FROM products