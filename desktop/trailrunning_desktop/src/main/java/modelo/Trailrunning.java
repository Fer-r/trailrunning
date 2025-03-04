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
    
    
    
}
