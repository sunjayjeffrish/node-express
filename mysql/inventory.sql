
CREATE DATABASE if not exists test;
use test;
CREATE TABLE if not exists products COLUMNS(id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, description varchar(40));

INSERT into products VALUES(default, "sundev");
INSERT into products VALUES(default, "suntest");