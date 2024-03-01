package no.ntnu.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import no.ntnu.DatabaseCon;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Image api.
 */
@RestController
@RequestMapping("/api")
public class ImageApi {

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
   * Amount of images a car has.
   *
   * @param carId car ID.
   * @return amount of images a car has.
   */
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
