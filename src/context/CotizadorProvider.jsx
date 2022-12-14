import { createContext, useState } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);


  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    if(error.length !== 0) {
    //Una base
    let resultado = 2000;

    //Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    //Hay que restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;

    //Americano 15%
    //Europe 30%
    //Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    //Basico 20%
    //Completo 50%
    resultado *= calcularPlan(datos.plan);

    //Formatear Dinero
    resultado = formatearDinero(resultado);

    console.log(resultado);
    
    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false)
    }, 3000);
  };
  return
  }

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
