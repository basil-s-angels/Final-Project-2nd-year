-- migrate:up
CREATE TABLE line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity INT NOT NULL, 
  food_id INT REFERENCES foods(id) ON DELETE CASCADE,
  invoice_id INT REFERENCES invoices(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE line_items
