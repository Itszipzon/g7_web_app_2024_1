package no.ntnu;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The api class for the server.
 */
@RestController
@RequestMapping("api")
public class Api {

  /**
   * Returns image.
   *
   * @param imageName name of the image ending with file format. Example image.jpg
   * @return image
   */
  @GetMapping("image/{imageName}")
  public ResponseEntity<Resource> image(@PathVariable String imageName) {
    Resource r = new ClassPathResource("static/img/" + imageName);

    MediaType type;
    String fileType = imageName.substring(imageName.lastIndexOf("."));

    switch (fileType) {
      case ".png":
        type = MediaType.IMAGE_PNG;
        break;
      case ".jpg":
        type = MediaType.IMAGE_JPEG;
        break;
      case ".gif":
        type = MediaType.IMAGE_GIF;
        break;
      default:
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok().contentType(type).body(r);
  }

  /**
   * Returns all the locations containing certain car. Returns all locations if
   * car is not specified.
   *
   * @param car Car maker and car model.
   * @return all the locations containing certain car. Returns all locations if
   *         car is not specified.
   */
  @GetMapping(value = { "search/location/", "search/location/{car}" })
  public ResponseEntity<Set<String>> getLocation(@PathVariable(required = false) String car) {

    Set<String> jsonStringArray = new HashSet<>();

    try {

      String query = "SELECT L.name, L.Address, C.ID, S.Price, "
          + "CASE WHEN P.startdate IS NULL OR P.enddate IS NULL OR " + LocalDate.now().toString()
          + " NOT BETWEEN P.enddate AND P.startdate THEN TRUE ELSE FALSE END AS Is_Available "
          + "FROM Location L "
          + "JOIN Storage S ON L.ID = S.LID " + "JOIN Car C ON S.CID = C.ID "
          + "LEFT JOIN PurchaseHistory P ON S.ID = P.SID";

      if (car != null && !car.isBlank()) {
        String maker = car.split(" ")[0];
        String model = car.substring(car.indexOf(" ", 1) + 1);
        if (car.split(" ").length > 1) {
          query += " WHERE C.Maker LIKE '%" + maker + "%' AND C.Model LIKE '%" + model + "%';";
        } else {
          query += " WHERE C.Maker LIKE '%" + maker + "%';";
        }
      } else {
        query += ";";
      }

      DatabaseCon con = new DatabaseCon();

      ResultSet result = con.query(query);

      while (result.next()) {
        JSONObject json = new JSONObject();

        json.put("LocationName", result.getString("L.name"));
        json.put("LocationAddress", result.getString("L.Address"));
        json.put("IsAvailable", result.getBoolean("Is_Available"));
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
  public ResponseEntity<Set<String>> getCar(@PathVariable(required = false) String location) {

    Set<String> jsonStringArray = new HashSet<>();

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
          FROM Car C JOIN Storage S ON C.ID = S.CID
          JOIN Location L ON S.LID = L.ID LEFT JOIN PurchaseHistory P ON S.ID = P.SID""";

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
   * Returns images of a certain car.
   *
   * @param carId     Car ID.
   * @param imgNumber image number.
   *
   * @return image of a certain car.
   * @throws IOException IOException.
   */
  @GetMapping(value = { "car/img/{carId}", "car/img/{carId}/{imgNumber}" })
  public ResponseEntity<Resource> carImages(@PathVariable String carId,
      @PathVariable(required = false) String imgNumber) throws IOException {

    String carMaker = "";
    String carModel = "";
    String imageName = "";
    int imgNum;
    if (imgNumber == null) {
      imgNum = 0;
    } else {
      imgNum = Integer.parseInt(imgNumber);
    }

    try {
      DatabaseCon con = new DatabaseCon();
      String query = "SELECT C.Maker, C.Model, I.Name "
          + "FROM Car C "
          + "JOIN Images I "
          + "ON C.ID = I.CID "
          + "WHERE C.ID = '" + carId + "' " + "AND I.ImageNumber = " + imgNum + ";";

      ResultSet result = con.query(query);

      while (result.next()) {
        imageName = (result.getString("I.Name"));
        carMaker = result.getString("C.Maker");
        carModel = result.getString("C.Model");
      }

      result.close();
      con.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }

    MediaType type = null;
    String fileType = imageName.substring(imageName.lastIndexOf("."));
    String carImgFolder = "static/img/car/" + carMaker + "_" + carModel.replace(" ", "_") + "/";

    System.out.println("Querrying Car: " + carMaker + " " + carModel + "Image: " + imageName);
    Resource r = new ClassPathResource(carImgFolder + imageName);

    switch (fileType) {
      case ".png":
        type = MediaType.IMAGE_PNG;
        break;
      case ".jpg":
        type = MediaType.IMAGE_JPEG;
        break;
      case ".gif":
        type = MediaType.IMAGE_GIF;
        break;
      default:
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok().contentType(type).body(r);
  }

  /**
   * Returns all the users.
   *
   * @return all the users.
   */
  @GetMapping("get/users")
  public ResponseEntity<List<String>> getUsers() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT * FROM Users;");

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("ID"));
        json.put("Name", result.getString("Name"));
        json.put("Email", result.getString("Email"));
        json.put("Phone", result.getString("PhoneNumber"));
        json.put("Terms", result.getBoolean("Terms"));
        json.put("Guest", result.getBoolean("IsGuest"));
        json.put("Admin", result.getBoolean("IsAdmin"));
        json.put("DateJoined", result.getString("DateJoined"));
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
   * Returns all the locations.
   *
   * @return all the locations.
   */
  @GetMapping("get/locations")
  public ResponseEntity<List<String>> getLocations() {
    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT * FROM Location;");

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("ID"));
        json.put("Name", result.getString("Name"));
        json.put("Address", result.getString("Address"));
        json.put("Business", result.getBoolean("IsBusiness"));
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
        json.put("Extras", result.getString("Extra_Names"));
        jsonString = json.toString();
      }

      result.close();
      con.close();

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
   * @param orderdirection Direction of the order.
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
      @RequestParam(required = false) String orderdirection) {

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
        boolean isAnd = false;
        if (maker != null) {
          query += "C.Maker LIKE '%" + maker + "%' AND ";
          isAnd = true;
        }
        if (model != null) {
          query += "C.Model LIKE '%" + model + "%' AND ";
          isAnd = true;
        }
        if (year != null) {
          query += "C.Year = " + year + " AND ";
          isAnd = true;
        }
        if (fuel != null) {
          query += "C.Fuel LIKE '%" + fuel + "%' AND ";
          isAnd = true;
        }
        if (transmission != null) {
          query += "C.Transmission LIKE '%" + transmission + "%' AND ";
          isAnd = true;
        }
        if (seats != null) {
          query += "C.Seats IN (" + seats + ") AND ";
          isAnd = true;
        }
        if (location != null) {
          query += "L.Name LIKE '%" + location + "%' AND ";
          isAnd = true;
        }
        if (pricefrom != null) {
          query += "Lowest_Price >= " + pricefrom + " AND ";
          isAnd = true;
        }
        if (priceto != null) {
          query += "Lowest_Price <= " + priceto + " AND ";
          isAnd = true;
        }
        if (datefrom != null) {
          query += "'" + datefrom + "' IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
          isAnd = true;
        }
        if (dateto != null) {
          query += "'" + dateto + "' IS NOT BETWEEN P.StartDate AND P.EndDate AND ";
          isAnd = true;
        }
        if (body != null) {
          String[] bodyArray = body.split(",");
          String newBody = "";
          for (var i = 0; i < bodyArray.length; i++) {
            if (i == bodyArray.length - 1) {
              newBody += "'" + bodyArray[i] + "'";
            } else {
              newBody += "'" + bodyArray[i] + "',";
            }
          }
          query += "C.Body IN (" + newBody + ") AND ";
          isAnd = true;
        }
        if (isAnd) {
          query = query.substring(0, query.lastIndexOf("AND") - 1);
        }
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

      if (orderdirection != null) {
        if (orderdirection.equalsIgnoreCase("desc")) {
          query += "DESC";
        } else {
          query += "ASC";
        }
      } else {
        query += "ASC";
      }

      query += ";";
      DatabaseCon con = new DatabaseCon();
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

  @GetMapping("get/car/imagecount/{carId}")
  public ResponseEntity<Integer> getAmountOfImages(@PathVariable String carId) {
    int amount = 0;
    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT COUNT(*) FROM Images WHERE CID = " + carId + ";");

      while (result.next()) {
        amount = result.getInt(1);
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(amount, HttpStatus.OK);
  }
}
