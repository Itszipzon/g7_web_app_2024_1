package no.ntnu.dbtables;


/**
 * Class to represent a storage.
 */
public class Storage {
  
  private int id;
  private double price;

  public Storage() {
  }

  public int getId() {
    return this.id;
  }

  public double getPrice() {
    return this.price;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setPrice(double price) {
    this.price = price;
  }

}
