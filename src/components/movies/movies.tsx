import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { onGetMovies } from "../../redux/slices/movies-slice";
import { useDispatch } from "react-redux";
import { Paper } from "@mui/material";
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import MoviesTable from "./movies-table";

function Movies() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetMovies());
  }, [])

    return (
      <div className="Movies">
        <MoviesTable/>
      </div>
    );
  }
  
  export default Movies;
  