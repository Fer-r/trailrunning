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
import javafx.scene.control.CheckBox;
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
    
    @FXML
    private CheckBox chkRecordarme;

    @Override
    public void initialize(URL url, ResourceBundle rb) {
        inicializarEventos();
        inicializarDatosGuardados();
    }

    private void inicializarEventos(){
        btnLogin.setOnAction(event -> iniciarSesion());
        linkRegistrate.setOnMouseClicked(event -> {
            try{
                Desktop.getDesktop().browse(new URI("http://skavenger.byethost8.com/homerswebpage/?i=1"));
            }catch(Exception e){
                e.printStackTrace();
            }
        });
    }
    
    private void inicializarDatosGuardados() {
        String[] datos = Funciones.leerDatosGuardadosUsuario();
        if(datos != null){
            edtUsuario.setText(datos[0]);
            edtPassword.setText(datos[1]);
        }
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
        if(chkRecordarme.isSelected()){
            Funciones.actualizarDatosGuardadosUsuario(
                    edtUsuario.getText(),
                    edtPassword.getText());
        }
        Funciones.cerrarStageDelNodo(btnLogin);
        Funciones.mostrarVentana("PerfilUsuario", true);
    }
}
