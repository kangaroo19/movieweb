import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from './Detail.module.css'

function Detail() {
  const { id } = useParams();
  const [loading,setLoading]=useState(true)
  const [movie,setMovie]=useState(null)
  const [rate,setRate]=useState(0)
  let a=''
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false)
    setMovie(json)
    setRate(json.data.movie.rating)
    console.log(json)
  };
  
  for(let i=1;i<=rate;i++){
    a+='*'
  }
  useEffect(() => {
    getMovie();
  }, []);
  console.log(a)
  return (
    <div>

      {loading?
      <div className={styles.example}><Spin/></div>:
      <div>
        <h1 className={styles.detail_title}>{movie.data.movie.title}</h1>
        <div className={styles.detail_img}>
          <img  src={movie.data.movie.medium_cover_image} alt="" />
        </div>
        <div className={styles.detail_content}>
          {a}
          <br/>
          {movie.data.movie.description_full}

        </div>
      </div>
      }
    </div>
  );
}
export default Detail;

//useParams는 url(특히 변경되는 값,id)에 있는값을 반환해 주는 함수
