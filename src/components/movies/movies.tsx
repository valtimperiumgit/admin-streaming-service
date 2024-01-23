import { useEffect, useState } from "react";
import CreateMovie from "./create-movie/CreateMovie";
import MoviesList from "./movies-list/MoviesList";
import "../movies/Movies.css"

const ViewModes = {
  LIST: 'list',
  CREATE: 'create'
};

function TVShows() {
  const [currentView, setCurrentView] = useState(ViewModes.LIST);

  const handleCreateClick = () => {
    setCurrentView(ViewModes.CREATE);
  };

  const handleMoviesListClick = () => {
    setCurrentView(ViewModes.LIST);
  };

  return (
    <div className="movies">
      <div className='movies-actions'>
        <button className={currentView == ViewModes.LIST? "movies-action-active" : "movies-action"} onClick={handleMoviesListClick}>List</button>
        <button className={currentView == ViewModes.CREATE? "movies-action-active" : "movies-action"} onClick={handleCreateClick}>Create</button>
      </div>

      {currentView === ViewModes.CREATE && <CreateMovie />}
      {currentView === ViewModes.LIST && <MoviesList/>}
    </div>
  );
}

export default TVShows;