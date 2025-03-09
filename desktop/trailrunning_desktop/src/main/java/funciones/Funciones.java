package funciones;

import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Funciones {
    
    public static void mostrarVentana(String nombreVista, String titulo, boolean modal){
        Stage stage = new Stage();
        try{
            FXMLLoader loader = new FXMLLoader(Funciones.class.getResource("../vista/" + nombreVista + ".fxml"));
            Parent root = loader.load();
            
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.setTitle("Carreras");
            stage.setTitle(titulo);
            stage.setResizable(false);
            
            if(modal) stage.initModality(Modality.APPLICATION_MODAL);
            stage.show();
        }catch(Exception e){
            System.out.println("ERROR AL SACAR VISTA");
            e.printStackTrace();
        }
    }
    
    public static void mostrarVentana(String nombreVista, String titulo){
        mostrarVentana(nombreVista, titulo, false);
    }
    
    public static void mostrarVentanaYCerrarEsta(String nombreVista, String titulo, Node node){
        Stage stage = (Stage) node.getScene().getWindow();
        stage.close();
        
        mostrarVentana(nombreVista, titulo);
    }
    
    public static void mostrarAlertaError(String mensajeHeader, String mensajeContent){
        Alert alert = new Alert(AlertType.ERROR);
        alert.setTitle("Error");
        alert.setHeaderText(mensajeHeader);
        if(mensajeContent != null) alert.setContentText(mensajeContent);
        alert.showAndWait();
    }
    
    public static void mostrarAlertaError(String mensajeHeader){
        mostrarAlertaError(mensajeHeader, null);
    }
    
    public static void cerrarStageDelNodo(Node node){
        Stage stage = (Stage) node.getScene().getWindow();
        stage.close();
    }
    
}
