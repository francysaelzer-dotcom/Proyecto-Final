import React from 'react';

function Item({ item, deleteItem, editItem }) {
  return (
    <li className="item-container">
      
      <span>{item.value}</span>
      
      
      <div className="item-actions">
        <button className="btn-edit" onClick={() => editItem(item)}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;