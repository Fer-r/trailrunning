package controlador;

import funciones.Funciones;
import funciones.Session;
import java.io.File;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.shape.Circle;
import modelo.API.TrailrunningRepository;
import modelo.Trailrunning;

public class ControladorCarreras {
    
    // *** UI ***
    // Tabla
    @FXML
    private TableView<Trailrunning> tableView;
    @FXML
    private TableColumn<Trailrunning, Integer> columnaID;//
    @FXML
    private TableColumn<Trailrunning, String> columnaNombre;//
    //@FXML
    //private TableColumn<Trailrunning, String> columnaFecha;
    @FXML
    private TableColumn<Trailrunning, String> columnaUbicacion;//
    /*
    @FXML
    private TableColumn<Trailrunning, Double> columnaPrecio;
    @FXML
    private TableColumn<Trailrunning, Integer> columnaPlazas;*/
    @FXML
    private TableColumn<Trailrunning, String> columnaEstado;//
    @FXML
    private TableColumn<Trailrunning, String> columnaCategoria; //
    
    private ObservableList<Trailrunning> listaDeCarreras;
    
    private ObservableList<Trailrunning> listaFiltrada;
    
    // Labels
    //@FXML
    //private Label labelCoordenadas;

    @FXML
    private Label labelDescripcion;

    @FXML
    private Label labelDistancia;

    @FXML
    private Label labelTiempo;

    @FXML
    private Label lblFecha;

    @FXML
    private Label lblPlazas;

    @FXML
    private Label lblPrecio;

    //@FXML
    //private Label lblPruebaUsuario;
    
    // Imágenes
//    @FXML
//    private ImageView imageView;
    @FXML
    private ImageView imagenLogin;
    
    @FXML
    private ImageView imagenCarrera;

    // Filtrado
    @FXML
    private TextField edtFiltrado;
    
    @FXML
    private ComboBox<String> comboFiltro;
    
    // Botón inscribirse
    @FXML
    private Button btnInscribirse;
    
    @FXML
    private Button btnIniciarSesion;

    @FXML
    public void initialize() {
        inicializarImagenPorDefecto();
        inicializarTableView();
        inicializarEdtFiltrado();
        inicializarComboBox();
        inicializarBotones();
        logicaUsuarioLogueado(); 
    }
    
    public void inicializarImagenPorDefecto(){
        Image image = new Image(getClass().getResource("../vista/img/logo.png").toExternalForm());
        imagenCarrera.setImage(image);
        Circle clip = new Circle(50, 50, 50);
        imagenCarrera.setClip(clip);
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
    
    // TableView
    void inicializarTableView(){
        inicializarLista();
        // Configuración de las columnas
        columnaID.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getId()).asObject());
        columnaNombre.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getName()));
        //columnaFecha.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getDate().toString()));
        columnaUbicacion.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getLocation()));
        //columnaPrecio.setCellValueFactory(cellData -> new SimpleDoubleProperty(cellData.getValue().getEntry_fee()).asObject());
        //columnaPlazas.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getAvailable_slots()).asObject());
        columnaEstado.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getStatus()));
        columnaCategoria.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getCategory()));
        
        // Asociar los datos al TableView
        tableView.setItems(listaDeCarreras);
        
        // Escuchar cambios en la selección de la tabla
        tableView.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                mostrarDetalles(newValue);
                
                // Lógica del botón de inscribirse
                ajustarBtnInscribirse(newValue);
            }
        });
    }
    
    void inicializarLista(){
        listaDeCarreras = FXCollections.observableArrayList(
                TrailrunningRepository.leerTodasLasCarreras()
        );
        
        listaFiltrada = FXCollections.observableArrayList(listaDeCarreras);
    }
    
    // Filtrado
    void inicializarEdtFiltrado(){
        edtFiltrado.textProperty().addListener((observable, oldValue, newValue) -> {
            comboFiltro.setValue("Ver todas");
            
            if(newValue.isBlank()){
                tableView.setItems(listaDeCarreras);
                return;
            };
            
            ObservableList<Trailrunning> carrerasFiltradas = FXCollections.observableArrayList();
            for(Trailrunning carrera : listaDeCarreras){
                if(carrera.getName().toLowerCase().contains(newValue.toLowerCase()))
                    carrerasFiltradas.add(carrera);
            }
            listaFiltrada.setAll(carrerasFiltradas);
            tableView.setItems(listaFiltrada);
        });
        
    }
    
    void inicializarComboBox(){
        // Configurar las opciones del ComboBox
        comboFiltro.getItems().addAll(
            "Ver todas",
            "Filtrar por estado: Abierta",
            "Filtrar por precio < 50",
            "Filtrar por plazas > 100",
            "Filtrar por estado: Cerrada",
            "Filtrar por categoría: Maratón",
            "Filtrar por distancia > 20 km"
        );
        comboFiltro.setValue("Ver todas"); // Establecer valor inicial
        comboFiltro
                .getSelectionModel()
                .selectedItemProperty()
                .addListener((observable, oldValue, newValue) -> {
            System.out.println("El combobox ha cambiado");
            filtrarCarreras();
        });
    }
    
    public void filtrarCarreras() {
        String filtroSeleccionado = comboFiltro.getValue();
        ObservableList<Trailrunning> carrerasFiltradas = FXCollections.observableArrayList();

        // Filtrar según la categoría seleccionada en el ComboBox
        if (filtroSeleccionado != null) {
            for (Trailrunning carrera : listaDeCarreras) {
                switch (filtroSeleccionado) {
                    case "Ver todas":
                        carrerasFiltradas.add(carrera);
                        break;
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

    // Mostrar los detalles del Trailrunning seleccionado
    private void mostrarDetalles(Trailrunning carrera) {
        
        // cargar la imagen
        Image image = new Image(getClass().getResource("../vista/img/" + carrera.getImage()).toExternalForm());
        imagenCarrera.setImage(image);
        
        labelDescripcion.setText(carrera.getDescription());
        labelDistancia.setText(String.valueOf(carrera.getDistance_km()) + " km");
        //labelCoordenadas.setText(carrera.getCoordinates());
        labelTiempo.setText(carrera.getEntry_fee() + "");
        lblFecha.setText(carrera.getDate().toString());
        lblPrecio.setText(carrera.getEntry_fee() + "");
        lblPlazas.setText(carrera.getAvailable_slots() + "");
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
    
    // Botones
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
    }
    
    void ajustarBtnInscribirse(Trailrunning carreraSeleccionada){
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
    
    void logicaUsuarioLogueado(){
        if(Session.hayUsuario()){
            btnIniciarSesion.setText("Ir a mi perfil");
        }else{
            btnIniciarSesion.setText("Iniciar sesión");
        }
    }

    @FXML
    public void cambiarAVentanaLogin() {
        if(!Session.hayUsuario())
            Funciones.mostrarVentanaYCerrarEsta("LogIn", tableView);
        else{
            Funciones.mostrarVentanaYCerrarEsta("PerfilUsuario", tableView);
        }
    }
    
}