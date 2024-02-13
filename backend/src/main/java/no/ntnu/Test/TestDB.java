package no.ntnu.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;
import no.ntnu.dbTables.Car;

public class TestDB {
    
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testcarrental";
        String username = "testCarRental";
        String password = "test";
    
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

/*         cars.forEach((c) -> {
            System.out.println("\n" + c.formatted() + "\n");
        }); */
    }

}
