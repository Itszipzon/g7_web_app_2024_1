package no.ntnu;

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

}
