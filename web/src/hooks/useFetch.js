import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setData(await fetchFunction());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // abortController es un objeto que me permite abortar una peticion fetch
    const abortController = new AbortController();
    // me pongo en modo de carga
    setLoading(true);
    // llamo a la funcion que se le pasa como parametro
    fetchData();
    // limpiamos los errores
    setError(null);
    return () => {
      // cleanup, lo que ejecutemos aqui se ejecutará cuando el componente se desmonte
      abortController.abort();
    };
  }, dependencies);

  return { data, loading, error, setLoading, setError };
};
