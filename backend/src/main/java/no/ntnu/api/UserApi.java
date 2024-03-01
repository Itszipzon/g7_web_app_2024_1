package no.ntnu.api;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.DatabaseCon;
import no.ntnu.user.SessionManager;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



/**
 * The user api.
 */
@RestController
@RequestMapping("api")
public class UserApi {

  @Autowired
  private SessionManager sessionManager;

  /**
   * Returns all the users.
   *
   * @return all the users.
   */
  @GetMapping("get/users/{token}")
  public ResponseEntity<List<String>> getUsers(@PathVariable String token) {
    List<String> jsonStringArray = new ArrayList<>();

    if (token == null || !sessionManager.hasSession(token)) {
      return new ResponseEntity<>(jsonStringArray, HttpStatus.UNAUTHORIZED);
    }

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT IsAdmin FROM Users WHERE ID = " 
          + sessionManager.getUser(token).getId() + ";");

      while (result.next()) {
        if (!result.getBoolean("IsAdmin")) {
          return new ResponseEntity<>(jsonStringArray, HttpStatus.UNAUTHORIZED);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    try {
      DatabaseCon con = new DatabaseCon();
      ResultSet result = con.query("SELECT * FROM Users;");

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("ID"));
        json.put("Name", result.getString("Name"));
        json.put("Email", result.getString("Email"));
        json.put("PhoneNumber", result.getString("PhoneNumber"));
        json.put("Address", result.getString("Address"));
        json.put("Terms", result.getBoolean("Terms"));
        json.put("Guest", result.getBoolean("IsGuest"));
        json.put("Admin", result.getBoolean("IsAdmin"));
        json.put("DateJoined", result.getString("DateJoined"));
        jsonStringArray.add(json.toString());
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(jsonStringArray, HttpStatus.OK);
  }
  
  /**
   * Returns boolean if the user is an admin or not.
   *
   * @param token The user id token.
   * @return booleans if the user is an admin or not.
   */
  @GetMapping("user/isadmin/{token}")
  public ResponseEntity<Boolean> isAdmin(@PathVariable String token) {

    boolean isAdmin = false;

    int id = sessionManager.getUser(token).getId();

    try {
      DatabaseCon con = new DatabaseCon();
      String query = "SELECT IsAdmin FROM Users WHERE ID = " + id + ";";

      ResultSet result = con.query(query);

      while (result.next()) {
        isAdmin = result.getBoolean("IsAdmin");
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(isAdmin, HttpStatus.OK);
  }

  /**
   * Returns all the emails of users.
   *
   * @return all the emails of users.
   */
  @GetMapping("users/emails")
  public ResponseEntity<List<String>> userEmails() {
    List<String> emailList = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();
      String query = "SELECT Email FROM Users";
      ResultSet result = con.query(query);

      while (result.next()) {
        emailList.add(result.getString(1));
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(emailList, HttpStatus.OK);
  }
  
}
