package modelo;

public class Libros {

    private final int id;
    private final String titulo;
    private final String autor;
    private final int anyo;
    private final int paginas;

    public Libros(int Id, String Titulo, String Autor, int Anyo, int Paginas){
        this.id = Id;
    	this.titulo=Titulo;
        this.autor = Autor;
        this.anyo=Anyo;
        this.paginas=Paginas;
    }

    public int getId() {
    	return id;
    }
    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public int getAnyo() {
        return anyo;
    }

    public int getPaginas() {
        return paginas;
    }
}
