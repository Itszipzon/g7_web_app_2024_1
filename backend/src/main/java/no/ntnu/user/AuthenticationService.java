package no.ntnu.user;

public class AuthenticationService {
    
    private UserDao userDao;

    public boolean authenticate(String email, String password) {
        User user = userDao.findByEmail(email);
        return user != null && user.checkPassword(password);
    }

}
