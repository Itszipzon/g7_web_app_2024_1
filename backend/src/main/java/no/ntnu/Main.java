package no.ntnu;

import java.net.URL;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main method to run the springboot application.
 */
@SpringBootApplication
public class Main {
  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }

  public URL getResource(String resource) {
    return this.getClass().getResource(resource);
  }

  /**
   * Returns the correst url to resources folder.
   *
   * @param url to folder or file. 
   * @return the location as a string.
   */
  public static String getCorrectUrl(String url) {
    if (System.getProperty("os.name").contains("Windows")) {
      url = url.substring(1);
    }

    return url;
  }
}
