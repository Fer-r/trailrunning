package modelo.API;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import modelo.Participant;
import modelo.Trailrunning;
import modelo.User;

public class TrailrunningRepository {
    
    // Datos
    static ArrayList<User> users;
    static ArrayList<Trailrunning> trailrunning;
    static ArrayList<Participant> participants;
    
    public static void inicializarDatos(){
        users = new ArrayList<>();
        users.addAll(List.of(
                new User(1, "Alice", "alice@example.com", "password123", new String[]{"USER"}, false),
            new User(2, "Bob", "bob@example.com", "securepass", new String[]{"USER", "ADMIN"}, false),
            new User(3, "Charlie", "charlie@example.com", "mypassword", new String[]{"USER"}, true),
            new User(4, "David", "david@example.com", "pass123", new String[]{"MODERATOR"}, false),
            new User(5, "Eve", "eve@example.com", "adminpass", new String[]{"ADMIN"}, true)
        ));
        
        trailrunning = new ArrayList<>();
        trailrunning.addAll(List.of(
                new Trailrunning(1, "Mountain Challenge", "A tough trail through the mountains.", 
                    LocalDate.of(2025, 5, 10), 42.5, "Andorra", "42.5078,1.5211", 2500, 50.0, 200, "OPEN", "Ultra", "mountain.jpg"),

                new Trailrunning(2, "Forest Run", "Scenic run through dense forests.", 
                    LocalDate.of(2025, 6, 15), 25.0, "Germany", "48.1351,11.5820", 1200, 30.0, 150, "OPEN", "Marathon", "forest.jpg"),

                new Trailrunning(3, "Desert Dash", "Extreme heat and dunes await.", 
                    LocalDate.of(2025, 7, 20), 60.0, "Morocco", "31.6295,-7.9811", 500, 80.0, 100, "CLOSED", "Ultra", "desert.jpg")
        ));
        
        participants = new ArrayList<>();
        participants.addAll(List.of(
                new Participant(1, 1, 1, LocalDate.of(2025, 5, 10), 101, false),
                new Participant(2, 2, 1, LocalDate.of(2025, 5, 10), 102, false),
                new Participant(3, 3, 2, LocalDate.of(2025, 6, 15), 201, true),
                new Participant(4, 4, 3, LocalDate.of(2025, 7, 20), 301, false),
                new Participant(5, 5, 2, LocalDate.of(2025, 6, 15), 202, false),
                new Participant(6, 1, 2, LocalDate.of(2025, 5, 10), 101, false)
        ));
        
        System.out.println("Datos inicializados correctamente");
    }
    
    // OPERACIONES
    
    // 1. User
        // C
    public static void crearUsuario(User user){
        users.add(user);
    }
    
        // R
    public static ArrayList<User> leerTodosLosUsuarios(){
        return users;
    }
    
    public static User leerUsuarioPorId(int id){
        for(User u : users){
            if(u.getId() == id){
                System.out.println("Usuario leído correctamente con id " + id);
                return u;
            }
        }
        System.out.println("No se ha encontrado el usuario para leer con id" + id);
        return null;
    }
    
    public static User leerUsuarioPorNombre(String nombre){
        for(User u : users){
            if(u.getName().equals(nombre)){
                System.out.println("Usuario leído correctamente con nombre " + nombre);
                return u;
            }
        }
        System.out.println("No se ha encontrado el usuario para leer con nombre " + nombre);
        return null;
    }
    
        // U
    public static void actualizarUsuario(User user){
        for(User u : users){
            if(u.getId() == user.getId()){
                u = user;
                System.out.println("Usuario actualizado correctamente con id " + u.getId());
                return;
            }
        }
        System.out.println("No se ha encontrado el usuario para actualizar con id " + user.getId());
    }
    
        // D
    public static void borrarUsuario(int id){
        for(User u : users){
            if(u.getId() == id){
                users.remove(u);
                System.out.println("Usuario borrado");
                return;
            }
        }
        System.out.println("No se ha encontrado el usuario para borrar con id " + id);
    }
    
    // Otros
    public static boolean comprobarUsuario(String nombre, String password){
        for(User u : users){
            if(u.getName().equals(nombre) && u.getPassword().equals(password))
                return true;
        }
        System.out.println("No se ha encontrado el usuario");
        return false;
    }
    
    // 2. Trailrunning (Race)
        // C
    public static void crearCarrera(Trailrunning tr){
        trailrunning.add(tr);
        System.out.println("Carrera creada correctamente");
    }
    
        // R
    public static ArrayList<Trailrunning> leerTodasLasCarreras(){
        return trailrunning;
    }
    
    public static Trailrunning leerCarreraPorId(int id){
        for(Trailrunning tr : trailrunning){
            if(tr.getId()== id){
                System.out.println("Carrera leída correctamente con id " + id);
                return tr;
            }
        }
        System.out.println("No se ha encontrado la carrera para leer con id" + id);
        return null;
    }
    
    public static ArrayList<Trailrunning> leerCarrerasDeUsuario(User user){
        ArrayList<Trailrunning> resultado = new ArrayList<>();
        
        for(Participant p : participants){
            if(p.getUser_id() == user.getId()){
                resultado.add(leerCarreraPorId(p.getRace_id()));
            }
        }
        
        return resultado;
    }
    
        // U
    public static void actualizarCarrera(Trailrunning tr){
        for(Trailrunning _tr : trailrunning){
            if(tr.getId() == _tr.getId()){
                _tr = tr;
                System.out.println("Carrera actualizada correctamente con id " + tr.getId());
                return;
            }
        }
        System.out.println("No se ha encontrado la carrera para actualizar con id " + tr.getId());
    }
    
        // D
    public static void borrarCarrera(int id){
        for(Trailrunning tr : trailrunning){
            if(tr.getId() == id){
                trailrunning.remove(tr);
                System.out.println("Carreara borrada");
                return;
            }
        }
        System.out.println("No se ha encontrado la carrera para borrar con id " + id);
    }
    
    // 3. Participant (intermedia)
        // C
    public static void crearParticipante(Participant p){
        participants.add(p);
        System.out.println("Participación creada correctamente");
    }
    
        // R
    public static ArrayList<Participant> leerTodosLosParticipantes(){
        return participants;
    }
    
    // TODO: aquí podría poner más métodos para encontrar participaciones
    public static ArrayList<Participant> leerParticipantesDeUsuario(int id_usuario){
        ArrayList<Participant> resultado = new ArrayList<>();
        for(Participant p : participants){
            if(p.getUser_id()== id_usuario)
                resultado.add(p);
        }
        return resultado;
    }
    
        // U
    public static void actualizarParticipante(Participant participant){
        for(Participant p : participants){
            if(p.getId() == participant.getId()){
                p = participant;
                System.out.println("Participación actualizada correctamente con id " + participant.getId());
                return;
            }
        }
        System.out.println("No se ha encontrado la participación para actualizar con id " + participant.getId());
    }
    
        // D
    public static void borrarParticipante(int id){
        for(Participant p : participants){
            if(p.getId() == id){
                participants.remove(p);
                System.out.println("Participaci´pon borrada");
                return;
            }
        }
        System.out.println("No se ha encontrado la participación para borrar con id " + id);
    }
    
}
