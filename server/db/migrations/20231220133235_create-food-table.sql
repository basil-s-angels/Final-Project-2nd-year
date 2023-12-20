-- migrate:up
CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  details VARCHAR NOT NULL,
  price INT NOT NULL
)

-- migrate:down
DROP TABLE foods
