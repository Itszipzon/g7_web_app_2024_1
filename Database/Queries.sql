-- Gets location name, location address, car maker, model and price.
SELECT
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM
    Location L
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID;

-- Gets All the cars from Tesla Tom.
SELECT
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM
    Location L
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
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
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
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
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
WHERE
    S.Price < 600
ORDER BY
    S.Price ASC;

-- Gets All cars with price over or equal to 600, made by Tesla and is Model 3
SELECT
    L.Name AS Location_Name,
    L.Address AS Location_Address,
    C.Maker AS Car_Maker,
    C.Model AS Car_Model,
    S.Price AS Price
FROM
    Location L
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
WHERE
    S.Price >= 600
    AND C.Maker = "Tesla"
    AND C.Model = "Model 3"
ORDER BY
    S.Price ASC;

-- Selects all available cars of certain type.
SELECT
    L.name AS Location_Name,
    L.address AS Location_Address,
    C.maker AS Car_Maker,
    C.model AS Car_Model,
    C.Year AS,
    C.Fuel AS fuel,
    C.Transmission AS transmission C.Seats AS seats,
    C.Extras AS extras,
    S.price AS Price,
    P.startdate AS Start_Date,
    P.enddate AS End_Date
FROM
    Location L
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
    LEFT JOIN PurchaseHistory P ON S.ID = P.SID
WHERE
    C.maker = 'VolksVagen'
    AND C.model = 'Golf'
    AND (
        P.startdate IS NULL
        OR P.enddate IS NULL
        OR DATE('now') > P.enddate
        OR DATE('now') < P.startdate
        OR P.ID IS NULL
    );

-- Selects all the location with certain cars
SELECT
    L.name,
    L.Address,
    C.ID,
    S.Price,
    Case
        WHEN P.startdate IS NULL
        OR P.enddate IS NULL
        OR DATE('now') IS NOT BETWEEN P.startdate AND P.enddate
        THEN TRUE
        ELSE FALSE
    END AS Is_Available
FROM
    Location L
    JOIN Storage S ON L.ID = S.LID
    JOIN Car C ON S.CID = C.ID
    LEFT JOIN PurchaseHistory P ON S.ID = P.SID
    WHERE C.Maker = 'maker' AND C.Model = 'model';