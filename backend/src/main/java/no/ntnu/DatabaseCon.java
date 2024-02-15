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
    
    private String url;
    private String dbUser;
    private String dbPassword;

    private Connection con;
    private Statement statement;

    public DatabaseCon() {
        this.url = "jdbc:mysql://localhost:3306/testcarrental";
        this.dbUser = env.get("DATABASE_USERNAME");
        this.dbPassword = env.get("DATABASE_PASSWORD");
        this.con = null;
        this.statement = null;
    }

    public DatabaseCon(String url, String username, String password) {
        this.url = url;
        this.dbUser = username;
        this.dbPassword = password;
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
