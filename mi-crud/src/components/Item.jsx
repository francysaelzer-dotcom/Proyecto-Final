import React from 'react';

function Item({ item, onEdit, onDelete, onToggle }) {
  return (
    <li className="item-row">
      <span 
        className={`item-text ${item.completed ? 'completed' : ''}`}
        onClick={() => onToggle(item.id)}
        title="Haz clic para marcar como completado"
      >
        {item.text}
      </span>
      <div className="button-group">
        <button className="btn-action btn-edit" onClick={() => onEdit(item)}>
          Editar
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;