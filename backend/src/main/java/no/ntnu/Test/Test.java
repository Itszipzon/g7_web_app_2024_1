package no.ntnu.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import no.ntnu.Main;

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

    @PostMapping("upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String uploadDir = new Main().getResource("/static").getPath();
        System.out.println("\nUpload dir before:" + uploadDir);

        if (file.isEmpty()) {
            return new ResponseEntity<>("No file selected", HttpStatus.BAD_REQUEST);
        }
        uploadDir = Main.getCorrectUrl(uploadDir);
        try {
            byte[] bytes = file.getBytes();
            if (!Files.exists(Path.of(uploadDir + "/upload"))) {
                Files.createDirectories(Path.of(uploadDir + "/upload"));
            }

            uploadDir = new Main().getResource("/static/upload/").getPath();
            uploadDir = Main.getCorrectUrl(uploadDir);

            String fileName = file.getOriginalFilename().replace(" ", "-");

            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, bytes);

            System.out.println(filePath.toAbsolutePath());

            return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error uploading file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
