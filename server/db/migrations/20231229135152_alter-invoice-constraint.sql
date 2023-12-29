-- migrate:up
ALTER TABLE invoices DROP CONSTRAINT invoices_table_id_fkey;

-- migrate:down
ALTER TABLE invoices ADD CONSTRAINT invoices_table_id_fkey FOREIGN KEY (table_id) REFERENCES tables(id);
