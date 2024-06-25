-- Migration number: 0001 	 2024-06-24T07:03:43.984Z
CREATE TABLE order_customer (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	order_number TEXT NOT NULL,
	customer_name TEXT NOT NULL,
	customer_type TEXT NOT NULL
);
