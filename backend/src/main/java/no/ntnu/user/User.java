package no.ntnu.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Class to represent a user.
 */
public class User {
  private int id;
  private String email;
  private String salt;
  private String password;
  private String hashedPassword;
  private String name;
  private String phoneNumber;
  private String address;
  private boolean terms;
  private boolean isGuest;
  private boolean isAdmin;
  private BCryptPasswordEncoder encoder;

  public User() {
    encoder = new BCryptPasswordEncoder(12);
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setSalt(String salt) {
    this.salt = salt;
  }

  /**
   * Takes in the raw password of a user and encrypts it with the salt.
   *
   * @param password the raw password of the user.
   */
  public void setPassword(String password) {
    this.password = password;
  }

  public void setTerms(boolean terms) {
    this.terms = terms;
  }

  public void setGuest(boolean isGuest) {
    this.isGuest = isGuest;
  }

  public void setAdmin(boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public int getId() {
    return this.id;
  }

  public String getEmail() {
    return this.email;
  }

  public String getSalt() {
    return this.salt;
  }

  public String getHashedPassword() {
    return this.hashedPassword;
  }

  public String getPassword() {
    return this.password;
  }

  public boolean isTerms() {
    return this.terms;
  }

  public boolean isGuest() {
    return this.isGuest;
  }

  public boolean isAdmin() {
    return this.isAdmin;
  }

  public String getName() {
    return this.name;
  }

  public String getPhoneNumber() {
    return this.phoneNumber;
  }

  public String getAddress() {
    return this.address;
  }

  /**
   * Returns email in hidden format.
   *
   * @return email in hidden format.
   */
  public String getHiddenEmail() {
    String hiddenEmail = "";
    boolean foundAt = false;
    for (int i = 0; i < this.email.length(); i++) {
      if (i == 0) {
        hiddenEmail += this.email.charAt(0);
      }

      if (this.email.charAt(i) != '@'
          && !foundAt
          && i < this.email.indexOf("@") - 5) {
        hiddenEmail += "*";
      }

      if (i >= this.email.indexOf("@") - 4) {
        hiddenEmail += this.email.charAt(i);
      }

    } 

    return hiddenEmail;
  }

  public void hashPassword() {
    this.hashedPassword = encoder.encode(this.password + this.salt);
  }

  public boolean checkPassword(String password, String salt, String hashedPassword) {
    return encoder.matches(password + salt, hashedPassword);
  }

}
