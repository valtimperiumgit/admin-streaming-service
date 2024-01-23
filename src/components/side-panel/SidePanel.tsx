import React, { useEffect, useState } from 'react';
import { SidePanelProps, MenuItem } from './side-panel-types';
import "../side-panel/SidePanel.css";

export const SidePanel: React.FC<SidePanelProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  useEffect(()=>{setSelectedItem(items[0])},[]);

  return (
    <div className="container">

      <div className="menu">
        {items.map(item => (
          <div className={item.id === selectedItem?.id ? "selected-menu-item" : "menu-item"} key={item.id} onClick={() => setSelectedItem(item)}>
              <img src={item.src} width={30} height={30}/>
          </div>
        ))}
      </div>

      <div className="content">
        {selectedItem && selectedItem.component}
      </div>
      
    </div>
  );
}