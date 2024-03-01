package no.ntnu.post;

import java.security.SecureRandom;
import java.util.Base64;
import no.ntnu.DatabaseCon;
import no.ntnu.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class for registering a user.
 */
@RestController
@RequestMapping("api/register")
public class Register {

  /**
   * Registers a user.
   *
   * @param user the user to register
   * @return a response entity
   */
  @PostMapping("user")
  public ResponseEntity<String> registerUser(@RequestBody User user) {
    byte[] salt = new byte[16];
    SecureRandom random = new SecureRandom();

    random.nextBytes(salt);

    String saltString = Base64.getEncoder().encodeToString(salt);
    User newUser = new User();

    newUser.setEmail(user.getEmail());
    newUser.setSalt(saltString);
    newUser.setPassword(user.getPassword());
    newUser.setTerms(user.isTerms());
    newUser.setGuest(false);
    newUser.setAdmin(false);

    String query = "INSERT INTO Users (Email, Password, Salt, Terms, IsGuest, IsAdmin) VALUES ('"
        + newUser.getEmail()
        + "', '" + newUser.getPassword() + "', '"
        + saltString + "', "
        + newUser.isTerms()
        + ", " + newUser.isGuest()
        + ", " + newUser.isAdmin() + ")";
    
    DatabaseCon db = new DatabaseCon();

    db.update(query);

    

    return ResponseEntity.ok("User registered");
  }

}
