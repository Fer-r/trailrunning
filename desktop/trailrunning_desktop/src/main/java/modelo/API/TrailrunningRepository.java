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
        
        /* Datos de prueba
        new Trailrunning(1, "Maratón de Montaña", "Carrera exigente en la sierra", java.time.LocalDate.now(), 42.0, "Sierra Nevada", "37.0987,-3.3976", 500, 50.0, 200, "Abierta", "Maratón", "maraton_montana.jpg"),
        new Trailrunning(2, "Ultra Trail Pirineos", "Recorrido extremo en alta montaña", java.time.LocalDate.now(), 100.0, "Pirineos", "42.5833,1.6667", 300, 100.0, 150, "Cerrada", "Ultra Trail", "ultra_pirineos.jpg"),
        new Trailrunning(3, "Carrera Nocturna", "Trail running en plena noche", java.time.LocalDate.now(), 15.0, "Bosque Encantado", "40.4165,-3.7038", 200, 30.0, 90, "Abierta", "Trail Nocturno", "carrera_nocturna.jpg"),
        new Trailrunning(4, "Desafío del Desierto", "Ruta exigente en dunas", java.time.LocalDate.now(), 30.0, "Desierto del Sahara", "23.4162,25.6628", 250, 40.0, 120, "Completada", "Trail Desértico", "desafio_desierto.jpg"),
        new Trailrunning(5, "Sendero del Lobo", "Carrera por senderos de bosque", java.time.LocalDate.now(), 20.0, "Montes de León", "42.5987,-6.4157", 180, 25.0, 80, "Abierta", "Carrera de Senderos", "sendero_lobo.jpg"),
        new Trailrunning(6, "Costa Run", "Ruta costera con vistas impresionantes", java.time.LocalDate.now(), 25.0, "Costa Brava", "41.8122,3.0649", 300, 35.0, 130, "Cerrada", "Trail Costero", "costa_run.jpg"),
        new Trailrunning(7, "Desafío Volcánico", "Carrera en terreno volcánico", java.time.LocalDate.now(), 12.0, "Lanzarote", "29.0469,-13.5899", 150, 20.0, 70, "Abierta", "Trail Volcánico", "desafio_volcanico.jpg"),
        new Trailrunning(8, "Glacier Trail", "Carrera extrema en glaciares", java.time.LocalDate.now(), 50.0, "Alpes Suizos", "46.8182,8.2275", 250, 75.0, 100, "Completada", "Glacier Trail", "glacier_trail.jpg"),
        new Trailrunning(9, "Reto de la Selva", "Recorrido selvático con clima húmedo", java.time.LocalDate.now(), 18.0, "Amazonas", "-3.4653,-62.2159", 220, 30.0, 95, "Abierta", "Trail Selvático", "reto_selva.jpg"),
        new Trailrunning(10, "Endurance Challenge", "Ultra resistencia en montaña", java.time.LocalDate.now(), 80.0, "Andes", "-33.4372,-70.6506", 350, 90.0, 160, "Cerrada", "Ultra Endurance", "endurance_challenge.jpg"),
        new Trailrunning(11, "Río Salvaje", "Carrera junto a ríos y cascadas", java.time.LocalDate.now(), 22.0, "Patagonia", "-49.3315,-72.8866", 200, 28.0, 85, "Completada", "Trail Fluvial", "rio_salvaje.jpg"),
        new Trailrunning(12, "Ruta del Hielo", "Recorrido con bajas temperaturas", java.time.LocalDate.now(), 35.0, "Groenlandia", "72.0000,-40.0000", 180, 45.0, 90, "Abierta", "Trail Gélido", "ruta_hielo.jpg"),
        new Trailrunning(13, "Pico Extremo", "Carrera hasta la cumbre", java.time.LocalDate.now(), 10.0, "Picos de Europa", "43.1876,-4.8555", 170, 22.0, 75, "Cerrada", "Ascenso a la Cumbre", "pico_extremo.jpg"),
        new Trailrunning(14, "Montaña Rápida", "Carrera corta pero intensa", java.time.LocalDate.now(), 8.0, "Montañas Rocosas", "39.5501,-105.7821", 130, 18.0, 60, "Abierta", "Trail Sprint", "montana_rapida.jpg"),
        new Trailrunning(15, "Lluvia y Barro", "Ruta con terrenos fangosos", java.time.LocalDate.now(), 16.0, "Galicia", "42.5751,-8.1339", 210, 27.0, 100, "Completada", "Mud Run", "lluvia_barro.jpg"),
        new Trailrunning(16, "Aventura Alpina", "Carrera con grandes desniveles", java.time.LocalDate.now(), 28.0, "Dolomitas", "46.4102,11.8440", 250, 50.0, 110, "Abierta", "Alpine Trail", "aventura_alpina.jpg"),
        new Trailrunning(17, "Bosque Profundo", "Trail entre árboles milenarios", java.time.LocalDate.now(), 14.0, "Selva Negra", "48.0329,8.2042", 160, 25.0, 85, "Cerrada", "Forest Trail", "bosque_profundo.jpg"),
        new Trailrunning(18, "La Gran Duna", "Recorrido por dunas de arena", java.time.LocalDate.now(), 21.0, "Namibia", "-24.7000,15.2833", 200, 32.0, 105, "Completada", "Dune Run", "gran_duna.jpg"),
        new Trailrunning(19, "Reto Urbano", "Carrera mixta entre ciudad y montaña", java.time.LocalDate.now(), 12.0, "Barcelona", "41.3851,2.1734", 190, 26.0, 95, "Abierta", "Urban Trail", "reto_urbano.jpg"),
        new Trailrunning(20, "Cañón Extremo", "Ruta espectacular entre cañones", java.time.LocalDate.now(), 40.0, "Gran Cañón", "36.1070,-112.1130", 300, 60.0, 140, "Cerrada", "Canyon Trail", "canon_extremo.jpg")
        */
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
                new Participant(6, 1, 2, LocalDate.of(2025, 1, 10), 420, false)
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
    
    public static void crearParticipante(User user, Trailrunning carrera){
        Participant p = new Participant(
                calcularSiguienteIdParticipante(),
                user.getId(),
                carrera.getId(),
                LocalDate.now(),
                100, // TODO: cómo se calcula el dorsal?
                false
        );
        
        participants.add(p);
        System.out.println("Participante añadido");
    }
    
        // R
    public static ArrayList<Participant> leerTodosLosParticipantes(){
        return participants;
    }
    
    public static Participant leerParticipante(User user, Trailrunning carrera){
        for(Participant p : participants){
            if(p.getUser_id() == user.getId() && p.getRace_id() == carrera.getId())
                return p;
        }
        return null;
    }
    
    public static boolean estaInscrito(User user, Trailrunning carrera){
        return leerParticipante(user, carrera) != null;
    }
    
    public static int calcularSiguienteIdParticipante(){
        ArrayList<Participant> list = TrailrunningRepository.leerTodosLosParticipantes();
        int resultado = 1;
        while(true){
            for(Participant p : list){
                if(p.getId() == resultado) break;
                return resultado;
            }
            resultado++;
        }
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
    
    public static boolean borrarParticipante(User user, Trailrunning carrera){
        for(Participant p : participants){
            if(p.getUser_id() == user.getId() && p.getRace_id() == carrera.getId()){
                participants.remove(p);
                System.out.println("Participante eliminado correctamente");
                return true;
            }
        }
        return false;
    }
    
}
