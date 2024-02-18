package no.ntnu.Test;

import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.json.JSONObject;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import no.ntnu.DatabaseCon;
import no.ntnu.dbTables.Car;
import no.ntnu.user.User;

public class TestDB {

    public static void main(String[] args) {
        TestDB test = new TestDB();
        // test.testCarQuery();
        test.testRegister("jan@hgmail.com", "Jan");
        test.checkPassword("jan@hgmail.com", "Jan");
    }

    public void testCarQuery() {
        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "root";
        String password = "";

        Connection con = null;
        ArrayList<Car> cars = new ArrayList<>();

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
                    System.out.println(s);
                }

                Car car = new Car(id, maker, model, year, fuel, transmission, seats, extraList);
                cars.add(car);
            }

            result.close();
            statement.close();
            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        cars.forEach((c) -> {
            System.out.println("\n" + c.formatted() + "\n");
        });

    }

    public void testLocationListQuery(String car) {
        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "root";
        String password = "";

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
                if (car.split(" ").length > 1) {
                    query += " WHERE C.Maker = '" + maker + "' AND C.Model LIKE '%" + model + "%';";
                } else {
                    query += " WHERE C.Maker LIKE '%" + maker + "%';";
                }
            } else {
                query += ";";
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

        jsonStringArray.forEach((s) -> {
            System.out.println(s);
        });

    }

    public void testCarLocationQuery(String location) {
        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "root";
        String password = "";

        Connection con = null;
        Set<String> jsonStringArray = new HashSet<>();

        try {
            con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();

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

            ResultSet result = statement.executeQuery(query);

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

        jsonStringArray.forEach((s) -> {
            System.out.println(s);
        });

    }

    public void testRegister(String email, String password) {

        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        String saltString = Base64.getEncoder().encodeToString(salt);
        User user = new User();
        user.setEmail(email);
        user.setSalt(saltString);
        user.setPassword(password);
        user.setTerms(true);
        user.setGuest(false);
        user.setAdmin(false);

        DatabaseCon con = new DatabaseCon();
        String query = "INSERT INTO users (Email, Password, Salt, Terms, IsGuest, IsAdmin) VALUES ('" + user.getEmail() + "', '"
                + user.getPassword() + "', '" + saltString + "', " + user.isTerms() + ", " + user.isGuest() + ", " + user.isAdmin() +")";

        con.update(query);
    }

    public void checkPassword(String email, String password) {
        DatabaseCon con = new DatabaseCon();
        String query = "SELECT * FROM users WHERE Email = '" + email + "'";
        ResultSet result = con.query(query);
        try {
            if (result.next()) {
                String salt = result.getString("Salt");
                String hashedPassword = result.getString("Password");
                User user = new User();
                user.setSalt(salt);
                user.setPassword(password);
                System.out.println("Hash from user: " + user.getPassword());
                System.out.println("Hash from db: " + hashedPassword);
                System.out.println("Salt from User: " + user.getSalt());
                System.out.println("Salt from db: " + salt);
                System.out.println(user.checkPassword(password));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
