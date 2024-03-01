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

  public void addSession(String sessionId, User userId) {
    sessions.put(sessionId, userId);
  }

  public void removeSession(String sessionId) {
    sessions.remove(sessionId);
  }

  public User getUserId(String sessionId) {
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
