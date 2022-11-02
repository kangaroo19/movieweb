import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from './Detail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faStar} from '@fortawesome/free-regular-svg-icons'
//import {faStar} from '@fortawesome/free-regular-svg-icons'

function Detail() {
  const { id } = useParams();
  const [loading,setLoading]=useState(true)
  const [movie,setMovie]=useState(null)
  const [rate,setRate]=useState(0)
  let starIcon=['@','@','@','@','@','@','@','@','@','@']
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false)
    setMovie(json)
    setRate(json.data.movie.rating)
  };
  for(let i=0;i<rate-1;i++){
    starIcon[i]='*'
  }
  console.log(faStar)
  useEffect(() => {
    getMovie();
  }, []);
  
  return (
    <div >
      {loading?
      <div className={styles.example}><Spin/></div>:
      
      <div className={styles.container} >
        {starIcon.map((value)=>(
          (value==='*')?<FontAwesomeIcon icon={faStar}/>:null
        ))}
        <button className={styles.home_button}><Link to={`/movie/`}>Home</Link></button>
        <div className={styles.detail_title}>{movie.data.movie.title}</div>
        <div className={styles.detail_img}>
          <img src={movie.data.movie.medium_cover_image} alt="" />
        </div>
        
        <div className={styles.detail_content}>
          {`${starIcon.join("")} (${movie.data.movie.rating})`} 
          <br/>
          <div className={styles.detail_summary_container}>{movie.data.movie.description_full} </div>             
        </div>
      </div>
      }
    </div>
  );
}
export default Detail;

//useParams는 url(특히 변경되는 값,id)에 있는값을 반환해 주는 함수
