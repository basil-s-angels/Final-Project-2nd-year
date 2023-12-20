-- migrate:up
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL,
  status VARCHAR NOT NULL,
  comment VARCHAR NOT NULL,
  table_id INT REFERENCES tables(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE invoices
