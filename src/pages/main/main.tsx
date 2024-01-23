import { SidePanel } from "../../components/side-panel/SidePanel";
import Movies from "../../components/movies/Movies";
import TVShows from "../../components/tv-shows/TvShows";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { onGetActors, onGetCountries, onGetCreators, onGetGenres } from "../../redux/slices/media-slice";
import { useDispatch } from "react-redux";

function Main() {


  const dispatch: AppDispatch = useDispatch();
  
    const menuItems = [
      { id: 2, src: '/icons/tv-show.png', component: <TVShows />, isSelected: false },
      { id: 1, src: '/icons/film-reel (2).png', component: <Movies />, isSelected: false },
    ];

    useEffect(() => {
      dispatch(onGetCountries());
      dispatch(onGetActors());
      dispatch(onGetGenres());
      dispatch(onGetCreators());
    }, [])

    return (
      <div className="Main" style={{height: "100%"}}>
        <SidePanel items={menuItems} />
      </div>
    );
  }
  
  export default Main;