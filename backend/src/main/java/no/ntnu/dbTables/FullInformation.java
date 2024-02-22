package no.ntnu.dbtables;

import no.ntnu.user.User;

/**
 * Class to represent a full information.
 */
public class FullInformation {
  
  private Car car;
  private Location location;
  private PurchaseHistory purchaseHistory;
  private Storage storage;
  private User user;

  public FullInformation() {
  }

  public Car getCar() {
    return this.car;
  }

  public Location getLocation() {
    return this.location;
  }

  public PurchaseHistory getPurchaseHistory() {
    return this.purchaseHistory;
  }

  public Storage getStorage() {
    return this.storage;
  }

  public User getUser() {
    return this.user;
  }

  public void setCar(Car car) {
    this.car = car;
  }

  public void setLocation(Location location) {
    this.location = location;
  }

  public void setPurchaseHistory(PurchaseHistory purchaseHistory) {
    this.purchaseHistory = purchaseHistory;
  }

  public void setStorage(Storage storage) {
    this.storage = storage;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
