import React from 'react';
import Item from './Item.jsx';

function List({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p style={{ textAlign: 'center', color: '#a0aec0' }}>No hay elementos en la lista.</p>;
  }

  return (
    <ul className="list-container">
      {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}

export default List;