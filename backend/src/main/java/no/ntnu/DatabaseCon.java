package no.ntnu;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.springframework.core.io.ClassPathResource;

/**
 * Class to connect to a database.
 */
public class DatabaseCon {

  Main main = new Main();

  private Dotenv env;

  private String url;
  private String dbUser;
  private String dbPassword;

  private Connection con;
  private Statement statement;

  /**
   * Connect to a database with default values from env file.
   */
  public DatabaseCon() {
    String url = new ClassPathResource("static/").getPath();

    env = Dotenv.configure().directory(url).filename(".env").load();

    this.url = env.get("DATABASE_URL");
    this.dbUser = env.get("DATABASE_USERNAME");
    this.dbPassword = env.get("DATABASE_PASSWORD");
    this.con = null;
    this.statement = null;
  }

  /**
   * Connect to your database.
   *
   * @param url      to the database.
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
   * Updates values in the database.
   *
   * @param query sql query.
   */
  public void update(String query) {
    try {

      this.con = DriverManager.getConnection(this.url, this.dbUser, this.dbPassword);
      this.statement = con.createStatement();

      statement.executeUpdate(query);

    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  /**
   * Prepare a statement.
   *
   * @param query to be prepared.
   * @return prepared statement.
   */
  public PreparedStatement prepareStatement(String query) {
    try {
      Connection con = DriverManager.getConnection(this.url, this.dbUser, this.dbPassword);
      return con.prepareStatement(query);
    } catch (SQLException e) {
      e.printStackTrace();
      return null;
    }
  }

  public Connection getConnection() throws SQLException {
    return DriverManager.getConnection(this.url, this.dbUser, this.dbPassword);
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
