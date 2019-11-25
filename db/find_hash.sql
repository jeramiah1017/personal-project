select * from users u 
join user_hash hh on u.user_id = hh.user_id
where email = $1;