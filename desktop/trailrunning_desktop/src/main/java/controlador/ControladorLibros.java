package controlador;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import modelo.Libros;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.io.InputStream;
import static java.lang.System.exit;

import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Platform;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.stage.Stage;

/**
 *
 * @author Molina
 *
 * Conecta a una base de datos MYSQL/MARIADB vía JDBC Usa modelo Libros para
 * gestionar datos
 */
public class ControladorLibros implements Initializable {

    //Objetos conexión, declaración y ResulSet de JDBC
    Connection conexion;
    Statement st;
    ResultSet rs;

    ObservableList<Libros> listaLibros = FXCollections.observableArrayList();

    private Stage stage;

    @FXML
    private TextField idField;

    @FXML
    private TextField tituloField;

    @FXML
    private TextField autorField;

    @FXML
    private TextField anyoField;

    @FXML
    private TextField paginasField;

    @FXML
    private TableView<Libros> TableView;

    @FXML
    private TableColumn<Libros, Integer> idColumn;

    @FXML
    private TableColumn<Libros, String> tituloColumn;

    @FXML
    private TableColumn<Libros, String> autorColumn;

    @FXML
    private TableColumn<Libros, Integer> anyoColumn;

    @FXML
    private TableColumn<Libros, Integer> paginasColumn;

    @FXML
    private void insertButton() {
        String query = "INSERT INTO libros VALUES (?, ?, ?, ?, ?)";
        try {
            PreparedStatement preparedStatement = this.conexion.prepareStatement(query);
            preparedStatement.setInt(1, Integer.parseInt(idField.getText()));
            preparedStatement.setString(2, tituloField.getText());
            preparedStatement.setString(3, autorField.getText());
            preparedStatement.setInt(4, Integer.parseInt(anyoField.getText()));
            preparedStatement.setInt(5, Integer.parseInt(paginasField.getText()));
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Excepción: " + e.getMessage());
        }
        mostrarLibros();//Tenemos que volver a volcar la BBDD a la OL
    }

    @FXML
    private void updateButton() {
        String query = "UPDATE libros SET Titulo=?, Autor=?, Anyo=?, Paginas=? WHERE ID=?";
        try {
            PreparedStatement preparedStatement = this.conexion.prepareStatement(query);
            preparedStatement.setString(1, tituloField.getText());
            preparedStatement.setString(2, autorField.getText());
            preparedStatement.setInt(3, Integer.parseInt(anyoField.getText()));
            preparedStatement.setInt(4, Integer.parseInt(paginasField.getText()));
            preparedStatement.setInt(5, Integer.parseInt(idField.getText()));
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Excepción: " + e.getMessage());
        }
        mostrarLibros();//Tenemos que volver a volcar la BBDD a la OL
    }

    @FXML
    private void deleteButton() {
        String query = "DELETE FROM libros WHERE ID=?";
        try {
            PreparedStatement preparedStatement = this.conexion.prepareStatement(query);
            preparedStatement.setInt(1, Integer.parseInt(idField.getText()));
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Excepción: " + e.getMessage());
        }
        mostrarLibros();//Tenemos que volver a volcar la BBDD a la OL
    }

    public Connection getConnection() throws IOException {
        //Importante: hay que separar los datos de conexión del programa, así, al cambiar, no tendría
        //que cambiar nada internamente, o al menos, el mínimo posible.
        Properties properties = new Properties();
        String IP, PORT, BBDD, USER, PWD;
        //Se lee IP desde fuera del jar
        try {
            InputStream input_ip = new FileInputStream("ip.properties");//archivo debe estar junto al jar
            properties.load(input_ip);
            IP = (String) properties.get("IP");
        } catch (FileNotFoundException e) {
            System.out.println("No se pudo encontrar el archivo de propiedades para IP, se establece localhost por defecto");
            IP = "localhost";
        }

        InputStream input = getClass().getClassLoader().getResourceAsStream("bbdd.properties");
        if (input == null) {
            System.out.println("No se pudo encontrar el archivo de propiedades");
            return null;
        } else {
            // Cargar las propiedades desde el archivo
            properties.load(input);
            // String IP = (String) properties.get("IP"); //Tiene sentido leerlo desde fuera del Jar por si cambiamos la IP, el resto no debería de cambiar
            //ni debería ser público
            PORT = (String) properties.get("PORT");//En vez de crear con new, lo crea por asignación + casting
            BBDD = (String) properties.get("BBDD");
            USER = (String) properties.get("USER");//USER de MARIADB en LAMP 
            PWD = (String) properties.get("PWD");//PWD de MARIADB en LAMP 

            Connection conn;
            try {
                String cadconex = "jdbc:mariadb://" + IP + ":" + PORT + "/" + BBDD + " USER:" + USER + "PWD:" + PWD;
                System.out.println(cadconex);
                //Si usamos LAMP Funciona con ambos conectores
                conn = DriverManager.getConnection("jdbc:mariadb://" + IP + ":" + PORT + "/" + BBDD, USER, PWD);
                return conn;
            } catch (SQLException e) {
                System.out.println("Error SQL: " + e.getMessage());
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.setTitle("Error");
                alert.setHeaderText("Ha ocurrido un error de conexión");
                alert.setContentText(e.getMessage());
                alert.showAndWait();
                exit(0);
                return null;
            }
        }
    }

    public void mostrarLibros() {
        TableView.setItems(dameListaLibros());
    }

    public ObservableList<Libros> dameListaLibros() {
        if (conexion != null) {
            listaLibros.clear(); //Limpiamos el contenido actual
            String query = "SELECT * FROM libros";
            try {
                rs = st.executeQuery(query);
                Libros libro;
                while (rs.next()) { //Se usan los identificadores propios en la BBDD (no es case sensitive). Revisar en phpmyadmin
                    libro = new Libros(rs.getInt("Id"), rs.getString("TITULO"), rs.getString("Autor"), rs.getInt("Anyo"), rs.getInt("Paginas"));
                    listaLibros.add(libro);
                }
            } catch (SQLException e) {
                System.out.println("Excepción SQL: " + e.getMessage());
            }
            return listaLibros;
        }
        return null;
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        try {
            conexion = this.getConnection();
            if (conexion != null) {
                this.st = conexion.createStatement();
            }
        } catch (IOException | SQLException e) {
        }
        if (conexion != null) {
            ObservableList<Libros> lista = dameListaLibros();

            //Los campos han de coincidir con los campos del objeto Libros
            idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
            tituloColumn.setCellValueFactory(new PropertyValueFactory<>("titulo"));
            autorColumn.setCellValueFactory(new PropertyValueFactory<>("autor"));
            anyoColumn.setCellValueFactory(new PropertyValueFactory<>("anyo"));
            paginasColumn.setCellValueFactory(new PropertyValueFactory<>("paginas"));

            TableView.setItems(lista);
        }

        Platform.runLater(() -> {
            //Accedemos al stage actual mediante cualquier nodo
            Stage primaryStage = (Stage) this.TableView.getScene().getWindow();
            primaryStage.setOnCloseRequest(event -> {
                    try {
                        conexion.close();
                        System.out.println("Conex. a BBDD cerrada");
                    } catch (SQLException ex) {
                        Logger.getLogger(ControladorLibros.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    primaryStage.close(); // Cierra la ventana si el usuario confirma
            });

        });

    }

}
