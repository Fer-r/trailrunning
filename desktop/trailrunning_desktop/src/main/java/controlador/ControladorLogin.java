package controlador;

import funciones.Funciones;
import funciones.Session;
import java.awt.Desktop;
import java.net.URI;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import modelo.API.TrailrunningRepository;
import modelo.User;

public class ControladorLogin implements Initializable {
    
    // *** UI ****

    @FXML
    private PasswordField edtPassword;

    @FXML
    private TextField edtUsuario;
    
    @FXML
    private Button btnLogin;

    @FXML
    private Hyperlink linkRegistrate;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        inicializarEventos();
    }

    private void inicializarEventos(){
        /* No va a ser necesario
        btnRegistrarse.setOnAction(event -> {
            Funciones.mostrarVentana("RegistrarUsuario", "Registrar usuario", true);
        });*/
        
        btnLogin.setOnAction(event -> iniciarSesion());
        linkRegistrate.setOnMouseClicked(event -> {
            try{
                Desktop.getDesktop().browse(new URI("http://skavenger.byethost8.com/homerswebpage/?i=1"));
            }catch(Exception e){
                e.printStackTrace();
            }
        });
    }
    
    public void iniciarSesion(){
        // Coger y comprobar datos
        String nombreUsuario = edtUsuario.getText();
        String nombrePassword = edtPassword.getText();
        if(!TrailrunningRepository.comprobarUsuario(nombreUsuario, nombrePassword)){
            Funciones.mostrarAlertaError(
                    "Los datos introducidos no son correctos",
                    "Por favor, inténtelo de nuevo"
            );
            return;
        }

        // Iniciar sesión
        User usuario = TrailrunningRepository.leerUsuarioPorNombre(nombreUsuario);
        Session.logIn(usuario);
        irAPerfil();
    }
    
    public void irAPerfil(){
        Funciones.cerrarStageDelNodo(btnLogin);
        Funciones.mostrarVentana("PerfilUsuario", "Mis carreras", true);
    }
    
}
