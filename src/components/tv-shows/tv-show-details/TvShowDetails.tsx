import { useSelector } from 'react-redux';
import "../tv-show-details/TvShowDetails.css"
import { sliceMedia } from '../../../redux/slices/media-slice';
import ITvShow from '../../../entities/tv-show';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import IMedia from '../../../entities/media';
import SelectMedia from '../../select-media/SelectMedia';
import { deleteTvShow, editTvShow, editTvShowFile } from '../../../api/services/tv-show-service';
import Seasons from '../seasons/Seasons';
import { IEditTvShowRequest } from '../../../api/requests/tv-show/edit-tv-show-request';

interface TvShowDetailsProps {
    tvShow: ITvShow
}

function TvShowDetails(props: TvShowDetailsProps) {
  var media = useSelector(sliceMedia);
  var [countries, setCountries] = useState<IMedia[]>([]);

  var [tvShowActors, setTvShowActors] = useState<IMedia[]>([]);
  var [tvShowGenres, setTvShowGenres] = useState<IMedia[]>([]);
  var [tvShowCreators, setTvShowCreators] = useState<IMedia[]>([]);

  var [actorsForRequest, setActorsForRequest] = useState<IMedia[]>([]);
  var [genresForRequest, setGenresForRequest] = useState<IMedia[]>([]);
  var [creatorsForRequest, setCreatorsForRequest] = useState<IMedia[]>([]);

  var [image, setImage] = useState<string>();
  var [logo, setLogo] = useState<string>();
  var [trailer, setTrailer] = useState<string>();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const trailerInputRef = useRef<HTMLInputElement>(null);

  const [isCreateSeasonModalOpen, setCreateSeasonModalOpen] = useState(false);

  const openModal = () => setCreateSeasonModalOpen(true);
  const closeModal = () => setCreateSeasonModalOpen(false);

  useEffect(()=>{
    setTvShowActors(media.actors);
    setTvShowGenres(media.genres);
    setTvShowCreators(media.creators)
    setCountries(media.countries);

    setActorsForRequest(props.tvShow.tvShowActors);
    setGenresForRequest(props.tvShow.tvShowGenres);
    setCreatorsForRequest(props.tvShow.tvShowCreators);

    setImage(props.tvShow.imageUrl);
    setTrailer(props.tvShow.trailerUrl);
    setLogo(props.tvShow.logoUrl);
  }, [])

  function addElement(elementId : string, setElements : Function, elements : IMedia[], allElements : IMedia[]) {
    const elementToAdd = allElements.find(e => e.id === elementId);

    if (elementToAdd) {
        setElements([...elements, elementToAdd]);
    }
  }

  function removeElement(elementId : string, setElements : Function, elements : IMedia[]) {
    setElements(elements.filter(element => element.id !== elementId));
  }

  const formik = useFormik<IEditTvShowRequest>({
    initialValues: {
      id: props.tvShow.id,
      title: props.tvShow.title,
      description: props.tvShow.description,
      maturityRating: props.tvShow.maturityRating,
      releaseDate: props.tvShow.releaseDate,
      genreIds: [],
      actorIds: [],
      creatorIds: [],
      countryId: Number.parseInt(props.tvShow.countryId)
    },

    onSubmit: values => {
      values.actorIds = actorsForRequest.map(actor => actor.id);
      values.genreIds = genresForRequest.map(genre => genre.id);
      values.creatorIds = creatorsForRequest.map(creator => creator.id);

      editTvShow(values)
  },
  });

  const renderSelectedMedia = (media : IMedia[], setter : Function) => {
    return <div style={{display:"flex", gap:'1em', width:'100%', flexWrap:'wrap', marginBottom: "30px"}}>
      {media.map((item : IMedia, index) => (
      <div key={index} style={{display:"flex"}}>
          {item.name}
          <button type="button" className="deleteBtn" style={{width:'1em', height:'1em'}} onClick={() => removeElement(item.id, setter, media)}>✖</button>
      </div>
      ))}
    </div>
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: number) => {
    const formData = new FormData();
    formData.append('tvShowId', props.tvShow.id);
    formData.append('fileType', fileType.toString());

    let target = event.target;
    let files = target.files;

    if(files){
      formData.append('file', files[0]);
    }

    var newUrl = editTvShowFile(formData).then((res)=> {
      if(fileType === 1){
        setImage(res);
      }

      if(fileType === 2){
        setLogo(res);
      }
    });
  }

  const onDeleteTvShow = () => {
    deleteTvShow(props.tvShow.id).then((res) => { window.location.reload()});
  }

  return <div>
    <form className="create-tv-show" onSubmit={formik.handleSubmit}>
          <div style={{width: "300px"}}>

          <label htmlFor="id">Id</label>
          <input id="id" name="id" readOnly={true} value={props.tvShow.id}/>

          <label htmlFor="title">Title</label>
          <input id="title" name="title"  onChange={formik.handleChange} value={formik.values.title}/>

          <label htmlFor="description">Description</label>
          <input id="description" name="description"  onChange={formik.handleChange} value={formik.values.description}/>
         
          <label htmlFor="maturityRating">Maturity Rating</label>
          <input id="maturityRating" name="maturityRating" type="number" onChange={formik.handleChange} value={formik.values.maturityRating}/>
    
          <label htmlFor="releaseDate">Release Date {formik.values.releaseDate.toString()}</label>
          <input id="releaseDate" name="releaseDate" type="date" onChange={formik.handleChange} value={formik.values.releaseDate.toString()}/>
          </div>

          <div style={{width: "300px"}}>

          <div>
          <label htmlFor="genres">Genres</label>
          </div>
          
          <SelectMedia items={tvShowGenres} onChange={e => addElement(e.target.value, setGenresForRequest, genresForRequest, tvShowGenres)} value={'Genres'}/>
          
          <div>
          <label htmlFor="actors">Actors</label>
          </div>
        
          <SelectMedia items={tvShowActors} onChange={e => addElement(e.target.value, setActorsForRequest, actorsForRequest, tvShowActors)} value={'Actors'}/>
          
          <label htmlFor="creators">Creators</label>
          <SelectMedia items={tvShowCreators} onChange={e => addElement(e.target.value, setCreatorsForRequest, creatorsForRequest, tvShowCreators)} value={'Creators'}/>


          <label htmlFor="countryId">Country</label>
          <select onChange={formik.handleChange} id="countryId" name="countryId">
            {countries.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>  
          </div>

        <div style={{height: "100px", width: "600px", paddingTop: "40px", marginLeft: "25px"}}>
        <div style={{ color: "white", marginBottom: "7px", paddingBottom:"3px", borderBottom: "2px solid #1e1f22"}}>
          Genres
        </div>
          {renderSelectedMedia(genresForRequest, setGenresForRequest)}

        <div style={{color: "white", marginBottom: "7px", paddingBottom:"3px", borderBottom: "2px solid #1e1f22"}}>
          Actors
        </div>
          {renderSelectedMedia(actorsForRequest, setActorsForRequest)}

          <div style={{ color: "white", marginBottom: "7px", paddingBottom:"3px", borderBottom: "2px solid #1e1f22"}}>
          Creators
        </div>
          {renderSelectedMedia(creatorsForRequest, setCreatorsForRequest)}
        </div>


        <div className="submit-button-container">
            <button className='edit-tv-show-button'>Edit</button>
            <button className='delete-tv-show-button' onClick={onDeleteTvShow} type="button">Delete</button>
          </div>
    </form>

        <div className='files'>
          <div className='file-container'>
          <div className='file-container-label'>Image</div>
          <img src={image} style={{ objectFit: "cover", width: "230px", height: "230px"}} alt="" />
          <input style={{display: "none"}} ref={imageInputRef} id="image" name="image" type="file" onChange={(e) => handleFileChange(e, 1)}/>
          <button onClick={()=> {imageInputRef.current?.click()}}>Download</button>
          </div>

          <div className='file-container'>
          <div className='file-container-label'>Logo</div>
          <img src={logo} alt="" style={{ objectFit: "cover", width: "230px", height: "230px"}} />
          <input ref={logoInputRef} style={{display: "none"}} id="logo" name="logo" type="file" onChange={(e) => handleFileChange(e, 2)}/>
          <button onClick={()=> {logoInputRef.current?.click()}}>Download</button>
          </div>

          <div className='trailer-container'>
            <div className='trailer-container-inside'>
            <div className='file-container-label'>Trailer</div>
          <input ref={trailerInputRef} style={{display: "none"}} id="trailer" name="trailer" type="file" onChange={(e) => handleFileChange(e, 3)}/>
          <button onClick={()=> {trailerInputRef.current?.click()}}>Download</button>
            </div>
          </div>
        </div>

        <div className='seasons-container'>
          <Seasons tvShowId={props.tvShow.id} />
        </div>
    </div>;
}

export default TvShowDetails;