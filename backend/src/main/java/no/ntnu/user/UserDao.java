package no.ntnu.user;

import java.sql.ResultSet;
import java.sql.SQLException;

import no.ntnu.DatabaseCon;

public class UserDao {

    public User findByEmail(String email) {
        User user = null;

        try {
            DatabaseCon con = new DatabaseCon();
            String query = "SELECT * FROM User WHERE Email = '" + email + "'";

            try (ResultSet result = con.query(query)){
                
                if (result.next()) {
                    user = new User();
                    user.setId(result.getLong("ID"));
                    user.setEmail(result.getString("Email"));
                    user.setSalt(result.getString("Salt"));
                    user.setPassword(result.getString("Password"));
                    user.setTerms(result.getBoolean("Terms"));
                    user.setGuest(result.getBoolean("IsGuest"));
                    user.setAdmin(result.getBoolean("IsAdmin"));
                }
                result.close();
            }

            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;

    }

}
