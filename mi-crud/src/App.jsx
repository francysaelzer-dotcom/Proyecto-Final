import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import List from './components/List.jsx';

function App() {
  // Cargar de LocalStorage
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('crud_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [alertMessage, setAlertMessage] = useState('');

  // Guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem('crud_items', JSON.stringify(items));
  }, [items]);

  // Validación al guardar
  const saveItem = (text) => {
    if (text.trim() === '') {
      setAlertMessage('No se permiten elementos vacíos ni solo con espacios.');
      return;
    }
    setAlertMessage('');

    if (editItem) {
      setItems(items.map(item => item.id === editItem.id ? { ...item, text: text.trim() } : item));
      setEditItem(null);
    } else {
      const newItem = {
        id: Date.now(),
        text: text.trim(),
        completed: false // Se inicializa como no completado
      };
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este elemento?');
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
      if (editItem && editItem.id === id) setEditItem(null);
    }
  };

  // Función para alternar el estado completado (tachado)
  const handleToggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // Función para borrar todos los elementos a la vez
  const handleClearAll = () => {
    const confirmar = window.confirm('¿Estás seguro de que quieres borrar todos los elementos?');
    if (confirmar) {
      setItems([]);
      setEditItem(null);
      setAlertMessage('');
    }
  };

  // Filtrado dinámico para la búsqueda en tiempo real
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card-container">
      <h1 className="title">Mi CRUD Interactiva</h1>

      {alertMessage && <div className="validation-alert">{alertMessage}</div>}

      <Form onSave={saveItem} editItem={editItem} cancelEdit={() => setEditItem(null)} />

      {/* Barra de utilidades con buscador y borrado global */}
      <div className="utility-bar">
        <input 
          type="text" 
          className="input-search"
          placeholder="Buscar elemento..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Filtrado interactivo
        />
        <span className="counter">Total: {items.length}</span>
        
        {items.length > 0 && (
          <button className="btn-danger-all" onClick={handleClearAll}>Borrar todo</button> // Botón de vaciado masivo
        )}
      </div>

      <List 
        items={filteredItems} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onToggle={handleToggleComplete} // Pasa la función de tachar
      />
    </div>
  );
}

export default App;