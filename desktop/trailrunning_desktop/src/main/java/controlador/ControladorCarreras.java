package controlador;

import funciones.Funciones;
import funciones.Session;
import java.io.File;
import java.io.IOException;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;
import modelo.API.TrailrunningRepository;
import modelo.Trailrunning;

public class ControladorCarreras {
    
    
    // *** UI ***
    // Tabla
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
    
    private ObservableList<Trailrunning> listaDeCarreras;
    
    private ObservableList<Trailrunning> listaFiltrada;
    
    // Labels
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
    private Label lblPruebaUsuario;
    
    // Imágenes
//    @FXML
//    private ImageView imageView;
    @FXML
    private ImageView imagenLogin;
    
    @FXML
    private ImageView imagenCarrera;

    // Filtrado
    @FXML
    private ComboBox<String> comboFiltro;
    @FXML
    private Button btnLimpiar;
    @FXML
    private Button btnFiltrar;
    
    // Botón inscribirse
    @FXML
    private Button btnInscribirse;

    @FXML
    public void initialize() {
        inicializarImagen(); // TODO: no funciona por ahora
        inicializarLista(); // TODO: va a dar problemas porque estos datos no están enlazados ocn los del repository
        inicializarTableView();
        inicializarComboBox();
        inicializarBotones();
        
        if(Session.hayUsuario()){
            lblPruebaUsuario.setText("Hay usuario logueado");
            lblPruebaUsuario.setStyle("-fx-text-fill: green;");
        }else{
            lblPruebaUsuario.setText("No hay usuario logueado");
            lblPruebaUsuario.setStyle("-fx-text-fill: red;");
        }
        
    }
    
    void inicializarImagen(){ // TODO: not working
        //findsFile("images/circle-user.png");
        //Image image = new Image(getClass().getClassLoader().getResource("/images/circle-user.png").toExternalForm());
        //this.imagenLogin.setImage(image);
    }
    
    void findsFile(String s){
        String url = getClass().getClassLoader().getResource(s).toExternalForm();
        //String url = "D:/DAM/3.2%20Proyecto%20integrado/Proyecto%20DAM-DAW/trailrunning/desktop/trailrunning_desktop/build/resources/main/images/circle-user.png";
        System.out.println("URL is: " + url);
        File file = new File(url);
        if(file.exists()){
            System.out.println("File was found!!");
        }else{
            System.out.println("File was NOT found");
        }
    }
    
