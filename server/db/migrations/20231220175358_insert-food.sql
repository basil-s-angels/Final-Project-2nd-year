-- migrate:up
INSERT INTO foods (name, details, type, price)
VALUES
  (
    'Caesar Salad',
    'Romaine lettuce with Caesar dressing',
    'Appetizer',
    175.99
  ),
  (
    'Spaghetti Carbonara',
    'Pasta with creamy bacon sauce',
    'Main',
    189
  ),
  (
    'Grilled Salmon',
    'Fresh salmon with a lemon butter glaze',
    'Main',
    300
  ),
  (
    'Chocolate Lava Cake',
    'Warm cake with a gooey chocolate center',
    'Dessert',
    99.99
  ),
  (
    'Margherita Pizza',
    'Classic cheese and tomato base',
    'Pizza',
    250
  ),
  (
    'Pepperoni Pizza',
    'Mozzarella cheese, salami, pepper, tomatoes, spices and fresh basil',
    'Pizza',
    210.95
  )

-- migrate:down
DELETE FROM foods
WHERE name IN
  (
    'Caesar Salad',
    'Spaghetti Carbonara',
    'Grilled Salmon',
    'Chocolate Lava Cake',
    'Margherita Pizza',
    'Pepperoni Pizza'
  )
