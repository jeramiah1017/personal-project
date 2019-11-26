select * from users u 
join users_hash hh on u.user_id = hh.user_id
where email = $1;