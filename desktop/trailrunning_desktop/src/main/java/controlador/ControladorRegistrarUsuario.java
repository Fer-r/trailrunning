package controlador;

import funciones.Funciones;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class ControladorRegistrarUsuario implements Initializable {

    // Variables
    private Stage stage;
    
    // UI ***
    // TextFields
    @FXML
    private TextField edtEmail;

    @FXML
    private TextField edtPassword1;

    @FXML
    private TextField edtPassword2;

    @FXML
    private TextField edtUsuario;
    
    // Botones
    @FXML
    private Button btnCrearUsuario;

    @FXML
    private Button btnVolver;
    
    // Métodos
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        inicializarEventos();
    }
    
    // Post-inicialización
    public void setStage(Stage stage){
        this.stage = stage;
    }

    private void inicializarEventos() {
        btnCrearUsuario.setOnAction(event -> {
            
        });
        btnVolver.setOnAction(event -> {
            Funciones.cerrarStageDelNodo(btnVolver);
        });
    }
}
