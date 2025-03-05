package funciones;

import modelo.User;

public class Session {
    
    private static Session session;
    private User usuario;
    
    private Session(User u){
        usuario = u;
    }
    
    public static void logIn(User u){
        session = new Session(u);
    }
    
    public static void logOut(){
        session.usuario = null;
    }
    
    public static Session getInstance(){
        if(session == null) System.out.println("No hay usuario logueado");
        return session;
    }
    
    public static boolean hayUsuario(){
        return session != null;
    }

    public User getUsuario() {
        return usuario;
    }
    
    
}
