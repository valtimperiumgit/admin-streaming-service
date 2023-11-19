import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from "react-redux";
import { sliceGetMovies } from "../../redux/slices/movies-slice";
import IMovie from "../../entities/movie";
  
const ReleaseDate 

  const MoviesTable: React.FC = () => {
    var moviesFromSlice = useSelector(sliceGetMovies);
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        setMovies(moviesFromSlice)
    }, [moviesFromSlice]);

    const [editMovieId, setEditMovieId] = useState<string | null>(null);
    const [draftMovie, setDraftMovie] = useState<IMovie | null>(null);
  
    // Функция для начала редактирования
    const handleEditStart = (movie: IMovie) => {
      setEditMovieId(movie.id);
      setDraftMovie({ ...movie });
    };
  
    // Функция для сохранения изменений
    const handleSave = (id: string) => {
      if (draftMovie) {
        setMovies(movies.map((movie) => (movie.id === id ? draftMovie : movie)));
        setEditMovieId(null);
        setDraftMovie(null);
  
        // Отправляем изменения на сервер
        // axios.put(`/api/movies/${id}`, draftMovie);
      }
    };
  
    // Функция для отмены редактирования
    const handleCancel = () => {
      setEditMovieId(null);
      setDraftMovie(null);
    };
  
    // Обработка изменений в полях ввода
// Обработка изменений в полях ввода
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        property: keyof IMovie
    ) => {
        if (draftMovie) {
        setDraftMovie({ ...draftMovie, [property]: e.target.value });
        }
    };
  
    // Функция для удаления фильма
    const handleDelete = (id: string) => {
      setMovies(movies.filter((movie) => movie.id !== id));
      // Отправляем запрос на удаление на сервер
      // axios.delete(`/api/movies/${id}`);
    };
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="editable table">
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => {
              const isEditing = editMovieId === movie.id;
  
              return (
                <TableRow key={movie.id}>

                  <TableCell>
                    {isEditing ? (<TextField value={draftMovie?.imageUrl || ''} onChange={(e) => handleChange(e, 'imageUrl')}/>) 
                    : (<img src={movie.imageUrl} alt={movie.title} style={{ height: '100px' }} />)}
                  </TableCell>

                  <TableCell>
                    {isEditing ? ( <TextField value={draftMovie?.title || ''} onChange={(e) => handleChange(e, 'title')}/>) 
                    : (movie.title)}
                  </TableCell>

                  <TableCell>
                    {isEditing ? ( <TextField value={draftMovie?.releaseDate || ''} onChange={(e) => handleChange(e, 'releaseDate')}/>) 
                    : <div> (movie.releaseDate) </div>}
                  </TableCell>

                  <TableCell>
                    {isEditing ? (
                      <>
                        <IconButton onClick={() => handleSave(movie.id)}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditStart(movie)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(movie.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default MoviesTable;