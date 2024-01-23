import { MouseEventHandler } from "react";
import IEpisode from "../../../../entities/episode";
import "../episode/Episode.css"
import { useFormik } from "formik";
import IEditEpisodeRequest from "../../../../api/requests/tv-show/edit-episode-request";
import { deleteEpisode, editEpisode } from "../../../../api/services/episodes-service";
import { deleteCurrentEpisode, editCurrentEpisode } from "../../../../redux/slices/tv-shows-slice";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";

interface IEpisodeFieldProps{
    episode: IEpisode | undefined;
    close: Function;
}

function Episode(props: IEpisodeFieldProps) {

  const dispatch: AppDispatch = useDispatch();

  const editEpisodeFormik = useFormik<IEditEpisodeRequest>({
    initialValues: {
      episodeId: props.episode?.id,
      title: props.episode?.title,
      number: props.episode?.number,
    },

    onSubmit: values => {
      editEpisode(values).then((res) => { dispatch(editCurrentEpisode(res.data)) });
  },
  });

  const onDeleteEpisode = () =>{
    deleteEpisode(props.episode?.id).then((res) => { dispatch(deleteCurrentEpisode(props.episode?.id)) });
  }

    return (  
      <div>
        {props.episode != undefined && 
          <div className="episode-modal-overlay">
            <div className="episode-modal">

              <form className="episod-modal-edit-form" onSubmit={editEpisodeFormik.handleSubmit}>
              <input name="id" readOnly={true} value={editEpisodeFormik.values.episodeId} />
              <input id="title" name="title" placeholder="Title" value={editEpisodeFormik.values.title} onChange={editEpisodeFormik.handleChange} />
              <input id="number" name="number" placeholder="Number" type="number" onChange={editEpisodeFormik.handleChange} value={editEpisodeFormik.values.number} />

              <div>
                <button className="edit-episode-modal-button"> Edit </button>
                <button className="delete-episode-modal-button" type="button" onClick={(e) => {onDeleteEpisode(); props.close()}}> Delete </button>
              </div>
              </form>
              <div onClick={() => {props.close()}} className='close-create-episode-modal'>✖</div>
            </div>
          </div>
       }
      </div>
    );
  }
  
  export default Episode;
