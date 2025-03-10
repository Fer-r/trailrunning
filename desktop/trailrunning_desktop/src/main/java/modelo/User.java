package modelo;

public class User {
    
    // Estoy es lo que he añadido 
    
    int id;
    String name;
    String email;
    String password;
    String[] roles;
    boolean banned;

    public User() {
    }

    public User(int id, String name, String emal, String password, String[] roles, boolean banned) {
        this.id = id;
        this.name = name;
        this.email = emal;
        this.password = password;
        this.roles = roles;
        this.banned = banned;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", name=" + name + ", emal=" + email + ", password=" + password + ", roles=" + roles + ", banned=" + banned + '}';
    }
}
