import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Lista({ canciones, eliminarCancion, editarCancion }) {
  const [busqueda, setBusqueda] = useState('');

  const resultados = canciones.filter((cancion) =>
    cancion.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    cancion.artista.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = (id) => {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta canción?');
    if (confirmar) {
      eliminarCancion(id);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Lista de Canciones</h2>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-4"
        placeholder="Buscar por título o artista"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {resultados.map((cancion) => (
          <div key={cancion.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="text-white">
              <h5 className="text-xl font-bold mb-2">{cancion.titulo}</h5>
              <p className="text-gray-400 mb-2">Artista: {cancion.artista}</p>
              <p className="text-gray-400 mb-2">Álbum: {cancion.album}</p>
              <p className="text-gray-400 mb-2">Género: {cancion.genero}</p>
              <p className="text-gray-400 mb-2">Año: {cancion.año}</p>
              <p className="text-gray-400 mb-4">Duración: {cancion.duracion} Minutos</p>
              <div className="flex justify-between">
                <button className="bg-yellow-500 hover:bg-blue-600 text-white py-1 px-3 rounded" onClick={() => editarCancion(cancion)}>
                  <FaEdit /> Editar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" onClick={() => handleEliminar(cancion.id)}>
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lista;