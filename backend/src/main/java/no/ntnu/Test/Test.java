package no.ntnu.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.lang3.RandomStringUtils;
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

    /**
     * Sends text over http.
     *
     * @return the text.
     */
    @GetMapping("first")
    public String greet() {
        return "Hello From Spring Boot!<br/>The first get request on this app!";
    }

    /**
     * Sends a image to the frontend.
     * @param imageName image to be sent.
     * @return the image.
     */
    @GetMapping("image/{imageName}")
    public ResponseEntity<Resource> image(@PathVariable String imageName) {
        Resource r = new ClassPathResource("static/img/" + imageName);

        MediaType type = null;
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

    /**
     * Upload files to the backend.
     * @param file the file to upload.
     * @return the upload status.
     */
    @PostMapping("upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String uploadDir = new Main().getResource("/static").getPath();
        if (file.isEmpty()) {
            return new ResponseEntity<>("No file selected", HttpStatus.BAD_REQUEST);
        }
        uploadDir = Main.getCorrectUrl(uploadDir);
        try {
            byte[] bytes = file.getBytes();
            fileExist(uploadDir + "/upload");
            uploadDir = new Main().getResource("/static/upload/").getPath();
            uploadDir = Main.getCorrectUrl(uploadDir);

            String fileName = randomizeFileName(file.getOriginalFilename().replace(" ", "-"));
            Path filePath = Paths.get(uploadDir + fileName);
            System.out.println("Uploading " + fileName + " to server\nFile location: " + filePath.toString());
            Files.write(filePath, bytes);

            return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error uploading file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String randomizeFileName(String s) {
        String name = "";
        boolean duplicate = false;

        File folder = new File(Main.getCorrectUrl(new Main().getResource("/static/upload/").getPath()));

        for (File f : folder.listFiles()) {
            if (f.getName().equals(s)) {
                duplicate = true; 
            }
        }

        if (duplicate) {
            int format = s.lastIndexOf(".");
            String stringFormat = s.substring(format, s.length());
            name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(12) , stringFormat);
            System.out.println(name + stringFormat);
        } else {
            name = s;
        }

        return name;
    }

    private String fileType(String fullFileName) {
        return fullFileName.substring(fullFileName.lastIndexOf("."));
    }

    private void fileExist(String file) throws IOException {
        if (!Files.exists(Path.of(file))) {
            Files.createDirectories(Path.of(file));
        }
    }
}
