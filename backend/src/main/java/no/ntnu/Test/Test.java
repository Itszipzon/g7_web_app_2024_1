package no.ntnu.Test;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class Test {

    @GetMapping("first")
    public String greet() {
        return "Hello From Spring Boot!<br/>The first get request on this app!";
    }

    @GetMapping("image/{imageName}")
    public ResponseEntity<Resource> image(@PathVariable String imageName) {
        Resource r = new ClassPathResource("static/img/" + imageName);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(r);
    }

}
