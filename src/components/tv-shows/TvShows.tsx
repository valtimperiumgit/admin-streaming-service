import React, { useEffect, useState } from 'react';
import CreateTvShow from './create-tv-shows/CreateTvShow';
import { AppDispatch } from '../../redux/store';
import { onGetActors, onGetGenres, onGetCreators, onGetCountries } from '../../redux/slices/media-slice';
import { useDispatch } from 'react-redux';
import TVShowsList from './tv-shows-list/TvShowsList';
import "../tv-shows/TvShows.css";
import { onGetTvShows } from '../../redux/slices/tv-shows-slice';

const ViewModes = {
  LIST: 'list',
  CREATE: 'create'
};

function TVShows() {

  const [currentView, setCurrentView] = useState(ViewModes.LIST);

  const handleCreateClick = () => {
    setCurrentView(ViewModes.CREATE);
  };

  const handleTvShowsListClick = () => {
    setCurrentView(ViewModes.LIST);
  };

  return (
    <div className="tvshows">
      <div className='tvshows-actions'>
        <button className={currentView == ViewModes.LIST? "tvshows-action-active" : "tvshows-action"} onClick={handleTvShowsListClick}>List</button>
        <button className={currentView == ViewModes.CREATE? "tvshows-action-active" : "tvshows-action"} onClick={handleCreateClick}>Create</button>
      </div>

      {currentView === ViewModes.CREATE && <CreateTvShow />}
      {currentView === ViewModes.LIST && <TVShowsList/>}
    </div>
  );
}

export default TVShows;