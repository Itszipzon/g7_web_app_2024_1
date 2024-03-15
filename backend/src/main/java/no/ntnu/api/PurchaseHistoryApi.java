package no.ntnu.api;

import java.sql.PreparedStatement;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Api for purchase history.
 */
@RestController
@RequestMapping("api/purchase-history")
public class PurchaseHistoryApi {

  @Autowired
  private SessionManager sessionManager;

  /**
   * Gets the purchase history for a user.
   *
   * @return a response entity containing the purchase history.
   */
  @GetMapping(value = { "get/admin", "get/admin/{token}" })
  public ResponseEntity<List<String>> getAdminPurchaseHistory(
      @PathVariable(required = false) String token,
      @RequestParam(required = false) int rows,
      @RequestParam(required = false) int page) {

    List<String> purchaseHistory = new ArrayList<>();

    if (!sessionManager.getSessions().containsKey(token)
        || !sessionManager.getUser(token).isAdmin()) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    try {

      if (rows == 0) {
        rows = 10;
      }

      String query = """
          SELECT
            P.ID,
            P.StartDate,
            P.EndDate,
            P.purchaseDate,
            P.status,
            U.ID,
            C.ID,
            L.ID,
            S.Price
          FROM
            PurchaseHistory P
          JOIN
            Users U ON P.UID = U.ID
          JOIN
            Storage S ON P.SID = S.ID
          JOIN
            Car C ON S.CID = C.ID
          JOIN
            Location L ON S.LID = L.ID
          LIMIT ?
          OFFSET ?;
          """;

      DatabaseCon con = new DatabaseCon();
      PreparedStatement st = con.prepareStatement(query);
      st.setInt(1, rows);
      st.setInt(2, page);
      ResultSet result = con.query(query);

      JSONObject json = new JSONObject();

      while (result.next()) {
        json.put("ID", result.getInt("P.ID"));
        json.put("DateFrom", result.getString("P.StartDate"));
        json.put("DateTo", result.getString("P.EndDate"));
        json.put("PurchaseDate", result.getString("P.purchaseDate"));
        json.put("User", result.getString("U.ID"));
        json.put("Status", result.getString("P.Status"));
        json.put("CarID", result.getInt("C.ID"));
        json.put("LocationID", result.getInt("L.ID"));
        json.put("Price", result.getInt("S.Price"));

        purchaseHistory.add(json.toString());
      }

    } catch (SQLException e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new ResponseEntity<>(purchaseHistory, HttpStatus.OK);

  }

  /**
   * Gets the purchase history for a user.
   *
   * @param token the token of the user.
   * @return a response entity containing the purchase history.
   */
  @GetMapping("get/{token}")
  public ResponseEntity<List<String>> getPurchaseHistory(@PathVariable String token) {
    List<String> purchaseHistory = new ArrayList<>();

    try {
      DatabaseCon con = new DatabaseCon();

      String query = """
          SELECT
            P.ID,
            P.StartDate,
            P.EndDate,
            P.PurchaseDate,
            P.Status,
            P.UID,
            P.SID,
            S.Price,
            C.Maker,
            C.Model,
            L.Name
            L.Address
          FROM
            PurchaseHistory P
          JOIN
            Storage S ON P.SID = S.ID
          JOIN
            Car C ON S.CID = C.ID
          JOIN
            Location L ON S.LID = L.ID
          WHERE
            P.UID = ?;
          """;


      PreparedStatement st = con.prepareStatement(query);
      st.setInt(1, sessionManager.getUser(token).getId());
      ResultSet result = st.executeQuery();

      while (result.next()) {
        JSONObject json = new JSONObject();
        json.put("ID", result.getInt("P.ID"));
        json.put("StartDate", result.getString("P.StartDate"));
        json.put("EndDate", result.getString("P.EndDate"));
        json.put("PurchaseDate", result.getString("P.PurchaseDate"));
        json.put("Status", result.getString("P.Status"));
        json.put("Maker", result.getString("C.Maker"));
        json.put("Model", result.getString("C.Model"));
        json.put("LocationName", result.getString("L.Name"));
        json.put("LocationAddress", result.getString("L.Address"));
        json.put("Price", result.getInt("S.Price"));
        
        purchaseHistory.add(json.toString());
      }

      result.close();
      con.close();

    } catch (SQLException e) {
      e.printStackTrace();
    }

    return new ResponseEntity<>(purchaseHistory, HttpStatus.OK);
  }
}
