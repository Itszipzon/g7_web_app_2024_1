package no.ntnu.dbTables;

import java.util.LinkedList;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Class to represent a car.
 */
public class Car {

  private int id;
  private String maker;
  private String model;
  private int year;
  private String fuelType;
  private String transmission;
  private int seats;
  private LinkedList<String> extras;

  /**
   * Constructor of a car.
   *
   * @param id ID of the car.
   * @param maker Maker of the car.
   * @param model Model of the car.
   * @param year Year the car was made.
   * @param fuelType The fuel type of the car.
   * @param transmission Transmission type of the car.
   * @param seats Amount of seats in the car.
   * @param extras A list of extras the car comes with.
   */
  public Car(int id, String maker, String model, int year, String fuelType, String transmission,
      int seats, LinkedList<String> extras) {

    this.id = id;
    this.maker = maker;
    this.model = model;
    this.year = year;
    this.fuelType = fuelType;
    this.transmission = transmission;
    this.seats = seats;
    this.extras = extras;
  }

  public int getId() {
    return this.id;
  }

  public String getMaker() {
    return this.maker;
  }

  public String getModel() {
    return this.model;
  }

  public int getYear() {
    return this.year;
  }

  public String getFuelType() {
    return this.fuelType;
  }

  public String getTransmission() {
    return this.transmission;
  }

  public int getSeats() {
    return this.seats;
  }

  public LinkedList<String> getExtras() {
    return this.extras;
  }

  /**
   * Returns a formatted text with all the information about the car.
   *
   * @return a formatted text with all the information about the car.
   */
  public String formatted() {
    String returnString = "ID: " + this.id + "\nMaker: " + this.maker + "\nModel: " + this.model
        + "\nYear; " + this.year + "\nFuel type: " + this.fuelType + "\nTransmission: "
        + this.transmission + "\nAmount of seats: " + this.seats + "\nExtras:";

    for (String s : this.extras) {
      returnString += "\n   - " + s;
    }

    return returnString;
  }

  /**
   * Returns a string in json format.
   *
   * @return a string in json format.
   */
  public String toJson() {
    JSONObject json = new JSONObject();
    json.put("id", this.id);
    json.put("maker", this.maker);
    json.put("model", this.model);
    json.put("year", this.year);
    json.put("fuel", this.fuelType);
    json.put("transmission", this.transmission);
    json.put("seats", this.seats);
    JSONArray extras = new JSONArray();
    for (String s : this.extras) {
      extras.put(s);
    }
    json.put("extras", extras);
    return json.toString();
  }

}
