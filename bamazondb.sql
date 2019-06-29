create database bamazon;

use bamazon;

create table products (
	itemid int auto_increment not null,
    product_name varchar (50) not null,
    department_name varchar (50) not null,
    price decimal (10,4) not null,
    stock_quantity int (10) not null,
	primary key (itemid)

);