create database to_do_list
use to_do_list

create table users(
  id integer primary key auto_increment,
  user_name varchar(255) not null unique,
  email varchar(255) not null unique,
  password  text not null,
  created timestamp not null default now()
)

create table categories(
  id integer primary key auto_increment,
  user_id integer not null,
  category_name varchar(255) not null,
  created timestamp not null default now()
)

create table tasks(
  id integer primary key auto_increment,
  task varchar(255) not null,
  user_id integer not null,
  category_id integer not null,
  created timestamp not null default now()
)




