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
import no.ntnu.Main;
import no.ntnu.dbTables.Car;

@RestController
@RequestMapping("test")
public class Test {

    /**
     * Sends text over http.
     *
     * @return the text.
     */
    @GetMapping("first")
    public String greet() {
        return "Hello From Spring Boot!<br/>The first get request on this app!";
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
            default:
                return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(type)
                .body(r);
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
            System.out.println("Uploading " + fileName + " to server\nFile location: " + filePath.toString());
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

    private String fileType(String fullFileName) {
        return fullFileName.substring(fullFileName.lastIndexOf("."));
    }

    private void fileExist(String file) throws IOException {
        if (!Files.exists(Path.of(file))) {
            Files.createDirectories(Path.of(file));
        }
    }

    @GetMapping("cars")
    public ResponseEntity<ArrayList<String>> getCars() {

        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "testCarRental";
        String password = "test";

        Connection con = null;
        ArrayList<String> cars = new ArrayList<>();

        try {
            con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();

            String query = "SELECT * FROM Car";
            ResultSet result = statement.executeQuery(query);

            while (result.next()) {
                int id = result.getInt("ID");
                String maker = result.getString("Maker");
                String model = result.getString("Model");
                int year = result.getInt("Year");
                String fuel = result.getString("Fuel");
                String transmission = result.getString("Transmission");
                int seats = result.getInt("Seats");
                String extras = result.getString("Extras");

                String e[] = extras.split(", ");
                LinkedList<String> extraList = new LinkedList<>();
                for (String s : e) {
                    extraList.add(s);
                }

                Car car = new Car(id, maker, model, year, fuel, transmission, seats, extraList);
                cars.add(car.toJson());
            }

            result.close();
            statement.close();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("cars/get/{name}")
    public ResponseEntity<ArrayList<String>> getCarsByName(@PathVariable String name) {

        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "testCarRental";
        String password = "test";

        String makerSelected = name.split(" ")[0];
        String modelSelected = name.substring(name.indexOf(" ", 1) + 1);
    
        Connection con = null;
        ArrayList<String> values = new ArrayList<>();

        try {
            con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();
            
            String query = "SELECT"
            + " L.name AS Location_Name,"
            + " L.address AS Location_Address,"
            + " C.*,"
            + " S.price AS Price,"
            + " P.startdate,"
            + " P.enddate"
            + " FROM "
                + " Location L"
            + " JOIN" 
                + " Storage S ON L.ID = S.LID"
            + " JOIN"
                + " Car C ON S.CID = C.ID"
            + " LEFT JOIN"
                + " PurchaseHistory P ON S.ID = P.SID"
            + " WHERE"
                + " C.maker = '" + makerSelected + "' AND C.model = '" + modelSelected
                + "' AND (P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL);";

            String q2 = "SELECT L.name AS Location_Name, L.address AS Location_Address, C.maker AS Car_Maker, C.model AS Car_Model, C.Year AS Year, C.Fuel AS fuel, C.Transmission AS transmission, C.Seats AS seats, C.Extras AS extras, S.price AS Price, P.startdate AS Start_Date, P.enddate AS End_Date FROM Location L JOIN Storage S ON L.ID = S.LID JOIN Car C ON S.CID = C.ID LEFT JOIN PurchaseHistory P ON S.ID = P.SID WHERE C.maker = " + makerSelected + " AND C.model = " + modelSelected + " AND (P.startdate IS NULL OR P.enddate IS NULL OR DATE('now') > P.enddate OR DATE('now') < P.startdate OR P.ID IS NULL);";
            
            ResultSet result = statement.executeQuery(query);


            while (result.next()) {

                JSONObject value = new JSONObject();
                value.put("LocationName", result.getString("Location_Name"));
                value.put("LocationAddress", result.getString("Location_Address"));
                value.put("CarMaker", result.getString("C.maker"));
                value.put("CarModel", result.getString("C.model"));
                value.put("CarYear", result.getInt("C.year"));
                value.put("CarFuel", result.getString("C.fuel"));
                value.put("CarTransmission", result.getString("C.transmission"));
                value.put("CarSeats", result.getInt("C.seats"));
                
                String e[] = result.getString("C.extras").split(", ");
                JSONArray extras = new JSONArray();
                for (String s : e) {
                    extras.put(s);
                }
                value.put("CarExtras", extras);
                value.put("Price", result.getInt("Price"));
                values.add(value.toString());
            }


            result.close();
            statement.close();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(values, HttpStatus.OK);
    }
}
