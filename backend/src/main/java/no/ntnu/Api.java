package no.ntnu;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.HashSet;
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
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("api")
public class Api {

    

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
            default:
                return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(type)
                .body(r);
    }

    @GetMapping(value = { "search/location/", "search/location/{car}" })
    public ResponseEntity<Set<String>> getLocation(@PathVariable(required = false) String car) {

        Set<String> jsonStringArray = new HashSet<>();

        try {

            String query = "SELECT L.name, L.Address, C.ID, S.Price, " +
                    "CASE WHEN P.startdate IS NULL OR P.enddate IS NULL OR " +
                    LocalDate.now().toString() + " NOT BETWEEN P.enddate AND P.startdate THEN TRUE ELSE FALSE END AS Is_Available "
                    + "FROM Location L "
                    + "JOIN Storage S ON L.ID = S.LID " + "JOIN Car C ON S.CID = C.ID "
                    + "LEFT JOIN PurchaseHistory P ON S.ID = P.SID";

            if (car != null && !car.isBlank()) {
                String maker = car.split(" ")[0];
                String model = car.substring(car.indexOf(" ", 1) + 1);
                if (car.split(" ").length > 1) {
                    query += " WHERE C.Maker = '" + maker + "' AND C.Model LIKE '%" + model + "%';";
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

    @GetMapping(value = { "search/car/", "search/car/{location}" })
    public ResponseEntity<Set<String>> getCar(@PathVariable(required = false) String location) {

        Set<String> jsonStringArray = new HashSet<>();

        try {
            String query = "SELECT "
                    + "C.Maker, "
                    + "C.Model, "
                    + "C.images, "
                    + "L.name, "
                    + "S.Price, "
                    + "Case "
                    + "WHEN "
                    + "P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > "
                    + "P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL THEN TRUE "
                    + "ELSE FALSE "
                    + "END AS Is_Available " + "FROM Car C "
                    + "JOIN Storage S ON C.ID = S.CID " + "JOIN Location L ON S.LID = L.ID "
                    + "LEFT JOIN PurchaseHistory P ON S.ID = P.SID";

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
                json.put("Image", result.getString("C.images").split(", ")[0]);
                jsonStringArray.add(json.toString());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
    }

    @GetMapping("car/images/{carName}")
    public ResponseEntity<Set<String>> carImages(@PathVariable String carName) {

        String maker = carName.split(" ")[0];
        String model = carName.substring(carName.indexOf(" ") + 1);

        Set<String> imgSet = new HashSet<>();

        try {
            DatabaseCon con = new DatabaseCon();
            String query = "SELECT images FROM Car WHERE Maker = '" + maker + "' AND Model = '" + model + "';";

            ResultSet result = con.query(query);

            while (result.next()) {
                String[] imgList = result.getString("images").split(", ");
                for (String i : imgList) {
                    imgSet.add("api/image/" + maker + "_" + model.replace(" ", "_") + "/" + i);
                }
            }

            result.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(imgSet, HttpStatus.OK);
    }

    @GetMapping("car/img/{carName}")
    public ResponseEntity<String> getCarImage(@PathVariable String carName) {
        String maker = carName.split(" ")[0];
        String model = carName.substring(carName.indexOf(" ") + 1);
        String img = "";

        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "root";
        String password = "";

        Connection con = null;

        try {
            con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();

            String query = "SELECT images FROM Car WHERE Maker = '" + maker + "' AND Model = '" + model + "';";

            ResultSet result = statement.executeQuery(query);
            while (result.next()) {
                img = result.getString("images");
            }

            result.close();
            statement.close();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        String mainImage = img.split(", ")[0];

        return new ResponseEntity<>(mainImage, HttpStatus.OK);
    }
}