    void inicializarLista(){
        /*
        // Crear algunos datos de ejemplo
        listaDeCarreras = FXCollections.observableArrayList(
            new Trailrunning(1, "Maratón de Montaña", "Carrera exigente en la sierra", java.time.LocalDate.now(), 42.0, "Sierra Nevada", "37.0987,-3.3976", 500, 50.0, 200, "Abierta", "Maratón", "maraton_montana.jpg"),
            new Trailrunning(2, "Ultra Trail Pirineos", "Recorrido extremo en alta montaña", java.time.LocalDate.now(), 100.0, "Pirineos", "42.5833,1.6667", 300, 100.0, 150, "Cerrada", "Ultra Trail", "ultra_pirineos.jpg"),
            new Trailrunning(3, "Carrera Nocturna", "Trail running en plena noche", java.time.LocalDate.now(), 15.0, "Bosque Encantado", "40.4165,-3.7038", 200, 30.0, 90, "Abierta", "Trail Nocturno", "carrera_nocturna.jpg"),
            new Trailrunning(4, "Desafío del Desierto", "Ruta exigente en dunas", java.time.LocalDate.now(), 30.0, "Desierto del Sahara", "23.4162,25.6628", 250, 40.0, 120, "Completada", "Trail Desértico", "desafio_desierto.jpg"),
            new Trailrunning(5, "Sendero del Lobo", "Carrera por senderos de bosque", java.time.LocalDate.now(), 20.0, "Montes de León", "42.5987,-6.4157", 180, 25.0, 80, "Abierta", "Carrera de Senderos", "sendero_lobo.jpg"),
            new Trailrunning(6, "Costa Run", "Ruta costera con vistas impresionantes", java.time.LocalDate.now(), 25.0, "Costa Brava", "41.8122,3.0649", 300, 35.0, 130, "Cerrada", "Trail Costero", "costa_run.jpg"),
            new Trailrunning(7, "Desafío Volcánico", "Carrera en terreno volcánico", java.time.LocalDate.now(), 12.0, "Lanzarote", "29.0469,-13.5899", 150, 20.0, 70, "Abierta", "Trail Volcánico", "desafio_volcanico.jpg"),
            new Trailrunning(8, "Glacier Trail", "Carrera extrema en glaciares", java.time.LocalDate.now(), 50.0, "Alpes Suizos", "46.8182,8.2275", 250, 75.0, 100, "Completada", "Glacier Trail", "glacier_trail.jpg"),
            new Trailrunning(9, "Reto de la Selva", "Recorrido selvático con clima húmedo", java.time.LocalDate.now(), 18.0, "Amazonas", "-3.4653,-62.2159", 220, 30.0, 95, "Abierta", "Trail Selvático", "reto_selva.jpg"),
            new Trailrunning(10, "Endurance Challenge", "Ultra resistencia en montaña", java.time.LocalDate.now(), 80.0, "Andes", "-33.4372,-70.6506", 350, 90.0, 160, "Cerrada", "Ultra Endurance", "endurance_challenge.jpg"),
            new Trailrunning(11, "Río Salvaje", "Carrera junto a ríos y cascadas", java.time.LocalDate.now(), 22.0, "Patagonia", "-49.3315,-72.8866", 200, 28.0, 85, "Completada", "Trail Fluvial", "rio_salvaje.jpg"),
            new Trailrunning(12, "Ruta del Hielo", "Recorrido con bajas temperaturas", java.time.LocalDate.now(), 35.0, "Groenlandia", "72.0000,-40.0000", 180, 45.0, 90, "Abierta", "Trail Gélido", "ruta_hielo.jpg"),
            new Trailrunning(13, "Pico Extremo", "Carrera hasta la cumbre", java.time.LocalDate.now(), 10.0, "Picos de Europa", "43.1876,-4.8555", 170, 22.0, 75, "Cerrada", "Ascenso a la Cumbre", "pico_extremo.jpg"),
            new Trailrunning(14, "Montaña Rápida", "Carrera corta pero intensa", java.time.LocalDate.now(), 8.0, "Montañas Rocosas", "39.5501,-105.7821", 130, 18.0, 60, "Abierta", "Trail Sprint", "montana_rapida.jpg"),
            new Trailrunning(15, "Lluvia y Barro", "Ruta con terrenos fangosos", java.time.LocalDate.now(), 16.0, "Galicia", "42.5751,-8.1339", 210, 27.0, 100, "Completada", "Mud Run", "lluvia_barro.jpg"),
            new Trailrunning(16, "Aventura Alpina", "Carrera con grandes desniveles", java.time.LocalDate.now(), 28.0, "Dolomitas", "46.4102,11.8440", 250, 50.0, 110, "Abierta", "Alpine Trail", "aventura_alpina.jpg"),
            new Trailrunning(17, "Bosque Profundo", "Trail entre árboles milenarios", java.time.LocalDate.now(), 14.0, "Selva Negra", "48.0329,8.2042", 160, 25.0, 85, "Cerrada", "Forest Trail", "bosque_profundo.jpg"),
            new Trailrunning(18, "La Gran Duna", "Recorrido por dunas de arena", java.time.LocalDate.now(), 21.0, "Namibia", "-24.7000,15.2833", 200, 32.0, 105, "Completada", "Dune Run", "gran_duna.jpg"),
            new Trailrunning(19, "Reto Urbano", "Carrera mixta entre ciudad y montaña", java.time.LocalDate.now(), 12.0, "Barcelona", "41.3851,2.1734", 190, 26.0, 95, "Abierta", "Urban Trail", "reto_urbano.jpg"),
            new Trailrunning(20, "Cañón Extremo", "Ruta espectacular entre cañones", java.time.LocalDate.now(), 40.0, "Gran Cañón", "36.1070,-112.1130", 300, 60.0, 140, "Cerrada", "Canyon Trail", "canon_extremo.jpg")
        );*/
        
        listaDeCarreras = FXCollections.observableArrayList(
                TrailrunningRepository.leerTodasLasCarreras()
        );
        
        listaFiltrada = FXCollections.observableArrayList(listaDeCarreras);
    }
    
