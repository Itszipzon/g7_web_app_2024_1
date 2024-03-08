package no.ntnu;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Random;
import no.ntnu.user.User;
import org.springframework.web.multipart.MultipartFile;

/**
 * Class for tools that are used in the backend.
 */
public class Tools {

  private Tools() {
  }

  /**
   * Method to convert a string list to a SQL list.
   *
   * @param list  The list to convert
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
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    Random random = new Random();
    StringBuilder stringBuilder = new StringBuilder();
    for (int i = 0; i < length; i++) {
      stringBuilder.append(characters.charAt(random.nextInt(characters.length())));
    }

    return stringBuilder.toString();
  }

  /**
   * Method to get the correct URL.
   *
   * @param url The URL to check
   * @return The correct URL
   */
  public static String getCorrectUrl(String url) {
    if (System.getProperty("os.name").contains("Windows")) {
      url = url.substring(1);
    }
    return url;
  }

  /**
   * Add image to car.
   *
   * @param carName name of the car
   * @param image  image to add
   * @return true if the image was added, false if not
   */
  public static boolean addImage(String carName, MultipartFile image) {

    String path = new Main().getResource("/static/img/car").getPath();

    if (image.isEmpty()) {
      return false;
    }

    try {

      byte[] bytes = image.getBytes();
      if (!Files.exists(Path.of(Tools.getCorrectUrl(path + "/" + carName)))) {
        Files.createDirectories((Path.of(Tools.getCorrectUrl(path + "/" + carName))));
      }

      Path filePath = Path.of(
          Tools.getCorrectUrl(path + "/" + carName + "/" + image.getOriginalFilename())
        );
      
      Files.write(filePath, bytes);
      return true;
    } catch (IOException e) {
      e.printStackTrace();
      return false;
    }
  }

}
