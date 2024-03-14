package no.ntnu.post;

import java.util.List;
import no.ntnu.DatabaseCon;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Post image.
 */
@RestController
@RequestMapping("post")
public class ImagePost {
  
  /**
   * Alter the image order.
   *
   * @param imageId list of image id's.
   */
  @PostMapping("alterimage")
  public void alterImage(List<Integer> imageId) {

    if (imageId.size() < 1) {
      return;
    }

    String query = """
      CREATE TEMPORARY TABLE TempSwapTable (
          OriginalImageNumber INT,
          NewImageNumber INT
      );
      
      INSERT INTO TempSwapTable (OriginalImageNumber, NewImageNumber) VALUES""";
    
    for (int i = 0; i < imageId.size(); i++) {
      query += "(" + i + ", " + imageId.get(i) + ")";
      if (i < imageId.size() - 1) {
        query += ", ";
      } else {
        query += ";";
      }
    }
    query +=  """
      UPDATE YourTable
      JOIN TempSwapTable ON YourTable.ImageNumber = TempSwapTable.OriginalImageNumber
      SET YourTable.ImageNumber = TempSwapTable.NewImageNumber;
      
      DROP TABLE TempSwapTable;
        """;

    DatabaseCon con = new DatabaseCon();
    con.update(query);

  }

}
