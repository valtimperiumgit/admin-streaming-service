import { useEffect, useState } from "react";
import IMovie from "../../../entities/movie";
import { AppDispatch } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { onGetMovies, setCurrentMovie, sliceGetMovies } from "../../../redux/slices/movies-slice";
import { sliceMedia } from "../../../redux/slices/media-slice";
import getCountryName from "../../../utilities/country-helper";
import MovieDetails from "../movie-details/MovieDetails";
import "../movies-list/MoviesList.css"
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import ITvShow from '../../../entities/tv-show';
import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from "@table-library/react-table-library/pagination";

export const MoviesList = () => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(()=>{
    dispatch(onGetMovies());
  }, []);

  var media = useSelector(sliceMedia);
  let movies = useSelector(sliceGetMovies);

  const ViewModes = {
    LIST: 'list',
    DETAILS: 'details'
  };

  const [currentView, setCurrentView] = useState(ViewModes.LIST);
  const [movieDetails, setMovieDetails] = useState<IMovie>(movies[0]);

  const paginationData = {
    nodes: movies || []
  };

  const onPaginationChange = (action: any, state: any) => {
  };

  const pagination = usePagination<IMovie>(paginationData, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  const onMovieDetails = (movieId: string) => {
    var selectedMovie = movies.filter((movie)=> movie.id === movieId)[0];
    dispatch(setCurrentMovie(selectedMovie));
    setMovieDetails(selectedMovie);
    setCurrentView(ViewModes.DETAILS);
  };

  const theme = useTheme(getTheme());

  const COLUMNS = [
    { label: 'Title', renderCell: (item: IMovie) => item.title },
    { label: 'Maturity Rating', renderCell: (item: IMovie) => item.maturityRating },
    {
      label: 'Release Date', 
      renderCell: (item: ITvShow) => {
        const date = new Date(item.releaseDate);
        return date.toLocaleDateString();
      }
    },
    { label: 'Country', renderCell: (item: IMovie) => getCountryName(item.countryId, media.countries) },
    { label: 'Details', renderCell: (item: IMovie) => <div style={{cursor: "pointer"}} onClick={() => {onMovieDetails(item.id)}}> Details </div> }
  ];

    return (
<div>
    {currentView === ViewModes.LIST &&
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

      <MovieDetails movie={movieDetails}/>
    }
  </div>
    );
  }

export default MoviesList;