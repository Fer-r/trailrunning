package modelo;

import java.time.LocalDate;

public class Trailrunning {
    
    int id;
    String name;
    String description;
    LocalDate date;
    double distance_km;
    String location;
    String coordinates;
    int unevenness;
    double entry_fee;
    int available_slots;
    String status; // TODO: meter enum?
    String category;
    String image;

    public Trailrunning() {
        
    }

    public Trailrunning(int id, String name, String description, LocalDate date, double distance_km, String location, String coordinates, int unevenness, double entry_fee, int available_slots, String status, String category, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.distance_km = distance_km;
        this.location = location;
        this.coordinates = coordinates;
        this.unevenness = unevenness;
        this.entry_fee = entry_fee;
        this.available_slots = available_slots;
        this.status = status;
        this.category = category;
        this.image = image;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getDistance_km() {
        return distance_km;
    }

    public void setDistance_km(double distance_km) {
        this.distance_km = distance_km;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public int getUnevenness() {
        return unevenness;
    }

    public void setUnevenness(int unevenness) {
        this.unevenness = unevenness;
    }

    public double getEntry_fee() {
        return entry_fee;
    }

    public void setEntry_fee(double entry_fee) {
        this.entry_fee = entry_fee;
    }

    public int getAvailable_slots() {
        return available_slots;
    }

    public void setAvailable_slots(int available_slots) {
        this.available_slots = available_slots;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Trailrunning{" + "id=" + id + ", name=" + name + ", description=" + description + ", date=" + date + ", distance_km=" + distance_km + ", location=" + location + ", coordinates=" + coordinates + ", unevenness=" + unevenness + ", entry_fee=" + entry_fee + ", available_slots=" + available_slots + ", status=" + status + ", category=" + category + ", image=" + image + '}';
    }
    
    
    
    
    
}
