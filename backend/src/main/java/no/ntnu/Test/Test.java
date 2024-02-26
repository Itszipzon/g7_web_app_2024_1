package no.ntnu.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import no.ntnu.DatabaseCon;
import no.ntnu.Main;
import no.ntnu.dbtables.Car;
import no.ntnu.dbtables.FullInformation;
import no.ntnu.dbtables.Location;
import no.ntnu.dbtables.Storage;

@RestController
@RequestMapping("test")
public class Test {

  /**
   * Sends text over http.
   *
   * @return the text.
   */
  @GetMapping("first/message/hello")
  public ResponseEntity<String> greet() {
    return new ResponseEntity<>("Hello From Spring Boot!<br/>The first get request on this app!",
        HttpStatus.OK);
  }

  /**
   * Sends a image to the frontend.
   *
   * @param imageName image to be sent.
   * @return the image.
   */
  @GetMapping("image/{imageName}")
  public ResponseEntity<Resource> image(@PathVariable String imageName) {
    Resource r = new ClassPathResource("static/img/" + imageName);

    MediaType type = null;
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
   * Upload files to the backend.
   * 
   * @param file the file to upload.
   * @return the upload status.
   */
  @PostMapping("upload")
  public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
    String uploadDir = new Main().getResource("/static").getPath();
    if (file.isEmpty()) {
      return new ResponseEntity<>("No file selected", HttpStatus.BAD_REQUEST);
    }
    uploadDir = Main.getCorrectUrl(uploadDir);
    try {
      byte[] bytes = file.getBytes();
      fileExist(uploadDir + "/upload");
      uploadDir = new Main().getResource("/static/upload/").getPath();
      uploadDir = Main.getCorrectUrl(uploadDir);

      String fileName = randomizeFileName(file.getOriginalFilename().replace(" ", "-"));
      Path filePath = Paths.get(uploadDir + fileName);
      System.out
          .println("Uploading " + fileName + " to server\nFile location: " + filePath.toString());
      Files.write(filePath, bytes);

      return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
    } catch (IOException e) {
      e.printStackTrace();
      return new ResponseEntity<>("Error uploading file", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private String randomizeFileName(String s) {
    String name = "";
    boolean duplicate = false;

    File folder = new File(Main.getCorrectUrl(new Main().getResource("/static/upload/").getPath()));

    for (File f : folder.listFiles()) {
      if (f.getName().equals(s)) {
        duplicate = true;
      }
    }

    if (duplicate) {
      int format = s.lastIndexOf(".");
      String stringFormat = s.substring(format, s.length());
      name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(12), stringFormat);
      System.out.println(name + stringFormat);
    } else {
      name = s;
    }

    return name;
  }

  private void fileExist(String file) throws IOException {
    if (!Files.exists(Path.of(file))) {
      Files.createDirectories(Path.of(file));
    }
  }

  @GetMapping("cars")
  public ResponseEntity<ArrayList<Car>> getCars() {

    ArrayList<Car> cars = new ArrayList<>();

    try {
      
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT * FROM Car";
      ResultSet result = con.query(query);

      while (result.next()) {
        Car car = new Car();
        car.setId(result.getInt("ID"));
        car.setMaker(result.getString("Maker"));
        car.setModel(result.getString("Model"));
        car.setYear(result.getInt("Year"));
        car.setFuelType(result.getString("Fuel"));
        car.setTransmission(result.getString("Transmission"));
        car.setSeats(result.getInt("Seats"));
        String extras = result.getString("Extras");

        String[] e = extras.split(", ");
        for (String s : e) {
          car.addExtras(s);
        }

        cars.add(car);
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(cars, HttpStatus.OK);
  }

  @GetMapping("cars/get/{name}")
  public ResponseEntity<ArrayList<FullInformation>> getCarsByName(@PathVariable String name) {

    String makerSelected = name.split(" ")[0];
    String modelSelected = name.substring(name.indexOf(" ", 1) + 1);

    ArrayList<FullInformation> values = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT" + " L.name AS Location_Name," + " L.address AS Location_Address,"
          + " C.*," + " S.price AS Price," + " P.startdate," + " P.enddate" + " FROM "
          + " Location L" + " JOIN" + " Storage S ON L.ID = S.LID" + " JOIN"
          + " Car C ON S.CID = C.ID" + " LEFT JOIN" + " PurchaseHistory P ON S.ID = P.SID"
          + " WHERE" + " C.maker = '" + makerSelected + "' AND C.model = '" + modelSelected
          + "' AND (P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > "
          + "P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL);";

      ResultSet result = con.query(query);

      while (result.next()) {

        Location location = new Location();
        location.setName(result.getString("Location_Name"));
        location.setAddress(result.getString("Location_Address"));

        Car car = new Car();
        car.setId(result.getInt("ID"));
        car.setMaker(result.getString("C.maker"));
        car.setModel(result.getString("C.model"));
        car.setYear(result.getInt("C.year"));
        car.setFuelType(result.getString("C.fuel"));
        car.setTransmission(result.getString("C.transmission"));
        car.setSeats(result.getInt("C.seats"));

        String[] e = result.getString("C.extras").split(", ");
        for (String s : e) {
          car.addExtras(s);
        }

        Storage storage = new Storage();
        storage.setPrice(result.getInt("Price"));
        
        FullInformation value = new FullInformation();
        value.setCar(car);
        value.setLocation(location);
        value.setStorage(storage);

        values.add(value);
      }


      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(values, HttpStatus.OK);
  }

  @GetMapping("search/location")
  public ResponseEntity<List<String>> getLocation() {

    List<String> jsonStringArray = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = "SELECT " + "L.name, " + "L.Address, " + "C.ID, " + "S.Price, " + "Case "
          + "WHEN " + "P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > "
          + "P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL THEN TRUE " + "ELSE FALSE "
          + "END AS Is_Available " + "FROM Location L " + "JOIN Storage S ON L.ID = S.LID "
          + "JOIN Car C ON S.CID = C.ID " + "LEFT JOIN PurchaseHistory P ON S.ID = P.SID;";

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

  @GetMapping("/search")
  public ResponseEntity<String> testSearch(@RequestParam String first,
      @RequestParam String second) {
    return new ResponseEntity<>("First: " + first + " Second: " + second, HttpStatus.OK);
  }

}
