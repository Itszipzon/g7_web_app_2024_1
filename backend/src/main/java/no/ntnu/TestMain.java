package no.ntnu;

import no.ntnu.user.User;

public class TestMain {

  public static void main(String[] args) {
    User user = new User();
    user.setEmail("rune.molander@hotmail.com");

    System.out.println(user.getHiddenEmail());
  }
  
}
