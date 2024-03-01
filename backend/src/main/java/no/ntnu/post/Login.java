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
@RequestMapping("api/login")
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

      if (result.getFetchSize() > 0) {
        while (result.next()) {
          User user = new User();
          if (user.checkPassword(
              password, result.getString("salt"),
              result.getString("password"))) {
            id = result.getString("id");
            emailFromDb = result.getString("email");
            isAdmin = result.getBoolean("isAdmin");

            user.setId(Long.parseLong(id));
            user.setEmail(emailFromDb);
            user.setSalt(salt);
            user.setAdmin(isAdmin);

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
