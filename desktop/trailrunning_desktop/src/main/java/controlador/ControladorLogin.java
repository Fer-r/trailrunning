package controlador;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

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
            Stage stage = new Stage();
            Parent root;
            try {
                root = FXMLLoader.load(getClass().getResource("../vista/RegistrarUsuario.fxml"));
                Scene scene = new Scene(root);
                stage.setScene(scene);
                stage.setTitle("Librería");
                stage.show();
            } catch (IOException ex) {
                Logger.getLogger(ControladorLogin.class.getName()).log(Level.SEVERE, null, ex);
            }

            
        });
    }
    
}
