package modelo;

public class User {
    int id;
    String name;
    String emal;
    String password;
    String[] roles;
    boolean banned;

    public User() {
    }

    public User(int id, String name, String emal, String password, String[] roles, boolean banned) {
        this.id = id;
        this.name = name;
        this.emal = emal;
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

    public String getEmal() {
        return emal;
    }

    public void setEmal(String emal) {
        this.emal = emal;
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
        return "User{" + "id=" + id + ", name=" + name + ", emal=" + emal + ", password=" + password + ", roles=" + roles + ", banned=" + banned + '}';
    }
}
