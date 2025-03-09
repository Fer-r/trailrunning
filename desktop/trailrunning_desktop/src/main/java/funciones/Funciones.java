package funciones;

import java.util.HashMap;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.stage.Modality;
import javafx.stage.Stage;

public class Funciones {
    
    static HashMap<String, String> titulos;
    
    private static String getTitulo(String nombreVista){
        if(titulos == null){
            titulos = new HashMap<>();
            titulos.put("LogIn", "Iniciar sesión");
            titulos.put("PerfilUsuario", "Mis carreras");
            titulos.put("VentanaPrincipal", "Trailrunning");
        }
        return titulos.get(nombreVista);
    }
    
    public static void mostrarVentana(String nombreVista, boolean modal){
        Stage stage = new Stage();
        try{
            FXMLLoader loader = new FXMLLoader(Funciones.class.getResource("../vista/" + nombreVista + ".fxml"));
            Parent root = loader.load();
            
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.setTitle(getTitulo(nombreVista));
            stage.setResizable(false);
            
            if(modal) stage.initModality(Modality.APPLICATION_MODAL);
            stage.show();
        }catch(Exception e){
            System.out.println("ERROR AL SACAR VISTA");
            e.printStackTrace();
        }
    }
    
    public static void mostrarVentana(String nombreVista){
        mostrarVentana(nombreVista, false);
    }
    
    public static void mostrarVentanaYCerrarEsta(String nombreVista, Node node){
        Stage stage = (Stage) node.getScene().getWindow();
        stage.close();
        
        mostrarVentana(nombreVista);
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
