import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import IMedia from "../../../entities/media";
import { useDispatch, useSelector } from "react-redux";
import { sliceMedia } from "../../../redux/slices/media-slice";
import SelectMedia from "../../select-media/SelectMedia";
import { ICreateTvShowRequest } from "../../../api/requests/tv-show/create-tv-show-request";
import { createTvShow } from "../../../api/services/tv-show-service";
import "../create-tv-shows/CreateTvShow.css"
import * as Yup from 'yup';
import { onCreateTvShow, sliceGetTvShows } from "../../../redux/slices/tv-shows-slice";
import Loader from "../../loader/Loader";
import { AppDispatch } from "../../../redux/store";

function CreateTvShow() {
    
  var media = useSelector(sliceMedia);
  const dispatch: AppDispatch = useDispatch();

  var isCreatingLoading = useSelector(sliceGetTvShows).isCreatingTvShowLoading;

  var [actors, setActors] = useState<IMedia[]>([]);
  var [genres, setGenres] = useState<IMedia[]>([]);
  var [creators, setCreators] = useState<IMedia[]>([]);
  var [countries, setCountries] = useState<IMedia[]>([]);

  var [actorsForRequest, setActorsForRequest] = useState<IMedia[]>([]);
  var [genresForRequest, setGenresForRequest] = useState<IMedia[]>([]);
  var [creatorsForRequest, setCreatorsForRequest] = useState<IMedia[]>([]);

  useEffect(() => {
      setGenres(media.genres);
      setActors(media.actors);
      setCreators(media.creators);
      setCountries(media.countries);
  }, [media]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .max(100, 'Title cannot be longer than 100 characters'),
    description: Yup.string()
        .required('Description is required'),
    maturityRating: Yup.number()
        .required('Maturity Rating is required')
        .min(0, 'Maturity Rating cannot be less than 0')
        .max(18, 'Maturity Rating cannot be more than 18'),
    releaseDate: Yup.date()
        .required('Release Date is required')
        .nullable(),
    countryId: Yup.number()
        .required('Country is required')
        .positive('Invalid country selected')
        .integer('Invalid country selected'),
});

    const formik = useFormik<ICreateTvShowRequest>({
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
          countryId: 0
        },

        validationSchema: validationSchema,
        onSubmit: values => {
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('maturityRating', values.maturityRating.toString());
          formData.append('description', values.description);
          formData.append('releaseDate', values.releaseDate.toString());
          formData.append('countryId', values.countryId.toString());

          if (values.image) formData.append('image', values.image);
          if (values.trailer) formData.append('trailer', values.trailer);
          if (values.logo) formData.append('logo', values.logo);

          genresForRequest.forEach(genre => formData.append('genres', genre.id.toString()));
          actorsForRequest.forEach(actor => formData.append('actors', actor.id.toString()));
          creatorsForRequest.forEach(creator => formData.append('creators', creator.id.toString()));
      
          dispatch(onCreateTvShow(formData)); 

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
      setFieldValue: FormikHelpers<ICreateTvShowRequest>['setFieldValue']) => {
      if (e.target.files && e.target.files[0]) {
          setFieldValue(e.target.name, e.target.files[0]);
      }
    }

      return (
        <form className="create-tv-show" onSubmit={formik.handleSubmit}>
          {isCreatingLoading && <Loader />} 
          {!isCreatingLoading && <div className="create-tv-show"> <div style={{width: "300px"}}>
          <label htmlFor="title">Title</label>
          <input className={(formik.touched.title && formik.errors.title) ? "error-input" : ""} id="title" name="title"  onChange={formik.handleChange} value={formik.values.title}/>

          <label htmlFor="description">Description</label>
          <input id="description" name="description"  onChange={formik.handleChange} value={formik.values.description}/>
         
          <label htmlFor="maturityRating">Maturity Rating</label>
          <input id="maturityRating" name="maturityRating" type="number" onChange={formik.handleChange} value={formik.values.maturityRating}/>
    
          <label htmlFor="releaseDate">Release Date</label>
          <input id="releaseDate" name="releaseDate" type="date" onChange={formik.handleChange} value={formik.values.releaseDate.toString()}/>
          </div>

          <div style={{width: "300px"}}>
          <label htmlFor="genres">Genres</label>
          <SelectMedia items={genres} onChange={e => addElement(e.target.value, setGenresForRequest, genresForRequest, genres)} value={'Genres'}/>
          
          <label htmlFor="actors">Actors</label>
          <SelectMedia items={actors} onChange={e => addElement(e.target.value, setActorsForRequest, actorsForRequest, actors)} value={'Actors'}/>
          
          <label htmlFor="creators">Creators</label>
          <SelectMedia items={creators} onChange={e => addElement(e.target.value, setCreatorsForRequest, creatorsForRequest, creators)} value={'Creators'}/>

          <label htmlFor="countryId">Country</label>
          <select onChange={formik.handleChange} id="countryId" name="countryId">
            {countries.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>  
          
          </div>

          <div style={{width: "300px"}}>
          
          <label htmlFor="image">Image</label>
          <input id="image" name="image" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)}/>

          <label htmlFor="trailer">Trailer</label>
          <input id="trailer" name="trailer" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)}/>

          <label htmlFor="logo">Logo</label>
          <input id="logo" name="logo" type="file" onChange={(e) => handleFileChange(e, formik.setFieldValue)}/>
        
        </div>

        <div style={{height: "100px", width: "100%"}}>
          {renderSelectedMedia(genresForRequest, setGenresForRequest)}
          {renderSelectedMedia(actorsForRequest, setActorsForRequest)}
          {renderSelectedMedia(creatorsForRequest, setCreatorsForRequest)}
        </div>

          <div className="submit-button-container">
            <button type="submit">Submit</button>
          </div>

          {formik.touched.title && formik.errors.title && <div className="error">{formik.errors.title}</div>}
          {formik.touched.description && formik.errors.description && <div className="error">{formik.errors.description}</div>}
          {formik.touched.maturityRating && formik.errors.maturityRating && <div className="error">{formik.errors.maturityRating}</div>}</div> 
          } 
        </form>
      );
  }

export default CreateTvShow;