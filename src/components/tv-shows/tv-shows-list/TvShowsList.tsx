import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import ITvShow from '../../../entities/tv-show';
import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from "@table-library/react-table-library/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { onGetTvShows, setCurrentTvShow, sliceGetTvShows } from '../../../redux/slices/tv-shows-slice';
import "../tv-shows-list/TvShowsList.css"
import getCountryName from '../../../utilities/country-helper';
import { sliceMedia } from '../../../redux/slices/media-slice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TvShowDetails from '../tv-show-details/TvShowDetails';
import { AppDispatch } from '../../../redux/store';
import Loader from '../../loader/Loader';

function TVShowsList() {
  const dispatch: AppDispatch = useDispatch();
  var tvShows = useSelector(sliceGetTvShows);
  var media = useSelector(sliceMedia);

  const isLoading = tvShows.isLoading;

  const ViewModes = {
    LIST: 'list',
    DETAILS: 'details'
  };

  const [currentView, setCurrentView] = useState(ViewModes.LIST);
  const [tvShowDetails, setTvShowDetails] = useState<ITvShow>(tvShows.tvShows[0]);

  const onPaginationChange = (action: any, state: any) => {
  };

  useEffect(()=>{
    dispatch(onGetTvShows({pageNumber: 1, pageSize: 1000}))
  }, [])

  const paginationData = {
    nodes: tvShows.tvShows || []
  };

  const showTvShowDetails = (tvShowId: string) => {
    var selectedTvShow = tvShows.tvShows.filter((show)=> show.id === tvShowId)[0];
    dispatch(setCurrentTvShow(selectedTvShow));
    setTvShowDetails(selectedTvShow);
    setCurrentView(ViewModes.DETAILS);
  };

  const pagination = usePagination<ITvShow>(paginationData, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'Title', renderCell: (item: ITvShow) => item.title },
    { label: 'Maturity Rating', renderCell: (item: ITvShow) => item.maturityRating },
    {
      label: 'Release Date', 
      renderCell: (item: ITvShow) => {
        const date = new Date(item.releaseDate);
        return date.toLocaleDateString();
      }
    },
    { label: 'Country', renderCell: (item: ITvShow) => getCountryName(item.countryId, media.countries ) },
    { label: 'Details', renderCell: (item: ITvShow) => <div style={{cursor: "pointer"}} onClick={() => {showTvShowDetails(item.id)}}> Details </div> }
  ];

  return <div>

    {isLoading && <Loader />} 
    
    {!isLoading && 
    currentView === ViewModes.LIST &&
    <div className='tv-show-list'>

      <div className='tv-show-list-table'>
        <div className="table-container">
          <CompactTable columns={COLUMNS} data={paginationData} theme={theme} pagination={pagination}/>
        </div>
      </div>

      <div className='pagination-container'>
          <span style={{ color: "#b0b0b0" }}>
            Page:{" "}
            {pagination.state.getPages(paginationData.nodes).map((_ : any, index: number) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? "bold" : "normal",
                }}
                onClick={() => pagination.fns.onSetPage(index)}
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>

    </div>}

    {currentView === ViewModes.DETAILS &&

      <TvShowDetails tvShow={tvShowDetails}/>
    }
  </div>
}

export default TVShowsList;