package crud_javafx_libros;

import controlador.ControladorLibros;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.stage.Stage;

/**
 *
 * @author Molina
 */
public class Main extends Application {

    @Override
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("../vista/VentanaPrincipal.fxml"));
        
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Librería");
        stage.show();
        
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("CRUD Básico - JMMolina 2024");
        alert.setHeaderText(null);
        alert.setContentText("""
                              AVISO \u00a1Este es un ejemplo con errores de USABILIDAD y FUNCIONALIDAD! 
                              Consultar ToolTips de Botones principales!""");
        alert.show();

    }

    public static void main(String[] args) {
        launch(args);
    }
}
