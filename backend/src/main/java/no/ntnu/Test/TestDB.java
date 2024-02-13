package no.ntnu.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import org.json.JSONObject;
import no.ntnu.dbTables.Car;

public class TestDB {

    public static void main(String[] args) {
        TestDB test = new TestDB();
        //test.testCarQuery();
        test.testLocationListQuery("");

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

            if (!car.isEmpty()) {
                query += " WHERE C.Maker = '" + car.split(" ")[0] + "' AND C.Model = '"
                        + car.substring(car.indexOf(" ", 1) + 1) + "';";
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

        jsonStringArray.forEach((e) -> {
            System.out.println(e);
        });

    }

}
