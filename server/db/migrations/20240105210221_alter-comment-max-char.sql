-- migrate:up
ALTER TABLE invoices
ALTER COLUMN comment TYPE VARCHAR(255)

-- migrate:down
ALTER TABLE invoices
ALTER COLUMN comment TYPE VARCHAR
