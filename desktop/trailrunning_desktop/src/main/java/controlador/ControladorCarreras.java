package controlador;

import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import modelo.Trailrunning;

public class ControladorCarreras {

    @FXML
    private TableView<Trailrunning> tableView;
    @FXML
    private TableColumn<Trailrunning, Integer> columnaID;
    @FXML
    private TableColumn<Trailrunning, String> columnaNombre;
    @FXML
    private TableColumn<Trailrunning, String> columnaFecha;
    @FXML
    private TableColumn<Trailrunning, String> columnaUbicacion;
    @FXML
    private TableColumn<Trailrunning, Double> columnaPrecio;
    @FXML
    private TableColumn<Trailrunning, Integer> columnaPlazas;
    @FXML
    private TableColumn<Trailrunning, String> columnaEstado;
    @FXML
    private TableColumn<Trailrunning, String> columnaCategoria;

    @FXML
    private Label labelDescripcion;
    @FXML
    private Label labelDistancia;
    @FXML
    private Label labelCoordenadas;
    @FXML
    private Label labelTiempo;
    @FXML
    private Label labelImagen;
    @FXML
    private ImageView imageView;

    private ObservableList<Trailrunning> listaDeCarreras;

    @FXML
    public void initialize() {
        // Crear algunos datos de ejemplo
        listaDeCarreras = FXCollections.observableArrayList(
            new Trailrunning(1, "Carrera 1", "Descripción 1", java.time.LocalDate.now(), 5.0, "Ubicación 1", "Coordenadas 1", 100, 20.0, 50, "Abierta", "Categoría 1", "image1.jpg"),
            new Trailrunning(2, "Carrera 2", "Descripción 2", java.time.LocalDate.now(), 10.0, "Ubicación 2", "Coordenadas 2", 200, 30.0, 100, "Cerrada", "Categoría 2", "image2.jpg")
        );

        // Configuración de las columnas
        columnaID.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getId()).asObject());
        columnaNombre.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getName()));
        columnaFecha.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getDate().toString()));
        columnaUbicacion.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getLocation()));
        columnaPrecio.setCellValueFactory(cellData -> new SimpleDoubleProperty(cellData.getValue().getEntry_fee()).asObject());
        columnaPlazas.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getAvailable_slots()).asObject());
        columnaEstado.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getStatus()));
        columnaCategoria.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getCategory()));

        // Asociar los datos al TableView
        tableView.setItems(listaDeCarreras);

        // Escuchar cambios en la selección de la tabla
        tableView.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                mostrarDetalles(newValue);
            }
        });
    }

    // Mostrar los detalles del Trailrunning seleccionado
    private void mostrarDetalles(Trailrunning carrera) {
        labelDescripcion.setText(carrera.getDescription());
        labelDistancia.setText(String.valueOf(carrera.getDistance_km()) + " km");
        labelCoordenadas.setText(carrera.getCoordinates());
        labelTiempo.setText(carrera.getDate().toString());
        labelImagen.setText(carrera.getImage());

        // Cargar la imagen
        try {
            Image image = new Image("file:" + carrera.getImage());  // Aquí carga la imagen desde la ruta especificada
            imageView.setImage(image);
        } catch (Exception e) {
            imageView.setImage(null);  // Si no se puede cargar la imagen, dejar la imagen en blanco
        }
    }

    @FXML
    private void inscribirse() {
        // Lógica para inscribirse en la carrera
        Trailrunning selectedCarrera = tableView.getSelectionModel().getSelectedItem();
        if (selectedCarrera != null) {
            // Aquí puedes agregar la lógica de inscripción, por ejemplo, disminuir las plazas disponibles
            System.out.println("Inscrito en: " + selectedCarrera.getName());
        } else {
            System.out.println("Selecciona una carrera para inscribirte.");
        }
    }
}