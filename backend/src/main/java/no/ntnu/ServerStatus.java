package no.ntnu;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("status")
public class ServerStatus {
    
    @GetMapping("current")
    public String getStatus() {
        return "Online";
    }

}
