package trailrunning_desktop;

import funciones.Funciones;
import java.util.ArrayList;
import javafx.application.Application;
import javafx.stage.Stage;
import modelo.API.TrailrunningRepository;
import modelo.User;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {
        TrailrunningRepository.inicializarDatos();
        
        // LogIn
        // VentanaPrincipal
        // PerfilUsuario
        // RegistrarUsuario
        Funciones.leerDatosGuardadosUsuario();
        Funciones.mostrarVentana("VentanaPrincipal");
        
    }

    public static void main(String[] args) {
        launch(args);
    }
}
