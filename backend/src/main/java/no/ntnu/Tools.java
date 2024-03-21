package no.ntnu;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
  public static List<Object> convertStringListSql(String list, String split) {
    String[] listArray = list.split(split);

    try {
      List<Object> intList = new ArrayList<>();
      for (String s : listArray) {
        intList.add(Integer.parseInt(s));
      }

      return intList;
    } catch (Exception e) {
      List<Object> stringObject = new ArrayList<>();
      for (String s : listArray) {
        stringObject.add(s);
      }

      return stringObject;
    }

    /*for (var i = 0; i < listArray.length; i++) {
      if (i == 0) {
        newListString += listArray[i];
      } else if (i == listArray.length - 1) {
        if (i == 1) {
          newListString += "','" + listArray[i];
        } else {
          newListString += ",'" + listArray[i];
        }
      } else if (i == 1) {
        newListString += "','" + listArray[i] + "'";
      } else {
        newListString += ",'" + listArray[i] + "'";
      }
    } */
  }

  /**
   * Returns the amount of ? a query needs.
   *
   * @param list The query list.
   * @param split the split string.
   * @return the amount of ? a query needs.
   */
  public static String getSqlListAmount(String list, String split) {
    String[] newList = list.split(split);
    String finished = "";
    for (int i = 0; i < newList.length; i++) {
      if (i == newList.length - 1) {
        finished += "?";
      } else {
        finished += "?, ";
      }
    }

    return finished;
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
    String pathBefore = new Main().getResource("/static").getPath();

    if (image.isEmpty()) {
      return false;
    }

    pathBefore += "/../../../src/main/resources/static/img/car/";

    try {

      byte[] bytes = image.getBytes();
      if (!Files.exists(Path.of(Tools.getCorrectUrl(path + "/" + carName)))) {
        Files.createDirectories((Path.of(Tools.getCorrectUrl(path + "/" + carName))));
      }

      if (!Files.exists(Path.of(Tools.getCorrectUrl(pathBefore + "/" + carName)))) {
        Files.createDirectories((Path.of(Tools.getCorrectUrl(pathBefore + "/" + carName))));
      }

      Path filePath = Path.of(
          Tools.getCorrectUrl(path + "/" + carName + "/" + image.getOriginalFilename())
        );
      
      Path filePathBefore = Path.of(
          Tools.getCorrectUrl(pathBefore + "/" + carName + "/" + image.getOriginalFilename())
        );
      
      Files.write(filePath, bytes);
      Files.write(filePathBefore, bytes);
      return true;
    } catch (IOException e) {
      e.printStackTrace();
      return false;
    }
  }

}
