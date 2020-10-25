CREATE TABLE measures (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	exchangeRatio NUMERIC(10,2) NOT NULL,
	orderId INTEGER,
	valueSum NUMERIC(20,2) NOT NULL DEFAULT 0
);

CREATE TABLE measurements (
	id SERIAL PRIMARY KEY,
	measureid INTEGER NOT NULL,
	amount INTEGER,
	creationTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	FOREIGN KEY(measureid)
	REFERENCES measures(id)
);

INSERT INTO measures (name, exchangeRatio, orderId) 
VALUES ('Uinti', 1, 1), ('Kävely', 0.25, 2), ('Pyöräily', 0.1, 3), ('Herkut', -20, 4)