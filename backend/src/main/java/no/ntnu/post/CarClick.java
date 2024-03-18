package no.ntnu.post;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import no.ntnu.DatabaseCon;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class for adding a click to a car.
 */
@RestController
@RequestMapping("post/carclick")
public class CarClick {

  /**
   * Adds a click to a car.
   *
   * @param carId the car id.
   * @return a response entity.
   * @throws SQLException Sql Exception.
   */
  @PostMapping("click")
  public ResponseEntity<String> clickCar(@RequestBody int carId) throws SQLException {
    DatabaseCon con = new DatabaseCon();
    String query = "INSERT INTO CarClicks(CID, TimeStamp) VALUES(?, NOW());";
    PreparedStatement statement = con.prepareStatement(query);
    statement.setInt(1, carId);
    statement.executeUpdate();

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
