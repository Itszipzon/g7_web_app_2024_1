package no.ntnu.dbtables;


/**
 * Class to represent a purchase history.
 */
public class PurchaseHistory {

  private int id;
  private String dateFrom;
  private String dateTo;

  public PurchaseHistory() {
  }

  public int getId() {
    return this.id;
  }

  public String getDateFrom() {
    return this.dateFrom;
  }

  public String getDateTo() {
    return this.dateTo;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setDateFrom(String dateFrom) {
    this.dateFrom = dateFrom;
  }

  public void setDateTo(String dateTo) {
    this.dateTo = dateTo;
  }

}
