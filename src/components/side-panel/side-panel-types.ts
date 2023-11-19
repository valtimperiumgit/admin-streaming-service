export interface MenuItem {
    id: number;
    src: string;
    component: React.ReactNode;
    isSelected: boolean;
  }
  
export interface SidePanelProps {
    items: MenuItem[];
  }