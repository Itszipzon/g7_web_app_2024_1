package no.ntnu;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to represent different statuses from the server.
 */
@RestController
@RequestMapping("status")
public class ServerStatus {

  /**
   * Returns true if there is a connection made with the database.
   *
   * @return true if there is a connection made with the database.
   */
  @GetMapping("database")
  public ResponseEntity<Boolean> getStatus() {
    Connection con = null;
    try {
      con = DriverManager.getConnection("jdbc:mysql://localhost:3306/testcarrental");
      Statement s = con.createStatement();

      String query = "SELECT * FROM users";
      ResultSet r = s.executeQuery(query);

      r.close();
      s.close();
      con.close();
      return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    } catch (SQLException e) {
      e.printStackTrace();
      return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
    }
  }

}
