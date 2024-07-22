import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Lista from './components/Lista';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [canciones, setCanciones] = useState([]);
  const [cancionEditada, setCancionEditada] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('canciones');
    if (datosGuardados) {
      setCanciones(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('canciones', JSON.stringify(canciones));
  }, [canciones]);

  const agregarCancion = (cancion) => {
    if (cancionEditada) {
      setCanciones(canciones.map((c) => (c.id === cancion.id ? cancion : c)));
      setCancionEditada(null);
    } else {
      setCanciones([...canciones, cancion]);
    }
  };

  const eliminarCancion = (id) => {
    setCanciones(canciones.filter((cancion) => cancion.id !== id));
  };

  const editarCancion = (cancion) => {
    setCancionEditada(cancion);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto my-4 p-4">
        <Formulario agregarCancion={agregarCancion} cancionEditada={cancionEditada} />
        <Lista canciones={canciones} eliminarCancion={eliminarCancion} editarCancion={editarCancion} />
      </main>
      <Footer />
    </div>
  );
}

export default App;