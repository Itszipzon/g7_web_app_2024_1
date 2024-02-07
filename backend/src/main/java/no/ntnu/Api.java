package no.ntnu;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class Api {

    @GetMapping("image/{imageName}")
    public ResponseEntity<Resource> image(@PathVariable String imageName) {
        Resource r = new ClassPathResource("static/img/" + imageName);

        MediaType type;
        String fileType = imageName.substring(imageName.lastIndexOf("."));

        switch (fileType) {
            case ".png":
                type = MediaType.IMAGE_PNG;
                break;
            case ".jpg":
                type = MediaType.IMAGE_JPEG;
                break;
            case ".gif":
                type = MediaType.IMAGE_GIF;
            default:
                return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(type)
                .body(r);
    }
}
