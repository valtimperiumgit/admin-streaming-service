
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import IEpisode from "../../../entities/episode";
import { createEpisode, getEpisodes } from "../../../api/services/episodes-service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { onCreateEpisode, setCurrentEpisodes, sliceGetTvShows } from "../../../redux/slices/tv-shows-slice";
import EpisodeField from "./EpisodeField";
import "../episodes/Episodes.css"
import Episode from "./episode/Episode";
import { FormikHelpers, useFormik } from "formik";
import ICreateEpisodeRequest from "../../../api/requests/tv-show/create-episode-request";
import Loader from "../../loader/Loader";

interface IEpisodesProps{
  seasonId: string;
}

function Episodes(props: IEpisodesProps) {

    const dispatch: AppDispatch = useDispatch();
    let episodes = useSelector(sliceGetTvShows).currentEpisodes;
    let isCreatingEpisodeLoading = useSelector(sliceGetTvShows).isCreatingEpisodeLoading;

    useEffect(()=>{
      getEpisodes(props.seasonId).then((res) => dispatch(setCurrentEpisodes(res)));
    },[]);

    const createEpisodeFormik = useFormik<ICreateEpisodeRequest>({
      initialValues: {
        seasonId: props.seasonId,
        title: "",
        number: 1,
        video: null
      },
  
      onSubmit: values => {
        const formData = new FormData();
        formData.append('seasonId', values.seasonId);
        formData.append('title', values.title);
        formData.append('number', values.number.toString());
        if(values.video) formData.append('video', values.video);

        
     dispatch(onCreateEpisode(formData)).catch((error) => {});
    },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: FormikHelpers<ICreateEpisodeRequest>['setFieldValue']) => {
      if (e.target.files && e.target.files[0]) {
          setFieldValue(e.target.name, e.target.files[0]);
      }
    }

    const [isCreateEpisodeModalOpen, setCreateEpisodeModalOpen] = useState(false);
    const openCreateEpisodeModal = () => {setCreateEpisodeModalOpen(true); };
    const closeCreateEpisodeModal = () => setCreateEpisodeModalOpen(false);

    const [isEpisodeModalOpen, setEpisodeModalOpen] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState<IEpisode>();
    const openEpisodeModal=(episode: IEpisode)=> {  setEpisodeModalOpen(true); setSelectedEpisode(episode);};
    const closeEpisodeModal = () => setEpisodeModalOpen(false);

    const renderEpisodes = (episodes: IEpisode[]) => {
        const sortedSeasons = [...episodes].sort((a, b) => a.number - b.number);;

        return sortedSeasons.map((episode) => (
            <EpisodeField episode={episode} open={ () => { openEpisodeModal(episode) } } />
        ));
    }

    return (  
      <div >



        <div>

          <div className="episodes-title">
          Episodes
          </div>
        {renderEpisodes(episodes)}

        <div onClick={ () => {openCreateEpisodeModal()}} className="add-episode">
        <div className="add-episode-content">
            Add episode...
        </div>
      </div>
        </div>

        {isEpisodeModalOpen && <Episode episode={selectedEpisode} close={closeEpisodeModal}/>}

        {isCreateEpisodeModalOpen && !isCreatingEpisodeLoading && (
        <div className="episode-modal-overlay">
          <form onSubmit={createEpisodeFormik.handleSubmit} className="episode-modal">
            <div className='episode-modal-content'>

            <input id="title" type="text" placeholder='Title' onChange={createEpisodeFormik.handleChange} value={createEpisodeFormik.values.title}/>
            <input id="number" type="number" placeholder='Number' onChange={createEpisodeFormik.handleChange} value={createEpisodeFormik.values.number}/>

            <label htmlFor="video">Video</label>
            <input style={{display: "none"}} ref={fileInputRef} id="video" name="video" type="file" onChange={(e) => handleFileChange(e, createEpisodeFormik.setFieldValue)}/>
            <button type="button" className="download" onClick={()=> {fileInputRef.current?.click()}}>Download</button>

            <button className='create-season-modal-button'> Create </button>
          
            <div onClick={closeCreateEpisodeModal} className='close-create-episode-modal'>✖</div>
            </div>
          </form>
        </div>
      )}

    {isCreateEpisodeModalOpen && isCreatingEpisodeLoading && (
        <div className="episode-modal-overlay">
        <form onSubmit={createEpisodeFormik.handleSubmit} className="episode-modal">
        <Loader />
        </form>
      </div>
      )}
      </div>
    );
  }
  
  export default Episodes;