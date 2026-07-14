import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import List from './components/List.jsx';

function App() {
  // Cargar de LocalStorage [cite: 16]
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('crud_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [editItem, setEditItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState(''); // Estado para la alerta de validación 

  // Guardar en LocalStorage [cite: 16]
  useEffect(() => {
    localStorage.setItem('crud_items', JSON.stringify(items));
  }, [items]);

  // Validación: No permitir vacíos ni solo espacios 
  const saveItem = (text) => {
    if (text.trim() === '') {
      setAlertMessage('No se permiten elementos vacíos ni solo con espacios.'); // Aviso al usuario 
      return;
    }
    setAlertMessage(''); // Limpiar alerta si es válido

    if (editItem) {
      setItems(items.map(item => item.id === editItem.id ? { ...item, text: text.trim() } : item));
      setEditItem(null);
    } else {
      const newItem = {
        id: Date.now(),
        text: text.trim()
      };
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  // Confirmación al eliminar 
  const handleDelete = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este elemento?'); // Confirmación previa 
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
      if (editItem && editItem.id === id) setEditItem(null);
    }
  };

  return (
    <div className="card-container">
      <h1 className="title">Mi CRUD - Fase 2</h1>

      {/* Alerta de validación en pantalla  */}
      {alertMessage && <div className="validation-alert">{alertMessage}</div>}

      <Form onSave={saveItem} editItem={editItem} cancelEdit={() => setEditItem(null)} />

      {/* Contador: Muestra la cantidad total de elementos  */}
      <div className="utility-bar">
        <span className="counter">Total: {items.length}</span>
      </div>

      <List 
        items={items} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;