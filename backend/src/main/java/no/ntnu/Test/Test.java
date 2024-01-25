package no.ntnu.Test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class Test {

    @GetMapping("first")
    public String greet() {
        return "Hello World";
    }
    
}
