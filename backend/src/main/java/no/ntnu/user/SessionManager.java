package no.ntnu.user;

import java.util.HashMap;

/**
 * Class for managing user sessions.
 */
public class SessionManager {
  private HashMap<String, Integer> sessions;

  public SessionManager() {
    sessions = new HashMap<>();
  }

  public void addSession(String sessionId, int userId) {
    sessions.put(sessionId, userId);
  }

  public void removeSession(String sessionId) {
    sessions.remove(sessionId);
  }

  public int getUserId(String sessionId) {
    return sessions.get(sessionId);
  }
}
