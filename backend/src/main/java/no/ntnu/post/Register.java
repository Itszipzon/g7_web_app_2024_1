package no.ntnu.post;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.ntnu.DatabaseCon;
import no.ntnu.user.User;

@RestController
@RequestMapping("api/register")
public class Register {
    
    @PostMapping("user")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        DatabaseCon db = new DatabaseCon();
        byte[] salt = new byte[16];
        SecureRandom random = new SecureRandom();

        random.nextBytes(salt);

        String saltString = Base64.getEncoder().encodeToString(salt);
        User newUser = new User();

        newUser.setEmail(user.getEmail());
        newUser.setSalt(saltString);
        newUser.setPassword(user.getPassword());
        newUser.setTerms(user.isTerms());
        newUser.setGuest(user.isGuest());
        newUser.setAdmin(user.isAdmin());


        String query = "INSERT INTO Users (Email, Password, Salt, Terms, IsGuest, IsAdmin) VALUES ('" + newUser.getEmail() + "', '"
                + newUser.getPassword() + "', '" + saltString + "', " + newUser.isTerms() + ", " + newUser.isGuest() + ", " + newUser.isAdmin() +")";

        db.update(query);
        return ResponseEntity.ok("User registered");
    }

}
