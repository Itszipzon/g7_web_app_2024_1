package no.ntnu.dbtables;

/**
 * Class to represent a location.
 */
public class Location {
  
  private int id;
  private String name;
  private String address;
  private boolean isBusiness;

  public Location() {
  }

  public int getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getAddress() {
    return this.address;
  }

  public boolean getIsBusiness() {
    return this.isBusiness;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setIsBusiness(boolean isBusiness) {
    this.isBusiness = isBusiness;
  }

}
