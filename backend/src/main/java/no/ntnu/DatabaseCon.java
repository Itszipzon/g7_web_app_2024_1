package no.ntnu;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import io.github.cdimascio.dotenv.Dotenv;

public class DatabaseCon {
    
    private Dotenv env = Dotenv.configure()
            .directory(Main.getCorrectUrl(""))
            .filename(".env")
            .load();
    
    private String url = "jdbc:mysql://localhost:3306/testcarrental";
    private String dbUser = env.get("DATABASE_USERNAME");
    private String dbPassword = env.get("DATABASE_PASSWORD");

    private Connection con;
    private Statement statement;

    public DatabaseCon() {
        this.con = null;
        this.statement = null;
    }

    public ResultSet query(String query) {
        try {

            this.con = DriverManager.getConnection(this.url, this.dbUser, this.dbPassword);
            this.statement = con.createStatement();

            ResultSet result = statement.executeQuery(query);

            return result;

            
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    public void close() {
        try {
            statement.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
