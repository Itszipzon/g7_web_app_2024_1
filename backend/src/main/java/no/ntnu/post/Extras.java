package no.ntnu.post;

import no.ntnu.DatabaseCon;
import no.ntnu.user.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Post extras.
 */
@RestController
@RequestMapping("post")
public class Extras {

  @Autowired
  private SessionManager sessionManager;

  /**
   * Creates a new extra.
   *
   * @param token user token to check if user is admin.
   * @param name the name of the extra.
   */
  @PostMapping("new/extra/{token}")
  public void newExtra(
      @PathVariable String token,  
      @RequestParam("extra") String name) {

    if (!sessionManager.getSessions().containsKey(token) 
        || !sessionManager.getSessions().get(token).isAdmin()) {
      return;
    }
    
    DatabaseCon con = new DatabaseCon();
    String query = "INSERT INTO extras (Name) VALUES ('" + name + "');";
    con.update(query);
  }
  
}
