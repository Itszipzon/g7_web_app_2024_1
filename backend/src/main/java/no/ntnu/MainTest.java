package no.ntnu;

public class MainTest {
    public static void main(String[] args) {
        String os = System.getProperty("os.name");
        String vla = "\"{\"IsAvailable\":true,\"LocationAddress\":\"Millergata 46, 6789 Bill\",\"LocationName\":\"Miller Bil\"}\"";
        
        for (int i = 70; i < vla.length(); i++) {
            System.out.println(vla.charAt(i));
        }
    }

    public static void findNonWhitespaceCharacter(String jsonString) {
        int position = 0;
        for (char c : jsonString.toCharArray()) {
            position++;
            if (!Character.isWhitespace(c) && position < 100) {
                System.out.println("Unexpected non-whitespace character found at position: " + position + ", character: " + c);
            }
        }
    }
}
