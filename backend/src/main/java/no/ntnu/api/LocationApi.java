package no.ntnu.api;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import no.ntnu.user.SessionManager;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired
  private SessionManager sessionManager;

  /**
   * Returns all the locations.
   *
   * @return all the locations.
   */
  @GetMapping("get/locations/{token}")
  public ResponseEntity<List<String>> getLocations(@PathVariable String token) {

    if (!sessionManager.getSessions().containsKey(token)
        || !sessionManager.getSessions().get(token).isAdmin()) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

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
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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
        if (car.split(" ").length > 1) {
          query += " WHERE C.Maker LIKE '%?%' AND C.Model LIKE '%?%';";
        } else {
          query += " WHERE C.Maker LIKE '%?%';";
        }
      } else {
        query += ";";
      }


      DatabaseCon con = new DatabaseCon();
      PreparedStatement st = con.prepareStatement(query);
      if (car != null && !car.isBlank()) {
        String maker = car.split(" ")[0];
        String model = car.substring(car.indexOf(" ", 1) + 1);
        if (car.split(" ").length > 1) {
          st.setString(1, maker);
          st.setString(2, model);
        } else {
          st.setString(1, maker);
        }
      }
      ResultSet result = st.executeQuery();

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
