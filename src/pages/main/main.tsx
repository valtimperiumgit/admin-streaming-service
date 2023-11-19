import { SidePanel } from "../../components/side-panel/side-panel";
import Movies from "../../components/movies/movies";
import TVShows from "../../components/tv-shows/tv-shows";

function Main() {

    const menuItems = [
      { id: 1, src: '/icons/film-reel (2).png', component: <Movies />, isSelected: false },
      { id: 2, src: '/icons/tv-show.png', component: <TVShows />, isSelected: false },
    ];

    return (
      <div className="Main">
        <SidePanel items={menuItems} />
      </div>
    );
  }
  
  export default Main;