import { useEffect,useState,useCallback } from "react";
import { useParams } from "react-router-dom";
//import 'antd/dist/antd.css';
//import { Spin } from 'antd';
//import styles from '../App.module.css'

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovieData(json);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading?
      //<div className={styles.example}><Spin/></div>
      <h1>loading</h1>
      :
      <div>
        <h1>{movieData.data.movie.title}</h1>
        <img src={movieData.data.movie.medium_cover_image} alt="" />
        <p>{movieData.data.movie.description_full}</p>
      </div>
      }
    </div>
  );
}
export default Detail;

//useParams는 url(특히 변경되는 값,id)에 있는값을 반환해 주는 함수
