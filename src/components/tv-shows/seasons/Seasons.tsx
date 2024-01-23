import SeasonField from "./SeasonField";
import "../seasons/Seasons.css"
import { useEffect, useState } from "react";
import ISeason from "../../../entities/season";
import { createSeason, getSeasons } from "../../../api/services/seasons-service";
import { useFormik } from "formik";
import ICreateSeasonRequest from "../../../api/requests/tv-show/create-season-request";
import Season from "./season/Season";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { addCurrentSeason, setCurrentSeasons, sliceGetTvShows } from "../../../redux/slices/tv-shows-slice";
import { useSelector } from "react-redux";

interface ISeasonsProps{
  tvShowId: string;
}

function Seasons(props: ISeasonsProps) {

  const dispatch: AppDispatch = useDispatch();

  let seasons = useSelector(sliceGetTvShows).currentSeasons;

  useEffect(()=>{
    getSeasons(props.tvShowId).then((res) => dispatch(setCurrentSeasons(res)));
  },[]);

  dispatch(setCurrentSeasons(seasons));

  const renderSeasons = (seasons: ISeason[]) => {

    const sortedSeasons = [...seasons].sort((a, b) => a.number - b.number);;

    return sortedSeasons.map((season) => (
        <SeasonField season={season} open={ () => { openSeasonModal(season) } } />
    ));
  }

  const [isCreateSeasonModalOpen, setCreateSeasonModalOpen] = useState(false);
  const openCreateSeasonModal = () => {setCreateSeasonModalOpen(true); };
  const closeCreateSeasonModal = () => setCreateSeasonModalOpen(false);

  const [isSeasonModalOpen, setSeasonModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<ISeason>();
  const openSeasonModal=(season: ISeason)=> {  setSeasonModalOpen(true); setSelectedSeason(season);};
  const closeSeasonModal = () => setSeasonModalOpen(false);

  useEffect(() => {
    if (isCreateSeasonModalOpen || isSeasonModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCreateSeasonModalOpen, isSeasonModalOpen]);

  const createSeasonFormik = useFormik<ICreateSeasonRequest>({
    initialValues: {
      tvShowId: props.tvShowId,
      title: "",
      number: 1,
    },

    onSubmit: values => {
     createSeason(values).then((res) => dispatch(addCurrentSeason(res.data)))
     .catch((error) => {});
  },
  });

  return (

    <div className="seasons">

      <div style={{marginBottom: "20px", fontSize: "17px", color: "white"}}> Seasons </div>

      {renderSeasons(seasons)}
      <div onClick={ () => {openCreateSeasonModal()}} className="add-season">
        <div className="add-season-content">
            Add season...
        </div>
      </div>

      {isSeasonModalOpen && <Season season={selectedSeason} close={closeSeasonModal}/>}

      {isCreateSeasonModalOpen && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={createSeasonFormik.handleSubmit}>
            <div className='modal-content'>

            <input id="title" type="text" placeholder='Title' onChange={createSeasonFormik.handleChange} value={createSeasonFormik.values.title}/>
            <input id="number" type="number" placeholder='Number' onChange={createSeasonFormik.handleChange} value={createSeasonFormik.values.number}/>
            <button className='create-season-modal-button'> Create </button>
          
            <div onClick={closeCreateSeasonModal} className='close-create-season-modal'>✖</div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
  
  export default Seasons;