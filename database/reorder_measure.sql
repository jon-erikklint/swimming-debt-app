CREATE OR REPLACE PROCEDURE reorder_measure(measureid int, up boolean)
LANGUAGE PLPGSQL
AS $$
DECLARE
	currentorderid measures.orderid%type;
	neworderid measures.orderid%type;
BEGIN
	SELECT orderid FROM measures INTO currentorderid WHERE id = measureid;
	
	-- Find the closest orderid into the desired move direction
	IF up THEN
		SELECT MAX(orderid)
		FROM measures
		INTO neworderid
		WHERE orderid < currentorderid;
	ELSE
		SELECT MIN(orderid)
		FROM measures
		INTO neworderid
		WHERE orderid > currentorderid;
	END IF;
	
	-- If there is an orderid into the desired direction, do the swap
	IF currentorderid != neworderid THEN
		UPDATE measures SET orderid = CASE WHEN orderid=currentorderid THEN neworderid ELSE currentorderid END -- swap
		WHERE orderid IN (currentorderid, neworderid); -- update only the ones to be swapped
	END IF;
END;
$$