import { useFormik } from "formik";
import ISeason from "../../../../entities/season";
import "../season/Season.css"
import IEditSeasonRequest from "../../../../api/requests/tv-show/edit-season-request";
import { MouseEventHandler } from "react";
import { deleteSeason, editSeason } from "../../../../api/services/seasons-service";
import { deleteCurrentSeason, editCurrentSeason, sliceGetTvShows } from "../../../../redux/slices/tv-shows-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import Episodes from "../../episodes/Episodes";

interface ISeasonsProps{
  season: ISeason | undefined;
  close: Function;
}

function Season(props: ISeasonsProps) {

  const dispatch: AppDispatch = useDispatch();

  const editSeasonFormik = useFormik<IEditSeasonRequest>({
    initialValues: {
      seasonId: props.season?.id || "",
      title: props.season?.title || "",
      number: props.season?.number || 0,
    },

    onSubmit: values => {
      editSeason(values).then((res) => { dispatch(editCurrentSeason(res.data)) })
  },
  });

  const onDeleteSeason = () => {
    deleteSeason(props.season?.id).then((res) => { dispatch(deleteCurrentSeason(props.season?.id)) });
  }

    return (  
      <div>
        {props.season !== undefined && 
        <div>
            <div className="season-modal-overlay">
              <div className="season-modal">
              <form onSubmit={editSeasonFormik.handleSubmit}>

              <div className='season-modal-edit-form'>
              <input readOnly={true} id="id" type="text" placeholder='Id' onChange={editSeasonFormik.handleChange} value={editSeasonFormik.values.seasonId}/>
              <input id="title" type="text" placeholder='Title' onChange={editSeasonFormik.handleChange} value={editSeasonFormik.values.title}/>
              <input id="number" type="number" placeholder='Number' onChange={editSeasonFormik.handleChange} value={editSeasonFormik.values.number}/>
              <div>
              <button className='create-season-modal-button'> Edit </button>
              <button type="button" onClick={() => {onDeleteSeason(); props.close()}} className='delete-season-modal-button'> Delete </button>
                </div>
              <div onClick={() => {props.close()}} className='close-create-season-modal'>✖</div>
              </div>



              </form>
              <div className="season-modal-episodes">
              <Episodes seasonId={props.season.id} />
          </div>
              </div>

          </div>
        </div>}
      </div>
    );
  }
  
  export default Season;