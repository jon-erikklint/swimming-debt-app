CREATE OR REPLACE PROCEDURE add_measure(name varchar(50), exchangeRatio numeric(10,2), inout newId integer)
LANGUAGE PLPGSQL
AS $$
DECLARE
	orderid integer;
BEGIN
	SELECT MAX(measures.orderid) + 1 FROM measures INTO orderid;
	
	INSERT INTO measures (name, exchangeRatio, orderId) VALUES(name, exchangeRatio, orderid) RETURNING id INTO newId;
END;
$$