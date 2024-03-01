package no.ntnu.user;

import java.util.HashMap;
import org.springframework.stereotype.Component;

/**
 * Class for managing user sessions.
 */
@Component
public class SessionManager {
  private HashMap<String, User> sessions;

  public SessionManager() {
    sessions = new HashMap<>();
  }

  public void addSession(String sessionId, User user) {
    System.out.println("Created new session for "
        + user.getEmail()
        + " session: " + sessionId); //REMOVE BEFORE RELEASE!
    sessions.put(sessionId, user);
  }

  public void removeSession(String sessionId) {
    sessions.remove(sessionId);
  }

  public User getUser(String sessionId) {
    return sessions.get(sessionId);
  }

  public boolean hasSession(String sessionId) {
    return sessions.containsKey(sessionId);
  }

  public void clearSessions() {
    sessions.clear();
  }

  public HashMap<String, User> getSessions() {
    return sessions;
  }
}
