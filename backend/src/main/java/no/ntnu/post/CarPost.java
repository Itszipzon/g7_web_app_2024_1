package no.ntnu.post;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.ntnu.DatabaseCon;
import no.ntnu.Tools;
import no.ntnu.dbtables.Car;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Post car.
 */
@RestController
@RequestMapping("post")
public class CarPost {

  /**
   * Adds new car to database.
   *
   * @param car The car to add
   */
  @PostMapping("new/car")
  public void newCar(@RequestBody Car car) {

    DatabaseCon con = new DatabaseCon();
    String query = "INSERT INTO car (maker, model, year, fuel, transmission, seats, body) VALUES ('" + car.getMaker()
        + "', '" + car.getModel() + "', " + car.getYear() + ", '" + car.getFuelType() + "', '" + car.getTransmission()
        + "', " + car.getSeats() + ", '" + car.getBody() + "');";

    con.update(query);
  }

  /**
   * Adds car images to the backend.
   *
   * @param image The images to add
   */
  @PostMapping("new/car/image")
  public void newCarImage(
      @RequestParam("imageFile") MultipartFile image,
      @RequestParam("cid") int cid,
      @RequestParam("imageNumber") int imageNumber,
      @RequestParam("imageFrom") String imageFrom) {

    DatabaseCon con = new DatabaseCon();
    System.out.println("Image added to car with ID: "
        + cid + " and image number: "
        + imageNumber + " from: "
        + imageFrom);

    String query = "INSERT INTO images (cid, name, ImageNumber, ImageFromLink) VALUES ("
        + cid + ", '"
        + image.getOriginalFilename() + "', " + imageNumber + ", '" + imageFrom + "');";

    String maker = "";
    String model = "";
    try {
      System.out.println("Getting car info");
      DatabaseCon con2 = new DatabaseCon();
      String query2 = "SELECT maker, model FROM car WHERE ID = " + cid + ";";
      ResultSet result = con2.query(query2);

      if (result.next()) {
        maker = result.getString("maker");
        model = result.getString("model");
      }

      result.close();
      con2.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    String newCarName = maker + "_" + model.replace(" ", "_");
    System.out.println("New car name: " + newCarName);
    if (Tools.addImage(newCarName, image)) {
      System.out.println("Image added");
      con.update(query);
    } else {
      System.out.println("Could not add image");
    }

  }

}
