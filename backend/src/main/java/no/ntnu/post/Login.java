package no.ntnu.post;

import java.sql.PreparedStatement;
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
   * @param user user.
   * @return a response entity containing the token.
   */
  @PostMapping("user")
  public ResponseEntity<String> loginUser(@RequestBody User user) {
    String token = "";
    try {
      DatabaseCon con = new DatabaseCon();
      String query = "SELECT * FROM Users WHERE Email = ?;";
      PreparedStatement statement = con.prepareStatement(query);
      statement.setString(1, user.getEmail());
      ResultSet result = statement.executeQuery();

      int id = 0;
      String emailFromDb = "";
      boolean isAdmin = false;
      String name = "";
      String phoneNumber = "";
      String address = "";

      while (result.next()) {
        User newUser = new User();

        if (user.checkPassword(user.getPassword(), result.getString("salt"),
            result.getString("Password"))) {
          id = result.getInt("ID");
          emailFromDb = result.getString("Email");
          isAdmin = result.getBoolean("IsAdmin");
          name = result.getString("Name");
          phoneNumber = result.getString("PhoneNumber");
          address = result.getString("Address");

          newUser.setId(id);
          newUser.setEmail(emailFromDb);
          newUser.setAdmin(isAdmin);
          newUser.setName(name);
          newUser.setPhoneNumber(phoneNumber);
          newUser.setAddress(address);

          token = Tools.generateUniqueUserToken(sessionManager.getSessions());
          sessionManager.addSession(token, newUser);
        }

      }
      System.out.println("Login values: " + user.getEmail() + "\n" + user.getPassword());

    } catch (SQLException e) {
      e.printStackTrace();
    }
    if (token.isEmpty()) {
      return ResponseEntity.badRequest().body("User not found");
    }
    return ResponseEntity.ok(token);
  }

  /**
   * Logs out a user.
   *
   * @param token token.
   * @return a response entity containing the status.
   */
  @PostMapping("user/logout")
  public ResponseEntity<String> logoutUser(@RequestBody String token) {
    if (sessionManager.getSessions().containsKey(token)) {
      sessionManager.removeSession(token);
      return ResponseEntity.ok("Logged out");
    }
    return ResponseEntity.badRequest().body("User not found");
  }

}
