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
            new User(5, "Eve", "eve@example.com", "adminpass", new String[]{"ADMIN"}, true),
            new User(6, "Frank", "frank@example.com", "frankpass", new String[]{"USER"}, false),
            new User(7, "Grace", "grace@example.com", "grace123", new String[]{"USER", "MODERATOR"}, false),
            new User(8, "Heidi", "heidi@example.com", "heidipass", new String[]{"USER"}, true),
            new User(9, "Ivan", "ivan@example.com", "ivanpass", new String[]{"USER", "ADMIN"}, false),
            new User(10, "Judy", "judy@example.com", "judypass", new String[]{"MODERATOR"}, true)
        ));
        
        trailrunning = new ArrayList<>();
        trailrunning.addAll(List.of(
            new Trailrunning(1, "Mountain Challenge", "A tough trail through the mountains.", 
                LocalDate.of(2025, 5, 10), 42.5, "Andorra", "42.5078,1.5211", 2500, 50.0, 200, "OPEN", "Ultra", "carrera1.jpg"),

            new Trailrunning(2, "Forest Run", "Scenic run through dense forests.", 
                LocalDate.of(2025, 6, 15), 25.0, "Germany", "48.1351,11.5820", 1200, 30.0, 150, "OPEN", "Marathon", "carrera2.jpg"),

            new Trailrunning(3, "Desert Dash", "Extreme heat and dunes await.", 
                LocalDate.of(2025, 7, 20), 60.0, "Morocco", "31.6295,-7.9811", 500, 80.0, 100, "CLOSED", "Ultra", "carrera3.jpg"),

            new Trailrunning(4, "Coastal Challenge", "Run along breathtaking coastlines.",
                LocalDate.of(2025, 8, 12), 35.0, "Portugal", "38.7223,-9.1393", 800, 45.0, 180, "OPEN", "Marathon", "carrera1.jpg"),

            new Trailrunning(5, "Volcano Trail", "Adventure around active volcanoes.",
                LocalDate.of(2025, 9, 5), 50.0, "Italy", "37.7510,14.9934", 1500, 60.0, 130, "OPEN", "Ultra", "carrera2.jpg"),

            new Trailrunning(6, "Northern Lights Run", "A night race under the auroras.",
                LocalDate.of(2025, 10, 18), 20.0, "Norway", "69.6492,18.9553", 600, 35.0, 90, "OPEN", "Half-Marathon", "carrera3.jpg"),

            new Trailrunning(7, "Jungle Trek", "Dense jungle trails with river crossings.",
                LocalDate.of(2025, 11, 22), 28.0, "Brazil", "-3.4653,-62.2159", 700, 40.0, 110, "OPEN", "Marathon", "carrera1.jpg"),

            new Trailrunning(8, "Canyon Quest", "Technical descents and steep climbs in the canyons.",
                LocalDate.of(2026, 1, 14), 45.0, "USA", "36.1069,-112.1129", 2000, 55.0, 170, "CLOSED", "Ultra", "carrera2.jpg"),

            new Trailrunning(9, "Island Ultra", "Tropical island loop with ocean views.",
                LocalDate.of(2026, 3, 9), 55.0, "Philippines", "13.4100,123.3700", 900, 70.0, 150, "OPEN", "Ultra", "carrera3.jpg"),

            new Trailrunning(10, "Glacier Run", "Icy paths and frigid winds await.",
                LocalDate.of(2026, 4, 25), 30.0, "Iceland", "64.9631,-19.0208", 1000, 50.0, 140, "OPEN", "Marathon", "carrera1.jpg")
        ));
        
        participants = new ArrayList<>();
        participants.addAll(List.of(
            new Participant(1, 1, 1, LocalDate.of(2025, 5, 10), 101, false),   // Alice - Mountain Challenge
            new Participant(2, 2, 1, LocalDate.of(2025, 5, 10), 102, false),   // Bob - Mountain Challenge
            new Participant(3, 3, 2, LocalDate.of(2025, 6, 15), 201, true),    // Charlie - Forest Run
            new Participant(4, 4, 3, LocalDate.of(2025, 7, 20), 301, false),   // David - Desert Dash
            new Participant(5, 5, 2, LocalDate.of(2025, 6, 15), 202, false),   // Eve - Forest Run
            new Participant(6, 6, 4, LocalDate.of(2025, 8, 12), 401, false),   // Frank - Coastal Challenge
            new Participant(7, 7, 4, LocalDate.of(2025, 8, 12), 402, false),   // Grace - Coastal Challenge
            new Participant(8, 8, 5, LocalDate.of(2025, 9, 5), 501, true),     // Heidi - Volcano Trail
            new Participant(9, 9, 5, LocalDate.of(2025, 9, 5), 502, false),    // Ivan - Volcano Trail
            new Participant(10, 10, 6, LocalDate.of(2025, 10, 18), 601, true), // Judy - Northern Lights Run
            new Participant(11, 1, 7, LocalDate.of(2025, 11, 22), 701, false), // Alice - Jungle Trek
            new Participant(12, 2, 8, LocalDate.of(2026, 1, 14), 801, true),   // Bob - Canyon Quest
            new Participant(13, 3, 9, LocalDate.of(2026, 3, 9), 901, false),   // Charlie - Island Ultra
            new Participant(14, 4, 10, LocalDate.of(2026, 4, 25), 1001, false),// David - Glacier Run
            new Participant(15, 5, 10, LocalDate.of(2026, 4, 25), 1002, false),// Eve - Glacier Run
            new Participant(16, 6, 9, LocalDate.of(2026, 3, 9), 902, false),   // Frank - Island Ultra
            new Participant(17, 7, 8, LocalDate.of(2026, 1, 14), 802, false),  // Grace - Canyon Quest
            new Participant(18, 8, 7, LocalDate.of(2025, 11, 22), 702, false), // Heidi - Jungle Trek
            new Participant(19, 9, 6, LocalDate.of(2025, 10, 18), 602, true),  // Ivan - Northern Lights Run
            new Participant(20, 10, 5, LocalDate.of(2025, 9, 5), 503, false)   // Judy - Volcano Trail
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
