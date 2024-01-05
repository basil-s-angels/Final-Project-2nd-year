-- migrate:up
DROP TABLE tables;

-- migrate:down
CREATE TABLE tables (
  id SERIAL PRIMARY KEY NOT NULL, 
  code VARCHAR(8) NOT NULL
);
INSERT INTO tables (code)
VALUES
  ('1OORJKN'),
  ('2SGVPAS'),
  ('3QBAFRL'),
  ('4NRJQVV'),
  ('5UMSWZV');