    void inicializarTableView(){
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
                
                // Lógica del botón de inscribirse
                logicaBtnInscribirse(newValue);
                
            }
        });
    }
    
    void logicaBtnInscribirse(Trailrunning carreraSeleccionada){
        // Si no hay usuario, el botón siempre estará desactivado
        if(!Session.hayUsuario()) return;
        btnInscribirse.setDisable(false);
        
        // El valor dependerá de si el usuario está inscrito o no en la carrera
        boolean estaInscrito = TrailrunningRepository
                .estaInscrito(
                        Session.getInstance().getUsuario(), 
                        carreraSeleccionada
                );
        
        if(!estaInscrito)
            btnInscribirse.setText("Inscribirse");
        else
            btnInscribirse.setText("Desinscribirse");
        
        System.out.println("Esta es la carrera seleccionada: " + carreraSeleccionada);
    }
    
    void inicializarComboBox(){
        // Configurar las opciones del ComboBox
        comboFiltro.getItems().addAll(
            "Filtrar por estado: Abierta",
            "Filtrar por precio < 50",
            "Filtrar por plazas > 100",
            "Filtrar por estado: Cerrada",
            "Filtrar por categoría: Maratón",
            "Filtrar por distancia > 20 km"
        );
        comboFiltro.setValue(""); // Establecer valor inicial
    }
    
    void inicializarBotones(){
        btnInscribirse.setDisable(true);
        btnInscribirse.setOnAction(event -> {
            if(btnInscribirse.getText().equals("Inscribirse")){
                TrailrunningRepository
                        .crearParticipante(
                                Session.getInstance().getUsuario(), 
                                tableView.getSelectionModel().getSelectedItem()
                        );
                btnInscribirse.setText("Desinscribirse");
            }else{
                Trailrunning carrera = tableView.getSelectionModel().getSelectedItem();
                boolean resultado = TrailrunningRepository.borrarParticipante(
                        Session.getInstance().getUsuario(), 
                        carrera
                );
                if(resultado)
                    btnInscribirse.setText("Inscribirse");
            }
        });
        
        // Establecer el comportamiento del botón de filtrar
        btnFiltrar.setOnAction(event -> filtrarCarreras());
        
        // Establecer el comportamiento del botón de limpiar
        btnLimpiar.setOnAction(event -> limpiarFiltro());
    }

    @FXML
    public void filtrarCarreras() {
        String filtroSeleccionado = comboFiltro.getValue();
        ObservableList<Trailrunning> carrerasFiltradas = FXCollections.observableArrayList();

        // Filtrar según la categoría seleccionada en el ComboBox
        if (filtroSeleccionado != null) {
            for (Trailrunning carrera : listaDeCarreras) {
                switch (filtroSeleccionado) {
                    case "Filtrar por estado: Abierta":
                        if (carrera.getStatus().equalsIgnoreCase("Abierta")) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                    case "Filtrar por precio < 50":
                        if (carrera.getEntry_fee() < 50) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                    case "Filtrar por plazas > 100":
                        if (carrera.getAvailable_slots() > 100) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                    case "Filtrar por estado: Cerrada":
                        if (carrera.getStatus().equalsIgnoreCase("Cerrada")) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                    case "Filtrar por categoría: Maratón":
                        if (carrera.getCategory().equalsIgnoreCase("Maratón")) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                    case "Filtrar por distancia > 20 km":
                        if (carrera.getDistance_km() > 20) {
                            carrerasFiltradas.add(carrera);
                        }
                        break;
                }
            }
        }
        // Actualizar la lista filtrada y la vista de la tabla
        listaFiltrada.setAll(carrerasFiltradas);
        tableView.setItems(listaFiltrada);
    }

    @FXML
    public void limpiarFiltro() {
        // Restablecer la lista a la original
        listaFiltrada.setAll(listaDeCarreras);
        tableView.setItems(listaFiltrada);
        comboFiltro.getSelectionModel().clearSelection();  // Limpiar la selección del ComboBox
    }

    // Mostrar los detalles del Trailrunning seleccionado
    private void mostrarDetalles(Trailrunning carrera) {
        labelDescripcion.setText(carrera.getDescription());
        labelDistancia.setText(String.valueOf(carrera.getDistance_km()) + " km");
        labelCoordenadas.setText(carrera.getCoordinates());
        labelTiempo.setText(carrera.getDate().toString());
        // labelImagen.setText(carrera.getImage());

        /*
        // Cargar la imagen
        try {
            Image image = new Image("file:" + carrera.getImage());  // Aquí carga la imagen desde la ruta especificada
            imageView.setImage(image);
        } catch (Exception e) {
            imageView.setImage(null);  // Si no se puede cargar la imagen, dejar la imagen en blanco
        }*/
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

    @FXML
    public void cambiarAVentanaLogin() {
        if(!Session.hayUsuario())
            Funciones.mostrarVentanaYCerrarEsta("LogIn", "Iniciar sesión", tableView);
        else{
            Funciones.mostrarVentanaYCerrarEsta("PerfilUsuario", "Mis carreras", tableView);
            //Funciones.mostrarVentana("PerfilUsuario", "Mis carreras");
        }
            
        //cambiarEscena("/vista/LogIn.fxml");
    }

    private void cambiarEscena(String rutaFXML) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource(rutaFXML));
            Parent root = loader.load();
            Stage stage = (Stage) imagenLogin.getScene().getWindow();
            stage.setScene(new Scene(root));
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}