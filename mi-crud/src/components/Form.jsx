import React, { useState, useEffect } from 'react';

function Form({ onSave, editItem, cancelEdit }) {
  const [inputValue, setInputValue] = useState('');

  // Carga los datos al input si entra en modo edición
  useEffect(() => {
    if (editItem) {
      setInputValue(editItem.text);
    } else {
      setInputValue('');
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que recargue la página
    onSave(inputValue); // Envía el texto a App.jsx
    setInputValue('');  // Limpia el input
  };

  return (
    <form onSubmit={handleSubmit} className="form-crud">
      <input
        type="text"
        className="input-text"
        placeholder={editItem ? "Modificar elemento..." : "Nuevo elemento..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <button type="submit" className="btn-submit">
        {editItem ? 'Actualizar' : 'Agregar'}
      </button>

      {editItem && (
        <button type="button" className="btn-action btn-delete" onClick={cancelEdit}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default Form;