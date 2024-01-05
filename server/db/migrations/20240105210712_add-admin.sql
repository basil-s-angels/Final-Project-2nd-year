-- migrate:up
INSERT INTO users (first_name, last_name, email, position, hashed_password)
VALUES 
  (
    'John', 
    'Doe', 
    'johndoe@gmail.com', 
    'admin', 
    '$2a$10$RE3Zkit7nmpqB/zNcsp7oek.CtbLgv6N/TPABxnWBdf/r2Dk1wlzO'
  );

-- migrate:down
DELETE FROM users
WHERE email = 'johndoe@gmail.com';
