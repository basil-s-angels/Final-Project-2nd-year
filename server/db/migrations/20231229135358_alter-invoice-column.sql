-- migrate:up
ALTER TABLE invoices RENAME COLUMN table_id TO table_num;

-- migrate:down
ALTER TABLE invoices RENAME COLUMN table_num TO table_id;
