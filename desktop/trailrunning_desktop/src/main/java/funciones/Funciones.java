package funciones;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Funciones {
    
    public static void mostrarVentana(String nombreVista, String titulo, boolean modal){
        Stage stage = new Stage();
        try{
            Parent root = FXMLLoader.load(Funciones.class.getResource("../vista/" + nombreVista + ".fxml"));
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.setTitle("Carreras");
            stage.setTitle(titulo);
            if(modal) stage.initModality(Modality.APPLICATION_MODAL);
            stage.show();
        }catch(Exception e){
            System.out.println("ERROR AL SACAR VISTA");
            System.out.println("Mensaje del error: " + e.getMessage());
        }
    }
    
    public static void mostrarVentana(String nombreVista, String titulo){
        mostrarVentana(nombreVista, titulo, false);
    }
    
}
