package no.ntnu.dbtables;

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
  private LinkedList<String> images;

  /**
   * Constructor of a car.
   */
  public Car() {
    this.extras = new LinkedList<String>();
    this.images = new LinkedList<String>();
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

  public LinkedList<String> getImages() {
    return this.images;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setMaker(String maker) {
    this.maker = maker;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public void setYear(int year) {
    this.year = year;
  }

  public void setFuelType(String fuelType) {
    this.fuelType = fuelType;
  }

  public void setTransmission(String transmission) {
    this.transmission = transmission;
  }

  public void setSeats(int seats) {
    this.seats = seats;
  }

  public void addExtras(String extras) {
    this.extras.add(extras);
  }

  public void addImage(String image) {
    this.images.add(image);
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
