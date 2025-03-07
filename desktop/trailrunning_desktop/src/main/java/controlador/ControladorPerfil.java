package controlador;

import funciones.Funciones;
import funciones.Session;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import modelo.API.TrailrunningRepository;
import modelo.Participant;
import modelo.Trailrunning;
import modelo.User;

public class ControladorPerfil implements Initializable {
    
    // UI ***
    // Tabla
    @FXML
    private TableView<Trailrunning> tableView;
    
    @FXML
    private TableColumn<Trailrunning, String> colCategoria;

    @FXML
    private TableColumn<Trailrunning, LocalDate> colFecha;

    @FXML
    private TableColumn<Trailrunning, String> colLugar;

    @FXML
    private TableColumn<Trailrunning, String> colNombre;
    
    // Botones
    @FXML
    private Button btnCerrarSesion;

    @FXML
    private Button btnPaginaPrincipal;
    
    @FXML
    private Button btnDesinscribirse;
    
    // Labels
    @FXML
    private Label lblDorsal;

    @FXML
    private Label lblFechaInscripcion;
    
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        inicializarTabla();
        inicializarEventos();
        
        btnDesinscribirse.setDisable(true);
    }
    
    private void inicializarTabla() {
        
        //ArrayList<Trailrunning> carreras = TrailrunningRepository.leerTodasLasCarreras();
        
        
        colNombre.setCellValueFactory(new PropertyValueFactory<>("name"));
        colLugar.setCellValueFactory(new PropertyValueFactory<>("location"));
        colFecha.setCellValueFactory(new PropertyValueFactory<>("date"));
        colCategoria.setCellValueFactory(new PropertyValueFactory<>("category"));

        // Opcional: Agregar datos de prueba
        actualizarTableView();
        
    }
    
    void actualizarTableView(){
        ArrayList<Trailrunning> carreras = TrailrunningRepository
                .leerCarrerasDeUsuario(Session.getInstance().getUsuario());
        tableView.getItems().clear();
        tableView.setItems(FXCollections.observableArrayList(carreras));
    }
    
    private void inicializarEventos(){
        inicializarEventosBotones();
        inicializarEventosTableView();
    }
    
    private void inicializarEventosBotones(){
        btnPaginaPrincipal.setOnAction(event -> {
            Funciones.cerrarStageDelNodo(btnPaginaPrincipal);
            Funciones.mostrarVentana("VentanaPrincipal", "Trailrunning");
        });
        btnCerrarSesion.setOnAction(event -> {
            // TODO: volver a página principal y cerrar la sesión del singleton
            Session.logOut();
            Funciones.cerrarStageDelNodo(btnCerrarSesion);
            Funciones.mostrarVentana("VentanaPrincipal", "Todas las carreras");
        });
    }
    
    private void inicializarEventosTableView(){
        
        tableView.setOnMouseClicked(event -> {
            Trailrunning carrera = tableView.getSelectionModel().getSelectedItem();
            if(carrera != null){
                mostrarDatosParticipacion(carrera);
                
                setBtnDesinscribirse(carrera);
            }else{
                btnDesinscribirse.setDisable(true);
                btnDesinscribirse.setOnAction(event2 -> {});
            }
        });
        
    }
    
    void mostrarDatosParticipacion(Trailrunning carrera){
        User user = Session.getInstance().getUsuario();
        Participant participante = TrailrunningRepository.leerParticipante(user, carrera);
        lblDorsal.setText(participante.getDorsal() + "");
        lblFechaInscripcion.setText(participante.getTime().toString());
    }
    
    void setBtnDesinscribirse(Trailrunning carrera){
        btnDesinscribirse.setDisable(false);
        btnDesinscribirse.setOnAction(event -> {
            TrailrunningRepository.borrarParticipante(
                    Session.getInstance().getUsuario(),
                    carrera
            );
            btnDesinscribirse.setDisable(true);
            actualizarTableView();
        });
    }
    
}
