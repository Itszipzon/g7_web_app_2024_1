package no.ntnu.post;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.ntnu.DatabaseCon;
import no.ntnu.Tools;
import no.ntnu.user.SessionManager;
import no.ntnu.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class for logging in a user.
 */
@RestController
@RequestMapping("post/login")
public class Login {

  @Autowired
  private SessionManager sessionManager;
  
  /**
   * Logs in a user.
   *
   * @param email The email
   * @param password The password
   * @return a response entity containing the token.
   */
  @PostMapping("user")
  public ResponseEntity<String> loginUser(@RequestBody String email, @RequestBody String password) {
    String token = "";
    try {
      DatabaseCon con = new DatabaseCon();
      String query = "SELECT * FROM Users WHERE Email = '"
          + email + "';";

      ResultSet result = con.query(query);

      String id = "";
      String emailFromDb = "";
      String salt = "";
      boolean isAdmin = false;
      String name = "";
      String phoneNumber = "";
      String address = "";

      if (result.getFetchSize() > 0) {
        while (result.next()) {
          User user = new User();
          if (user.checkPassword(
              password, result.getString("salt"),
              result.getString("Password"))) {
            id = result.getString("ID");
            emailFromDb = result.getString("Email");
            isAdmin = result.getBoolean("IsAdmin");
            salt = result.getString("Salt");
            name = result.getString("Name");
            phoneNumber = result.getString("PhoneNumber");
            address = result.getString("Address");

            user.setId(Long.parseLong(id));
            user.setEmail(emailFromDb);
            user.setSalt(salt);
            user.setAdmin(isAdmin);
            user.setName(name);
            user.setPhoneNumber(phoneNumber);
            user.setAddress(address);

            token = Tools.generateUniqueUserToken(sessionManager.getSessions());
            sessionManager.addSession(token, user);
          }

        }
      }
      
    } catch (SQLException e) {
      e.printStackTrace();
    }
    if (token.isEmpty()) {
      return ResponseEntity.badRequest().body("User not found");
    }
    return ResponseEntity.ok(token);
  }

}
