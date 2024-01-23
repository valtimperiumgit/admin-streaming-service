import { FormikHelpers, useFormik } from "formik";
import { SidePanelProps } from "../../side-panel/side-panel-types";
import ICreateMovieRequest from "../../../api/requests/movie/create-movie-request";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sliceMedia } from "../../../redux/slices/media-slice";
import IMedia from "../../../entities/media";
import { createMovie } from "../../../api/services/movie-service";
import SelectMedia from "../../select-media/SelectMedia";
import { onCreateMovie, sliceGetMovies, sliceMovieIsLoading } from "../../../redux/slices/movies-slice";
import Loader from "../../loader/Loader";
import { AppDispatch } from "../../../redux/store";

export const CreateMovie = () => {

  const dispatch: AppDispatch = useDispatch();

  var media = useSelector(sliceMedia);

  var [actors, setActors] = useState<IMedia[]>([]);
  var [genres, setGenres] = useState<IMedia[]>([]);
  var [creators, setCreators] = useState<IMedia[]>([]);
  var [countries, setCountries] = useState<IMedia[]>([]);

  var isLoading = useSelector(sliceMovieIsLoading);

  useEffect(() => {
    setGenres(media.genres);
    setActors(media.actors);
    setCreators(media.creators);
    setCountries(media.countries);
}, [media]);

  var [actorsForRequest, setActorsForRequest] = useState<IMedia[]>([]);
  var [genresForRequest, setGenresForRequest] = useState<IMedia[]>([]);
  var [creatorsForRequest, setCreatorsForRequest] = useState<IMedia[]>([]);

  const formik = useFormik<ICreateMovieRequest>({
    initialValues: {
      title: '',
      description: '',
      maturityRating: 0,
      releaseDate: new Date(),
      genres: [],
      actors: [],
      creators: [],
      image: null,
      trailer: null,
      logo: null,
      countryId: 0,
      video: null
    },

    onSubmit: values => {
      console.log("ffsf")
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('maturityRating', values.maturityRating.toString());
      formData.append('description', values.description);
      formData.append('releaseDate', values.releaseDate.toString());
      formData.append('countryId', values.countryId.toString());

      if (values.image) formData.append('image', values.image);
      if (values.trailer) formData.append('trailer', values.trailer);
      if (values.logo) formData.append('logo', values.logo);
      if (values.video) formData.append('video', values.video);

      genresForRequest.forEach(genre => formData.append('genres', genre.id.toString()));
      actorsForRequest.forEach(actor => formData.append('actors', actor.id.toString()));
      creatorsForRequest.forEach(creator => formData.append('creators', creator.id.toString()));
  
      dispatch(onCreateMovie(formData)); 
  },
  });

  function addElement(elementId : string, setElements : Function, elements : IMedia[], allElements : IMedia[]) {
    const elementToAdd = allElements.find(e => e.id === elementId);

    if (elementToAdd) {
        setElements([...elements, elementToAdd]);
    }
}

function removeElement(elementId : string, setElements : Function, elements : IMedia[]) {
  setElements(elements.filter(element => element.id !== elementId));
}

const renderSelectedMedia = (media : IMedia[], setter : Function) => {
  return <div style={{display:"flex", gap:'1em', width:'100%', flexWrap:'wrap', marginBottom: "1em"}}>
    {media.map((item : IMedia, index) => (
    <div key={index} style={{display:"flex"}}>
        {item.name}
        <button type="button" className="deleteBtn" style={{width:'1em', height:'1em'}} onClick={() => removeElement(item.id, setter, media)}>✖</button>
    </div>
    ))}
  </div>
}

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: FormikHelpers<ICreateMovieRequest>['setFieldValue']) => {
  if (e.target.files && e.target.files[0]) {
      setFieldValue(e.target.name, e.target.files[0]);
  }
}

    return (
      <form className="create-tv-show" onSubmit={formik.handleSubmit}>

        {isLoading &&  <div>  <Loader /> </div>} 
        
        {
          !isLoading && <><div style={{ width: "300px" }}>
            <label htmlFor="title">Title</label>
            <input className={(formik.touched.title && formik.errors.title) ? "error-input" : ""} id="title" name="title" onChange={formik.handleChange} value={formik.values.title} />

            <label htmlFor="description">Description</label>
            <input id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />

            <label htmlFor="maturityRating">Maturity Rating</label>
            <input id="maturityRating" name="maturityRating" type="number" onChange={formik.handleChange} value={formik.values.maturityRating} />

            <label htmlFor="releaseDate">Release Date</label>
            <input id="releaseDate" name="releaseDate" type="date" onChange={formik.handleChange} value={formik.values.releaseDate.toString()} />
          </div><div style={{ width: "300px" }}>
              <label htmlFor="genres">Genres</label>
              <SelectMedia items={genres} onChange={e => addElement(e.target.value, setGenresForRequest, genresForRequest, genres)} value={'Genres'} />

              <label htmlFor="actors">Actors</label>
              <SelectMedia items={actors} onChange={e => addElement(e.target.value, setActorsForRequest, actorsForRequest, actors)} value={'Actors'} />

              <label htmlFor="creators">Creators</label>
              <SelectMedia items={creators} onChange={e => addElement(e.target.value, setCreatorsForRequest, creatorsForRequest, creators)} value={'Creators'} />

              <label htmlFor="countryId">Country</label>
              <select onChange={formik.handleChange} id="countryId" name="countryId">
                {countries.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>

            </div><div style={{ width: "300px" }}>

              <label htmlFor="image">Image</label>
              <input id="image" name="image" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)} />

              <label htmlFor="trailer">Trailer</label>
              <input id="trailer" name="trailer" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)} />

              <label htmlFor="logo">Logo</label>
              <input id="logo" name="logo" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)} />

              <label htmlFor="video">Video</label>
              <input id="video" name="video" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)} />

            </div><div style={{ height: "100px", width: "100%" }}>
              {renderSelectedMedia(genresForRequest, setGenresForRequest)}
              {renderSelectedMedia(actorsForRequest, setActorsForRequest)}
              {renderSelectedMedia(creatorsForRequest, setCreatorsForRequest)}
            </div><div className="submit-button-container">
              <button type="submit">Submit</button>
            </div></>
        }

      </form>
    );
  }

export default CreateMovie;