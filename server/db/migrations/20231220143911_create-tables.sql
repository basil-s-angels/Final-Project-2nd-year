-- migrate:up
CREATE TABLE tables (
  id SERIAL PRIMARY KEY NOT NULL, 
  code VARCHAR(8) NOT NULL
) 

-- migrate:down
DROP TABLE tables
