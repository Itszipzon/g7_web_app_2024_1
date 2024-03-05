package no.ntnu;

import java.net.URL;
import java.util.HashMap;
import java.util.Random;
import no.ntnu.user.User;

/**
 * Class for tools that are used in the backend.
 */
public class Tools {


  private Tools() {}

  /**
   * Method to convert a string list to a SQL list.
   *
   * @param list The list to convert
   * @param split The split character
   * @return The converted list
   */
  public static String convertStringListSql(String list, String split) {
    String[] listArray = list.split(split);
    String newListString = "";
    for (var i = 0; i < listArray.length; i++) {
      if (i == listArray.length - 1) {
        newListString += "'" + listArray[i] + "'";
      } else {
        newListString += "'" + listArray[i] + "',";
      }
    }

    return newListString;
  }

  /**
   * Method to generate a unique string.
   *
   * @param map The map to check
   * @return The unique string
   */
  public static String generateUniqueUserToken(HashMap<String, User> map) {
    String randomString = generateRandomString(25);
    while (map.containsKey(randomString)) {
      randomString = generateRandomString(25);
    }

    return randomString;
  }

  /**
   * Method to generate a random string.
   *
   * @return The random string
   */
  public static String generateRandomString(int length) {
    String characters = 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    Random random = new Random();
    StringBuilder stringBuilder = new StringBuilder();
    for (int i = 0; i < length; i++) {
      stringBuilder.append(characters.charAt(random.nextInt(characters.length())));
    }

    return stringBuilder.toString();
  }

  /**
   * Returns the url to a resource.
   *
   * @param url to folder or file.
   * @return the resource
   */
  public static URL getUrl(String url) {
    if (System.getProperty("os.name").contains("Windows")) {
      url = url.substring(1);
      if (url.startsWith("ile:/")) {
        url = url.replace("ile:/", "");
      }
    }
    Main main = new Main();
    return main.getResource(url);
  }

}
