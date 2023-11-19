import React, { useState } from 'react';
import { SidePanelProps, MenuItem } from './side-panel-types';
import "../side-panel/side-panel.css";

export const SidePanel: React.FC<SidePanelProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="container">

      <div className="menu">
        {items.map(item => (
          <div className='menu-item' key={item.id} onClick={() => setSelectedItem(item)}>
              <img src={item.src} width={50} height={50}/>
          </div>
        ))}
      </div>

      <div className="content">
        {selectedItem && selectedItem.component}
      </div>
      
    </div>
  );
}