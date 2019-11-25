insert into users (email, username, bio)
values (${email}, ${username}, ${bio})
returning user_id;