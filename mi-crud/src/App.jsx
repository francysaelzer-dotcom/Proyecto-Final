import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import List from './components/List.jsx';

function App() {
  // Inicialización de LocalStorage (Persistencia requerida por la pauta)
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('crud_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Guardar en LocalStorage automáticamente ante cualquier cambio
  useEffect(() => {
    localStorage.setItem('crud_items', JSON.stringify(items));
  }, [items]);

  // LA FUNCIÓN QUE FALTABA: saveItem
  const saveItem = (text) => {
    if (text.trim() === '') {
      setAlertMessage('No se permiten elementos vacíos ni solo con espacios.');
      return;
    }
    setAlertMessage('');

    if (editItem) {
      // Actualizar elemento existente en edición
      setItems(items.map(item => item.id === editItem.id ? { ...item, text: text.trim() } : item));
      setEditItem(null);
    } else {
      // Crear nuevo elemento
      const newItem = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      };
      setItems([...items, newItem]);
    }
  };

  // Manejar edición de elemento
  const handleEdit = (item) => {
    setEditItem(item);
  };

  // Eliminar elemento con confirmación (Commit 2)
  const handleDelete = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este elemento?');
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
      if (editItem && editItem.id === id) setEditItem(null);
    }
  };

  // Marcar como completado/tachado (Commit 3)
  const handleToggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // Borrar todos los elementos de una vez (Commit 3)
  const handleClearAll = () => {
    const confirmar = window.confirm('¿Estás seguro de que quieres borrar todos los elementos?');
    if (confirmar) {
      setItems([]);
      setEditItem(null);
      setAlertMessage('');
    }
  };

  // Filtrado dinámico en tiempo real para el buscador (Commit 3)
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card-container">
      <h1 className="title">Mi CRUD Interactiva</h1>

      {alertMessage && <div className="validation-alert">{alertMessage}</div>}

      {/* Aquí pasamos saveItem como prop "onSave" hacia el Formulario */}
      <Form onSave={saveItem} editItem={editItem} cancelEdit={() => setEditItem(null)} />

      {/* Utilidades de búsqueda, contador y borrado global */}
      <div className="utility-bar">
        <input 
          type="text" 
          className="input-search"
          placeholder="Buscar elemento..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counter">Total: {items.length}</span>
        
        {items.length > 0 && (
          <button className="btn-danger-all" onClick={handleClearAll}>Borrar todo</button>
        )}
      </div>

      <List 
        items={filteredItems} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onToggle={handleToggleComplete}
      />
    </div>
  );
}

export default App;