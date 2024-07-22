import React, { useState, useEffect } from 'react';

function Formulario({ agregarCancion, cancionEditada }) {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [genero, setGenero] = useState('');
  const [año, setAño] = useState('');
  const [duracion, setDuracion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (cancionEditada) {
      setTitulo(cancionEditada.titulo);
      setArtista(cancionEditada.artista);
      setAlbum(cancionEditada.album);
      setGenero(cancionEditada.genero);
      setAño(cancionEditada.año);
      setDuracion(cancionEditada.duracion);
    }
  }, [cancionEditada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !artista || !album || !genero || !año || !duracion) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    const nuevaCancion = {
      id: cancionEditada ? cancionEditada.id : Date.now(),
      titulo,
      artista,
      album,
      genero,
      año,
      duracion: parseInt(duracion, 10) // Asegurarse de que sea un entero
    };
    agregarCancion(nuevaCancion);
    setTitulo('');
    setArtista('');
    setAlbum('');
    setGenero('');
    setAño('');
    setDuracion('');
  };

  const generarOpcionesAño = () => {
    const year = new Date().getFullYear();
    let options = [];
    for (let i = year; i >= 1950; i--) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-300">Título</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Artista</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Álbum</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Género</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Año</label>
        <select
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={año}
          onChange={(e) => setAño(e.target.value)}
        >
          <option value="">Selecciona un año</option>
          {generarOpcionesAño()}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Duración (minutos)</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          min="0"
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          {cancionEditada ? 'Guardar Cambios' : 'Agregar Canción'}
        </button>
      </div>
    </form>
  );
}

export default Formulario;