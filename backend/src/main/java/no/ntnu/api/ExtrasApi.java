package no.ntnu.api;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The ExtrasApi class works as a controller that receives requests related to the extras.
 */
@RestController
@RequestMapping("api")
public class ExtrasApi {

  /**
   * Returns all extra names.
   *
   * @return all extra names.
   */
  @GetMapping("get/extras")
  public ResponseEntity<List<String>> getExtras() {
    List<String> extras = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT Name FROM extras";

      ResultSet result = con.query(query);

      while (result.next()) {
        extras.add(result.getString("Name"));
      }

      result.close();
      con.close();

      return new ResponseEntity<>(extras, HttpStatus.OK);
    } catch (SQLException e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
