package no.ntnu;

public class Tools {

    public String getResource(String resource) {
        return getClass().getResource(resource).getPath();
    }
    
}
