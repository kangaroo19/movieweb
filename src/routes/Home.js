import { useState,useEffect,useCallback } from "react"
import Movie from "../components/Movie"
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from "./Home.module.css"

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const moviesUrl =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year";
  const [url, setUrl] = useState(moviesUrl);
  const getMovies = useCallback(async () => {
    const json = await (await fetch(url)).json();
    setMovies(json.data.movies);
    setLoading(false);
  }, [url]);
  useEffect(() => {
    setUrl((moviesUrl) => moviesUrl);
    getMovies();
  }, [getMovies]);
  
  
  return (
    
      <div className={styles.container}>

        {loading?<div className={styles.spinner}><Spin/></div>:
        <div className={styles.movies}>
        {movies.map((value,index)=>(
          <Movie
            key={value.id}
            index={index}
            id={value.id}
            year={value.year}
            coverImg={value.medium_cover_image} 
            title={value.title} 
            summary={value.summary} 
            genres={value.genres}
          />
        ))}
        </div>}
      </div>
  )
}

export default Home