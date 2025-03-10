package modelo;

import java.time.LocalDate;

public class Participant {
    int id;
    int user_id;
    int race_id;
    LocalDate time;
    int dorsal;
    boolean banned;

    public Participant() {
    }

    public Participant(int id, int user_id, int race_id, LocalDate time, int dorsal, boolean banned) {
        this.id = id;
        this.user_id = user_id;
        this.race_id = race_id;
        this.time = time;
        this.dorsal = dorsal;
        this.banned = banned;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getRace_id() {
        return race_id;
    }

    public void setRace_id(int race_id) {
        this.race_id = race_id;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public int getDorsal() {
        return dorsal;
    }

    public void setDorsal(int dorsal) {
        this.dorsal = dorsal;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }

    @Override
    public String toString() {
        return "Participant{" + "id=" + id + ", user_id=" + user_id + ", race_id=" + race_id + ", time=" + time + ", dorsal=" + dorsal + ", banned=" + banned + '}';
    }
}
