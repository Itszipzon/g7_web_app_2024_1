package no.ntnu;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;


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

    @GetMapping("search/location/{car}")
    public ResponseEntity<List<String>> getLocation(@PathVariable(required = false) String car) {
    
        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "testCarRental";
        String password = "test";
    
        Connection con = null;
        List<String> jsonStringArray = new ArrayList<>();
    
        try {
            con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();
    
            String query = "SELECT "
                    + "L.name, "
                    + "L.Address, "
                    + "C.ID, "
                    + "S.Price, "
                    + "Case "
                    + "WHEN "
                    + "P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > "
                    + "P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL THEN TRUE "
                    + "ELSE FALSE "
                    + "END AS Is_Available " + "FROM Location L "
                    + "JOIN Storage S ON L.ID = S.LID " + "JOIN Car C ON S.CID = C.ID "
                    + "LEFT JOIN PurchaseHistory P ON S.ID = P.SID";
    
            if (car != null && !car.isBlank()) {
                String maker = car.split(" ")[0];
                String model = car.substring(car.indexOf(" ", 1) + 1);
                query += " WHERE C.Maker = '" + maker + "' AND C.Model = '" + model + "'";
            }
    
            ResultSet result = statement.executeQuery(query);
    
            while (result.next()) {
                JSONObject json = new JSONObject();
    
                json.put("LocationName", result.getString("L.name"));
                json.put("LocationAddress", result.getString("L.Address"));
                json.put("IsAvailable", result.getBoolean("Is_Available"));
                jsonStringArray.add(json.toString());
            }
    
            result.close();
            statement.close();
            con.close();
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
    }
    
}
