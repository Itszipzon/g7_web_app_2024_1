package no.ntnu.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class User {
    private Long id;
    private String email;
    private String salt;
    private String hashedPassword;
    private boolean terms;
    private boolean isGuest;
    private boolean isAdmin;
    private BCryptPasswordEncoder encoder;

    public User() {
        encoder = new BCryptPasswordEncoder(12);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public void setPassword(String password) {
        if (this.salt == null && this.salt.isEmpty()){
            throw new IllegalStateException("Salt is not set");
        }
        this.hashedPassword = this.encoder.encode(password + salt);
    }

    public void setTerms(boolean terms) {
        this.terms = terms;
    }

    public void setGuest(boolean isGuest) {
        this.isGuest = isGuest;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public String getSalt() {
        return this.salt;
    }

    public String getPassword() {
        return this.hashedPassword;
    }

    public boolean isTerms() {
        return this.terms;
    }

    public boolean isGuest() {
        return this.isGuest;
    }

    public boolean isAdmin() {
        return this.isAdmin;
    }

    public boolean checkPassword(String password) {
        return encoder.matches(password + this.salt, this.hashedPassword);
    }

    public boolean checkWithHashedPassword(String rawPassword, String hashedP) {
        String hash = encoder.encode(rawPassword + this.salt);
        System.out.println("Hash from user: " + hash);
        System.out.println("Salt from user: " + this.salt);
        return hash == hashedP;
    }
    
}
