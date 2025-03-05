package controlador;

import funciones.Funciones;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

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
            boolean datosCorrectos = true; // provisional
            if(datosCorrectos){
                Funciones.cerrarStageDelNodo(btnLogin);
                Funciones.mostrarVentana("PerfilUsuario", "Mis carreras", true);
            }else{
                Funciones.mostrarAlertaError(
                        "Los datos introducidos no son correctos",
                        "Por favor, inténtelo de nuevo"
                );
            }
        });
    }
    
}
