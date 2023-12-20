-- migrate:up
ALTER TABLE foods
ALTER COLUMN price TYPE DECIMAL

-- migrate:down
ALTER TABLE foods
ALTER COLUMN price TYPE INT
