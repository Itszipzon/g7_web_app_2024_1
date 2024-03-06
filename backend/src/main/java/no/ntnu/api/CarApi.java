package no.ntnu.api;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import no.ntnu.Tools;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * Car api.
 */
@RestController
@RequestMapping("/api")
public class CarApi {

  /**
   * Returns all the cars.
   *
   * @return all the cars.
   */
  @GetMapping("get/cars")
  public ResponseEntity<List<String>> getCars() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = """
          SELECT C.ID,
            C.Maker,
            C.Model,
            C.Year,
            C.Fuel,
            C.Transmission,
            C.Seats,
            GROUP_CONCAT(E.Name) AS Extra_Names
          FROM Car C
          LEFT JOIN carExtras V ON C.ID = V.CID
          LEFT JOIN Extras E ON V.EID = E.ID
          GROUP BY C.ID, C.Maker, C.Model, C.Year, C.Fuel, C.Transmission, C.Seats;
          """;

      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("ID"));
        json.put("Maker", result.getString("Maker"));
        json.put("Model", result.getString("Model"));
        json.put("Year", result.getInt("Year"));
        json.put("Fuel", result.getString("Fuel"));
        json.put("Transmission", result.getString("Transmission"));
        json.put("Seats", result.getInt("Seats"));
        json.put("Extras", result.getString("Extra_Names"));

        jsonStringArray.add(json.toString());
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }
  
  /**
   * Returns all the cars in a certain location. Returns all cars if location is
   * not specified.
   *
   * @param location location.
   * @return all the cars in a certain location. Returns all cars if location is
   *         not specified.
   */
  @GetMapping(value = { "search/car/", "search/car/{location}" })
  public ResponseEntity<List<String>> getCar(@PathVariable(required = false) String location) {

    List<String> jsonStringArray = new ArrayList<>();

    try {
      String query = """
          SELECT
            C.Maker,
            C.Model,
            L.name,
            S.Price,
          Case
          WHEN P.startdate IS NULL OR P.enddate IS NULL
            OR DATE('now') > P.enddate OR DATE('now') < P.startdate
            OR P.ID IS NULL THEN TRUE ELSE FALSE
              END AS Is_Available
          FROM Car C 
          JOIN Storage S ON C.ID = S.CID
          JOIN Location L ON S.LID = L.ID 
          LEFT JOIN PurchaseHistory P ON S.ID = P.SID
          """;

      if (location != null && !location.isBlank()) {
        query += " WHERE L.name LIKE '%" + location + "%';";
      } else {
        query += ";";
      }

      DatabaseCon con = new DatabaseCon();

      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("Maker", result.getString("C.Maker"));
        json.put("Model", result.getString("C.Model"));
        jsonStringArray.add(json.toString());
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns all the different makers of cars.
   *
   * @return all the different makers of cars.
   */
  @GetMapping("get/cars/maker")
  public ResponseEntity<List<String>> getMakers() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT DISTINCT Maker FROM Car;");

      while (result.next()) {
        jsonStringArray.add(result.getString("Maker"));
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns all the different models of cars.
   *
   * @return all the different models of cars.
   */
  @GetMapping("get/cars/model")
  public ResponseEntity<List<String>> getModels() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT DISTINCT Model FROM Car;");

      while (result.next()) {
        jsonStringArray.add(result.getString("Model"));
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns all the different years of cars.
   *
   * @return all the different years of cars.
   */
  @GetMapping("get/cars/year")
  public ResponseEntity<List<Integer>> getYears() {
    List<Integer> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT DISTINCT Year FROM Car;");

      while (result.next()) {
        jsonStringArray.add(result.getInt("Year"));
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns all the different fuels of cars.
   *
   * @return all the different fuels of cars.
   */
  @GetMapping("get/cars/fuel")
  public ResponseEntity<List<String>> getFuels() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT DISTINCT Fuel FROM Car;");

      while (result.next()) {
        jsonStringArray.add(result.getString("Fuel"));
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns all the different transmissions of cars.
   *
   * @return all the different transmissions of cars.
   */
  @GetMapping("get/cars/transmission")
  public ResponseEntity<List<String>> getTransmissions() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT DISTINCT Transmission FROM Car;");

      while (result.next()) {
        jsonStringArray.add(result.getString("Transmission"));
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns a car with given id.
   *
   * @param carId car id.
   * @return a car with given id.
   */
  @GetMapping("get/car/{carId}")
  public ResponseEntity<String> getCarById(@PathVariable String carId) {
    String jsonString = "";

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT "
          + "C.ID, C.Maker, C.Model, C.Year, C.Fuel, C.Transmission, C.Seats, "
          + "CASE WHEN COUNT(E.ID) > 0 THEN GROUP_CONCAT(E.Name) ELSE '' END AS Extra_Names "
          + "FROM Car C "
          + "LEFT JOIN carExtras V ON C.ID = V.CID "
          + "LEFT JOIN Extras E ON V.EID = E.ID "
          + "WHERE C.ID = " + carId + " "
          + "GROUP BY C.ID, C.Maker, C.Model, C.Year, C.Fuel, C.Transmission, C.Seats;";

      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("ID"));
        json.put("Maker", result.getString("Maker"));
        json.put("Model", result.getString("Model"));
        json.put("Year", result.getInt("Year"));
        json.put("Fuel", result.getString("Fuel"));
        json.put("Transmission", result.getString("Transmission"));
        json.put("Seats", result.getInt("Seats"));
        String[] extras = result.getString("Extra_Names").split(",");
        JSONArray extrasArray = new JSONArray();
        for (String e : extras) {
          extrasArray.put(e);
        }
        json.put("Extras", extrasArray);
        jsonString = json.toString();
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    System.out.println("Sending car: " + carId);
    return new ResponseEntity<>(jsonString, HttpStatus.OK);
  }

  /**
   * Returns all the cars with certain filters.
   *
   * @param maker        car maker.
   * @param model        car model.
   * @param year         car year.
   * @param fuel         car fuel.
   * @param transmission car transmission.
   * @param seats        car seats.
   * @param location     car location.
   * @param pricefrom    car price from.
   * @param priceto      car price to.
   * @param datefrom     car date from.
   * @param dateto       car date to.
   * @param orderby      What you wanna order the list after.
   * @param order Direction of the order.
   * @return all the cars with certain filters.
   */
  @GetMapping("car/filters")
  public ResponseEntity<List<String>> getCarFilters(@RequestParam(required = false) String maker,
      @RequestParam(required = false) String model,
      @RequestParam(required = false) String year,
      @RequestParam(required = false) String fuel,
      @RequestParam(required = false) String body,
      @RequestParam(required = false) String transmission,
      @RequestParam(required = false) String seats,
      @RequestParam(required = false) String location,
      @RequestParam(required = false) String pricefrom,
      @RequestParam(required = false) String priceto,
      @RequestParam(required = false) String datefrom,
      @RequestParam(required = false) String dateto,
      @RequestParam(required = false) String orderby,
      @RequestParam(required = false) String order) {

    List<String> jsonStringArray = new ArrayList<>();

    try {

      String query = """
        SELECT
        c.ID,
        c.Maker,
        c.Model,
        c.Year,
        c.Fuel,
        c.Transmission,
        c.Seats,
        c.Body,
        GROUP_CONCAT(e.Name) AS Extras,
        MIN(s.Price) AS Lowest_Price,
        l.Name
    FROM
        Car c
    JOIN
        Storage s ON c.ID = s.CID
    LEFT JOIN
        CarExtras ce ON c.ID = ce.CID
    LEFT JOIN
        Extras e ON ce.EID = e.ID
    JOIN
        Location l ON s.LID = l.ID
          """;
      if (maker != null
          || model != null
          || year != null
          || fuel != null
          || transmission != null
          || seats != null
          || location != null
          || pricefrom != null
          || priceto != null
          || datefrom != null
          || dateto != null
          || body != null) {
            
        query += " WHERE ";
        if (maker != null) {
          query += "C.Maker LIKE '%" + maker + "%' AND ";
        }
        if (model != null) {
          query += "C.Model LIKE '%" + model + "%' AND ";
        }
        if (year != null) {
          query += "C.Year = " + year + " AND ";
        }
        if (fuel != null) {
          query += "C.Fuel IN (" + Tools.convertStringListSql(fuel, ",") + ") AND ";
        }
        if (transmission != null) {
          query += "C.Transmission LIKE '%" + transmission + "%' AND ";
        }
        if (seats != null) {
          query += "C.Seats IN (" + seats + ")";
      
          if (seats.contains("6")) {
            query += " OR C.Seats > 6";
          }
          query += " AND ";
        }
        if (location != null) {
          query += "L.Name LIKE '%" + location + "%' AND ";
        }
        if (pricefrom != null) {
          query += "s.Price >= " + pricefrom + " AND ";
        }
        if (priceto != null) {
          query += "s.Price <= " + priceto + " AND ";
        }
        if (datefrom != null) {
          query += "'" + datefrom + "' IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
        }
        if (dateto != null) {
          query += "'" + dateto + "' IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
        }
        if (body != null) {
          query += "C.Body IN (" + Tools.convertStringListSql(body, ",") + ") AND ";
        }
        
        query = query.substring(0, query.lastIndexOf("AND"));
      }

      query += "GROUP BY c.ID, c.Maker, c.Model, c.Year, c.Fuel, c.Transmission, c.Seats ";

      if (orderby != null) {

        String orderValue = "";

        switch (orderby) {
          case "maker":
            orderValue = "C.Maker";
            break;
          case "model":
            orderValue = "C.Model";
            break;
          case "year":
            orderValue = "C.Year";
            break;
          case "seats":
            orderValue = "C.Seats";
            break;
          case "price":
            orderValue = "Lowest_Price";
            break;
          case "body":
            orderValue = "C.Body";
            break;
          default:
            orderValue = "C.Maker";
            break;
        }

        query += " ORDER BY " + orderValue + " ";
        
      } else {
        query += "ORDER BY C.Maker ";
      }

      if (order != null) {
        if (order.equalsIgnoreCase("desc")) {
          query += "DESC";
        } else {
          query += "ASC";
        }
      } else {
        query += "ASC";
      }

      query += ";";
      DatabaseCon con = new DatabaseCon();
      System.out.println("\n" + query + "\n");
      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getString("C.ID"));
        json.put("Maker", result.getString("C.Maker"));
        json.put("Model", result.getString("C.Model"));
        json.put("Year", result.getInt("C.Year"));
        json.put("Fuel", result.getString("C.Fuel"));
        json.put("Transmission", result.getString("C.Transmission"));
        json.put("Seats", result.getInt("C.Seats"));
        json.put("Body", result.getString("C.Body"));
        json.put("Price", result.getInt("Lowest_Price"));
        json.put("Location", result.getString("L.Name"));
        jsonStringArray.add(json.toString());
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns the most popular cars.
   *
   * @param amount amount of cars.
   * @return the most popular cars.
   */
  @GetMapping("car/get/mostpopular/{amount}")
  public ResponseEntity<List<String>> getMostPopular(@PathVariable String amount) {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      String query = """
          SELECT
            C.Maker,
            C.Model,
            COUNT(CC.ID) AS Amount
          FROM
            Car C
          JOIN
            CarClicks CC ON C.ID = CC.CID
          WHERE CC.TimeStamp >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
          GROUP BY C.Maker, C.Model
          ORDER BY Amount DESC
          LIMIT
            """ + amount + ";";

      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("Maker", result.getString("C.Maker"));
        json.put("Model", result.getString("C.Model"));
        json.put("Amount", result.getInt("Amount"));
        jsonStringArray.add(json.toString());
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

}
