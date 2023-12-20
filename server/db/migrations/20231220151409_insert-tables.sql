-- migrate:up
INSERT INTO tables (code)
VALUES
  ('1OORJKN'),
  ('2SGVPAS'),
  ('3QBAFRL'),
  ('4NRJQVV'),
  ('5UMSWZV')

-- migrate:down
DELETE FROM tables
WHERE code IN
  (
    '1OORJKN',
    '2SGVPAS',
    '3QBAFRL',
    '4NRJQVV',
    '5UMSWZV'
  )
