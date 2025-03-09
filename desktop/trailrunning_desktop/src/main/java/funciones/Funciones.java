package funciones;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.image.Image;
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
            Image icono = new Image(Funciones.class.getResource("../vista/img/shoes.png").toExternalForm());
            stage.getIcons().add(icono);
            
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
    
    public static String[] leerDatosGuardadosUsuario(){
        try{
            String contenido = Files
                    .readString(Path.of(Funciones.class.getResource("usuarioGuardado.txt").toURI()));
            
            String[] resultado = contenido.split(";");
            if(resultado.length != 2) return null;
            return resultado;
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
    public static void actualizarDatosGuardadosUsuario(String usuario, String password){
        try{
            String texto = usuario + ";" + password;
            File file = new File(Funciones.class.getResource("usuarioGuardado.txt").toURI());
            FileWriter writer = new FileWriter(file, false);
            writer.write(texto);
            writer.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
}
