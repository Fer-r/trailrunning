package controlador;

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
    }
    
}
