package no.ntnu.post;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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
   * @throws SQLException sql exception.
   */
  @PostMapping("new/car")
  public void newCar(@RequestBody Car car) throws SQLException {

    DatabaseCon con = new DatabaseCon();
    String query = """
      INSERT INTO car
        (maker, model, year, fuel, transmission, seats, body) 
      VALUES
        (?, ?, ?, ?, ?, ?, ?);
        """;
    
    PreparedStatement st = con.prepareStatement(query);
    st.setString(1, car.getMaker());
    st.setString(2, car.getModel());
    st.setInt(3, car.getYear());
    st.setString(4, car.getFuelType());
    st.setString(5, car.getTransmission());
    st.setInt(6, car.getSeats());
    st.setString(7, car.getBody());

    st.executeUpdate();
  }

  /**
   * Adds car images to the backend.
   *
   * @param image The images to add
   * @throws SQLException sql exception.
   */
  @PostMapping("new/car/image")
  public void newCarImage(
      @RequestParam("imageFile") MultipartFile image,
      @RequestParam("cid") int cid,
      @RequestParam("imageNumber") int imageNumber,
      @RequestParam("imageFrom") String imageFrom) throws SQLException {

    DatabaseCon con = new DatabaseCon();
    System.out
        .println("Image added to car with ID: "
        + cid + " and image number: "
        + imageNumber + " from: "
        + imageFrom);

    String query = """
      INSERT INTO images (cid, name, ImageNumber, ImageFromLink) VALUES 
        (?, ?, ?, ?);
        """;

    PreparedStatement st = con.prepareStatement(query);
    st.setInt(1, cid);
    st.setString(2, image.getOriginalFilename());
    st.setInt(3, imageNumber);
    st.setString(4, imageFrom);
    

    String maker = "";
    String model = "";
    try {
      DatabaseCon con2 = new DatabaseCon();
      String query2 = "SELECT maker, model FROM car WHERE ID = ?;";
      PreparedStatement st2 = con2.prepareStatement(query2);
      st2.setInt(1, cid);
      ResultSet result = st2.executeQuery();

      if (result.next()) {
        maker = result.getString("maker");
        model = result.getString("model");
      }

      result.close();
      st2.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    String newCarName = maker + "_" + model.replace(" ", "_");
    if (Tools.addImage(newCarName, image)) {
      con.update(query);
    } else {
      System.out.println("Could not add image");
    }

  }

  /**
   * Adds extras to a car.
   *
   * @param cid The car id
   * @param extras The extras to add
   * @throws SQLException sql exception.
   */
  @PostMapping("new/car/extra")
  public void newCarExtra(
      @RequestParam("cid") int cid,
      @RequestParam("extras") List<String> extras) throws SQLException {

    List<Integer> eids = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      for (String e : extras) {

        String query = "SELECT ID FROM extras WHERE Name = ?;";
        PreparedStatement st = con.prepareStatement(query);
        st.setString(1, e);
        ResultSet result = st.executeQuery();
        if (result.next()) {
          eids.add(result.getInt("ID"));
        }

        result.close();
        st.close();
      }
    } catch (SQLException e) {
      e.printStackTrace();
      return;
    }

    DatabaseCon con = new DatabaseCon();
    for (int eid : eids) {
      String query = "INSERT INTO car_extra (cid, eid) VALUES (?, ?);";
      PreparedStatement st = con.prepareStatement(query);
      st.setInt(1, cid);
      st.setInt(2, eid);
      st.executeUpdate();
    }
  }

}
