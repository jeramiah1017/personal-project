create table Users (
user_id serial primary key,
email text,
username varchar(50),
bio varchar(250)
)
create  table users_hash (
hash_id serial primary key,
hash TEXT,
user_id int REFERENCES users(user_id)
)
create  table favorites (
favorites_id serial primary key,
user_id int references users(user_id),
key varchar(15),
name varchar(30),
image text
);

insert into users (email, username, bio )
values 
('idubbbz1017@gmail.com', 'oftt', 'This is a smurf haha')

insert into favorites (name, image)
values ('Vi', 'http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/Vi.png')