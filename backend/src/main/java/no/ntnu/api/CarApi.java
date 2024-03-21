package no.ntnu.api;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import no.ntnu.Tools;
import no.ntnu.user.SessionManager;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired
  private SessionManager manager;

  /**
   * Returns all the cars.
   *
   * @param token token.
   * @return all the cars.
   */
  @GetMapping("car/get/all/{token}")
  public ResponseEntity<List<String>> getOnlyCars(
        @PathVariable String token) {

    if (!manager.getSessions().containsKey(token) || !manager.getSessions().get(token).isAdmin()) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    List<String> array = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT * FROM Car;";

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
        json.put("Body", result.getString("Body"));
        array.add(json.toString());
      }

      result.close();
      con.close();
      return new ResponseEntity<>(array, HttpStatus.OK);
    } catch (SQLException e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
      ResultSet result = null;

      if (location != null && !location.isBlank()) {
        PreparedStatement statement = con.prepareStatement(query);
        statement.setString(1, location);
        result = statement.executeQuery();
      } else {
        result = con.query(query);
      }


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
  public ResponseEntity<String> getCarById(@PathVariable int carId) {
    String jsonString = "";

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT "
          + "C.ID, C.Maker, C.Model, C.Year, C.Fuel, C.Transmission, C.Seats, "
          + "CASE WHEN COUNT(E.ID) > 0 THEN GROUP_CONCAT(E.Name) ELSE '' END AS Extra_Names "
          + "FROM Car C "
          + "LEFT JOIN carExtras V ON C.ID = V.CID "
          + "LEFT JOIN Extras E ON V.EID = E.ID "
          + "WHERE C.ID = ? "
          + "GROUP BY C.ID, C.Maker, C.Model, C.Year, C.Fuel, C.Transmission, C.Seats;";

      PreparedStatement statement = con.prepareStatement(query);
      statement.setInt(1, carId);
      ResultSet result = statement.executeQuery();

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
      statement.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }
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
  public ResponseEntity<List<String>> getCarFilters(
      @RequestParam(required = false) String maker,
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

    
    /* TODO: Implement prepared statement for lists like body and seats. */
    List<String> jsonStringArray = new ArrayList<>();

    try {

      List<Object> params = new ArrayList<>();

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
          query += "C.Maker LIKE '%?%' AND ";
          params.add(maker);
        }
        if (model != null) {
          query += "C.Model LIKE '%?%' AND ";
          params.add(model);
        }
        if (year != null) {
          query += "C.Year = ? AND ";
          params.add(year);
        }
        if (fuel != null) {
          query += "C.Fuel IN (" + Tools.getSqlListAmount(fuel, ",") + ") AND ";
          Tools.convertStringListSql(fuel, ",").forEach(s -> params.add(s));
        }
        if (transmission != null) {
          query += "C.Transmission LIKE '%?%' AND ";
          params.add(transmission);
        }
        if (seats != null) {
          query += "C.Seats IN (" + Tools.getSqlListAmount(seats, ",") + ")";
          Tools.convertStringListSql(seats, ",").forEach(s -> params.add(s));
          if (seats.contains("6")) {
            query += " OR C.Seats > 6";
          }
          query += " AND ";
        }
        if (location != null) {
          query += "L.Name LIKE '%?%' AND ";
          params.add(location);
        }
        if (pricefrom != null) {
          query += "s.Price >= ? AND ";
          params.add(pricefrom);
        }
        if (priceto != null) {
          query += "s.Price <= ? AND ";
          params.add(priceto);
        }
        if (datefrom != null) {
          query += "? IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
          params.add(datefrom);
        }
        if (dateto != null) {
          query += "? IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
          params.add(dateto);
        }
        if (body != null) {
          query += "C.Body IN (" + Tools.getSqlListAmount(body, ",") + ") AND ";
          Tools.convertStringListSql(body, ",").forEach(s -> params.add(s));
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

        query += " ORDER BY ? ";

        params.add(orderValue);
        
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

      PreparedStatement st = con.prepareStatement(query);

      for (int i = 0; i < params.size(); i++) {
        if (params.get(i) instanceof String) {
          st.setString(i + 1, (String) params.get(i));
        } else if (params.get(i) instanceof Integer) {
          st.setInt(i + 1, (int) params.get(i));
        }
      }
      ResultSet result = st.executeQuery();

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
  public ResponseEntity<List<String>> getMostPopular(@PathVariable int amount) {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      String query = """
          SELECT
            C.ID,
            C.Maker,
            C.Model,
            C.Body,
            C.Fuel,
            C.Transmission,
            C.Seats,
            COUNT(CC.ID) AS Amount,
            MIN(S.Price) AS Lowest_Price
          FROM Car C
          JOIN CarClicks CC ON C.ID = CC.CID
          JOIN Storage S on C.ID = S.CID
          JOIN Location L ON S.LID = L.ID
          WHERE CC.TimeStamp >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
          GROUP BY C.Maker, C.Model
          ORDER BY Amount DESC
          LIMIT ?;""";

      PreparedStatement statement = con.prepareStatement(query);
      statement.setInt(1, amount);

      ResultSet result = statement.executeQuery();

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("C.ID"));
        json.put("Maker", result.getString("C.Maker"));
        json.put("Model", result.getString("C.Model"));
        json.put("Body", result.getString("C.Body"));
        json.put("Fuel", result.getString("C.Fuel"));
        json.put("Transmission", result.getString("C.Transmission"));
        json.put("Seats", result.getString("C.Seats"));
        json.put("Price", result.getString("Lowest_Price"));
        json.put("Amount", result.getInt("Amount"));
        jsonStringArray.add(json.toString());
      }

      result.close();
      statement.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }

  /**
   * Returns the id of the car.
   *
   * @param maker car maker.
   * @param model car model.
   * @param year car year.
   * @return the id of the car.
   */
  @GetMapping("car/get/{maker}/{model}/{year}")
  public ResponseEntity<Integer> getCarId(
      @PathVariable String maker,
      @PathVariable String model,
      @PathVariable int year) {

    int id = 0;
    
    try {
      DatabaseCon con = new DatabaseCon();
      String query = """
          SELECT C.ID FROM Car C WHERE 
          C.Maker = ? 
          AND C.Model = ?
          AND C.Year = ?;
          """;
      PreparedStatement st = con.prepareStatement(query);
      st.setString(1, maker);
      st.setString(2, model);
      st.setInt(3, year);
      ResultSet result = st.executeQuery();

      while (result.next()) {
        id = result.getInt("ID");
      }

      result.close();
      st.close();
      
      if (id < 1) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }

      
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(id, HttpStatus.OK);

  }

}
