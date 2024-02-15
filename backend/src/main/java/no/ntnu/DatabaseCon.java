package no.ntnu;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Class to connect to a database.
 */
public class DatabaseCon {

  private Dotenv env = Dotenv.configure().directory(Main.getCorrectUrl("")).filename(".env").load();

  private String url;
  private String dbUser;
  private String dbPassword;

  private Connection con;
  private Statement statement;

  /**
   * Connect to a database with default values from env file.
   */
  public DatabaseCon() {
    this.url = "jdbc:mysql://localhost:3306/testcarrental";
    this.dbUser = env.get("DATABASE_USERNAME");
    this.dbPassword = env.get("DATABASE_PASSWORD");
    this.con = null;
    this.statement = null;
  }

  /**
   * Connect to your database.
   *
   * @param url to the database.
   * @param username for user on the database.
   * @param password for user on the database.
   */
  public DatabaseCon(String url, String username, String password) {
    this.url = url;
    this.dbUser = username;
    this.dbPassword = password;
    this.con = null;
    this.statement = null;
  }

  /**
   * Sends a query and returns the result from the query.
   *
   * @param query query to be run.
   * @return result from the query.
   */
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

  /**
   * Closing the statement and connection.
   */
  public void close() {
    try {
      statement.close();
      con.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
