package funciones;

public class Session {
    
    private static Session session;
    
    private Session(){
        // cosas para iniciar sesión
    }
    
    public static Session getInstance(){
        if(session == null)
            session = new Session();
        return session;
    }
    
    public static boolean hayUsuario(){
        return session != null;
    }
}
