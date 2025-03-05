package trailrunning_desktop;

import funciones.Funciones;
import java.util.ArrayList;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;
import modelo.API.TrailrunningRepository;
import modelo.User;

public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {
        
        // LogIn
        // VentanaPrincipal
        // PerfilUsuario
        // RegistrarUsuario
        
        Funciones.mostrarVentana("VentanaPrincipal", "Hola");
        
        /*
        //Parent root = FXMLLoader.load(getClass().getResource("../vista/VentanaPrincipal.fxml"));
        Parent root = FXMLLoader.load(getClass().getResource("../vista/LogIn.fxml"));
        //Parent root = FXMLLoader.load(getClass().getResource("../vista/PerfilUsuario.fxml"));
        
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Carreras");
        stage.show();*/
        
    }

    public static void main(String[] args) {
        TrailrunningRepository.inicializarDatos();
        
        ArrayList<User> users = TrailrunningRepository.leerTodosLosUsuarios();
        launch(args);
    }
}
