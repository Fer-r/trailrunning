package controlador;

import funciones.Funciones;
import funciones.Session;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import modelo.API.TrailrunningRepository;
import modelo.User;

public class ControladorLogin implements Initializable {
    
    @FXML
    private Button btnLogin;

    @FXML
    private Button btnRegistrarse;

    @FXML
    private TextField edtPassword;

    @FXML
    private TextField edtUsuario;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        System.out.println("COntrolador inicializado");
        
        inicializarEventos();
    }

    private void inicializarEventos(){
        btnRegistrarse.setOnAction(event -> {
            Funciones.mostrarVentana("RegistrarUsuario", "Registrar usuario", true);
        });
        btnLogin.setOnAction(event -> {
            // coger datos
            String nombreUsuario = edtUsuario.getText();
            String nombrePassword = edtPassword.getText();
            
            // comprobar datos
            if(!TrailrunningRepository.comprobarUsuario(nombreUsuario, nombrePassword)){
                Funciones.mostrarAlertaError(
                        "Los datos introducidos no son correctos",
                        "Por favor, inténtelo de nuevo"
                );
                return;
            }
            
            // conseguir datos usuario del repository
            User usuario = TrailrunningRepository.leerUsuarioPorNombre(nombreUsuario);
            
            // iniciar la sesión
            Session.logIn(usuario);
            
            // cambiar de ventana
            Funciones.cerrarStageDelNodo(btnLogin);
            Funciones.mostrarVentana("PerfilUsuario", "Mis carreras", true);
        });
    }
    
}
