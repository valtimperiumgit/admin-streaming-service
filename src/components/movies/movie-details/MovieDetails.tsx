import { useSelector } from "react-redux";
import IMovie from "../../../entities/movie";
import IMedia from "../../../entities/media";
import { useEffect, useRef, useState } from "react";
import { sliceMedia } from "../../../redux/slices/media-slice";
import { useFormik } from "formik";
import IEditMovieRequest from "../../../api/requests/movie/edit-movie-request";
import { deleteMovie, editMovie, editMovieFile } from "../../../api/services/movie-service";
import SelectMedia from "../../select-media/SelectMedia";
import "../movie-details/MovieDetails.css"

interface MovieDetailsProps {
    movie: IMovie
}

function MovieDetails(props: MovieDetailsProps) {

    var media = useSelector(sliceMedia);
    var [countries, setCountries] = useState<IMedia[]>([]);
  
    var [movieActors, setMovieActors] = useState<IMedia[]>([]);
    var [movieGenres, setMovieGenres] = useState<IMedia[]>([]);
    var [movieCreators, setMovieCreators] = useState<IMedia[]>([]);
  
    var [actorsForRequest, setActorsForRequest] = useState<IMedia[]>([]);
    var [genresForRequest, setGenresForRequest] = useState<IMedia[]>([]);
    var [creatorsForRequest, setCreatorsForRequest] = useState<IMedia[]>([]);
  
    var [image, setImage] = useState<string>();
    var [logo, setLogo] = useState<string>();
    var [trailer, setTrailer] = useState<string>();
    var [video, setVideo] = useState<string>();

    const imageInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const trailerInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        setMovieActors(media.actors);
        setMovieGenres(media.genres);
        setMovieCreators(media.creators)
        setCountries(media.countries);
    
        setActorsForRequest(props.movie.movieActors);
        setGenresForRequest(props.movie.movieGenres);
        setCreatorsForRequest(props.movie.movieCreators);
    
        setImage(props.movie.imageUrl);
        setTrailer(props.movie.trailerUrl);
        setLogo(props.movie.logoUrl);
        setVideo(props.movie.videoUrl);
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
    
      const formik = useFormik<IEditMovieRequest>({
        initialValues: {
          id: props.movie.id,
          title: props.movie.title,
          description: props.movie.description,
          maturityRating: props.movie.maturityRating,
          releaseDate: props.movie.releaseDate,
          genreIds: [],
          actorIds: [],
          creatorIds: [],
          countryId: Number.parseInt(props.movie.countryId)
        },
    
        onSubmit: values => {
          values.actorIds = actorsForRequest.map(actor => actor.id);
          values.genreIds = genresForRequest.map(genre => genre.id);
          values.creatorIds = creatorsForRequest.map(creator => creator.id);
    
          editMovie(values)
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
        formData.append('movieId', props.movie.id);
        formData.append('fileType', fileType.toString());
    
        let target = event.target;
        let files = target.files;
    
        if(files){
          formData.append('file', files[0]);
        }
    
        editMovieFile(formData).then((res)=> {
          if(fileType === 1){
            setImage(res.data);
          }
    
          if(fileType === 2){
            setLogo(res.data);
          }
        });
      }
    
    const onDeleteTvShow = () => {
      deleteMovie(props.movie.id).then((res) => { window.location.reload()});
    }

  return ( <div>
    <form className="create-tv-show" onSubmit={formik.handleSubmit}>
          <div style={{width: "300px"}}>

          <label htmlFor="id">Id</label>
          <input id="id" name="id" readOnly={true} value={props.movie.id}/>

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
          
          <SelectMedia items={movieGenres} onChange={e => addElement(e.target.value, setGenresForRequest, genresForRequest, movieGenres)} value={'Genres'}/>
          
          <div>
          <label htmlFor="actors">Actors</label>
          </div>
        
          <SelectMedia items={movieActors} onChange={e => addElement(e.target.value, setActorsForRequest, actorsForRequest, movieActors)} value={'Actors'}/>
          
          <label htmlFor="creators">Creators</label>
          <SelectMedia items={movieCreators} onChange={e => addElement(e.target.value, setCreatorsForRequest, creatorsForRequest, movieCreators)} value={'Creators'}/>


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

          <div className='trailer-container'>
            <div className='trailer-container-inside'>
            <div className='file-container-label'>Video</div>
          <input ref={videoInputRef} style={{display: "none"}} id="video" name="video" type="file" onChange={(e) => handleFileChange(e, 3)}/>
          <button onClick={()=> {videoInputRef.current?.click()}}>Download</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default MovieDetails;