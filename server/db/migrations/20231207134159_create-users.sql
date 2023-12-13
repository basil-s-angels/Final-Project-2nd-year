-- migrate:up
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  position VARCHAR NOT NULL,
  hashed_password VARCHAR NOT NULL
)

-- migrate:down
DROP TABLE users
