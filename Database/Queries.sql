
-- Gets location name, location address, car maker, model and price.
SELECT 
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM 
    Location L
JOIN 
    Storage S ON L.ID = S.LID
JOIN 
    Car C ON S.CID = C.ID;

-- Gets All the cars from Tesla Tom.
SELECT 
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM 
    Location L
JOIN 
    Storage S ON L.ID = S.LID
JOIN 
    Car C ON S.CID = C.ID
WHERE 
    L.Name = 'Tesla Tom';

-- Gets every car with a price below 600NOK.
SELECT 
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM 
    Location L
JOIN 
    Storage S ON L.ID = S.LID
JOIN 
    Car C ON S.CID = C.ID
WHERE 
    S.Price < 600;

--Gets every car below 600 in ascending order.
SELECT 
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM 
    Location L
JOIN 
    Storage S ON L.ID = S.LID
JOIN 
    Car C ON S.CID = C.ID
WHERE 
    S.Price < 600
ORDER BY 
    S.Price ASC;
