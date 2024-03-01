package no.ntnu.api;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Location api.
 */
@RestController
@RequestMapping("api")
public class LocationApi {

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
   * Returns all the locations containing certain car. Returns all locations if
   * car is not specified.
   *
   * @param car Car maker and car model.
   * @return all the locations containing certain car. Returns all locations if
   *         car is not specified.
   */
  @GetMapping(value = { "search/location/", "search/location/{car}" })
  public ResponseEntity<List<String>> getLocation(@PathVariable(required = false) String car) {

    List<String> jsonStringArray = new ArrayList<>();

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

}
