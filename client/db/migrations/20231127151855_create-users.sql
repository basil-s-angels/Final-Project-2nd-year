-- migrate:up
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  fname text NOT NULL,
  lname text NOT NULL,
  email text NOT NULL,
  position text NOT NULL,
  password text NOT NULL
)

-- migrate:down
DROP TABLE users
