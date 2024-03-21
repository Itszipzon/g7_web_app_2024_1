package no.ntnu;

import java.sql.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import no.ntnu.user.User;

public class TestMain {

  public static void main(String[] args) throws SQLException {
    List<Object> stringList = new ArrayList<>();
    Connection con = 
        DriverManager.getConnection("jdbc:mysql://localhost:3306/testcarrental", "root", "");

    stringList.add("Hello");
    stringList.add("There");
    stringList.add("You");
    stringList.add("Mixer");
    stringList.add("Mister");
    stringList.add("Fister");

    Object[] obj = stringList.toArray();
    PreparedStatement st = con.prepareStatement("?, ?");
    Array ar = null;
    if (obj[0] instanceof String) {
      ar = con.createArrayOf("VARCHAR", obj);
      System.out.println("String:");
      System.out.println(ar.toString());
    } else if (obj[0] instanceof Integer) {
      ar = con.createArrayOf("VARCHAR", obj);
      System.out.println("Integer:");
      System.out.println(ar.toString());
    }
  }
  
}
