import { useEffect,useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from './Detail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'
//폰트어썸 같은 아이콘이름인데 속성 바꾸고싶으면 위처럼 사용
function Detail() {
  const location=useLocation()
  console.log(location.state.movies)
  const [index,setIndex]=useState(null)
  const [prvMovie,setPrvMovie]=useState(null)
  const [nxtMovie,setNxtMovie]=useState(null)
  const { id } = useParams();
  const [testId,setTestId]=useState(id)
  const [loading,setLoading]=useState(true)
  const [movie,setMovie]=useState(null)
  const [rate,setRate]=useState(0)
  let starIcon=new Array(10).fill(false)
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${testId}`)
    ).json();
    setIndex(location.state.movies.index) //movie컴포넌트에서 받아온 데이터에 index라는 키 추가
    setLoading(false)
    setMovie(json)
    setPrvMovie(location.state.movies[0])
    setNxtMovie(location.state.movies[1])
    setRate(json.data.movie.rating)
  };


  for(let i=0;i<parseInt(rate);i++){ //밑에 map함수에 넣을 수 있을거 같음
    starIcon[i]=true
  }
  
  const nextClick=()=>{
    setTestId(nxtMovie.id)
    //setMovie(nxtMovie)
  }
  const prvClick=()=>{
    setTestId(prvMovie.id)
    //setMovie(prvMovie)
  }
  useEffect(() => {
    getMovie();
  }, [testId]);
  
  return (
    <div >
      {loading?
      <div className={styles.example}><Spin/></div>:
      
      <div className={styles.container} >
        <button className={styles.home_button}><Link to={`/movie/`}><FontAwesomeIcon icon={faHouse}/></Link></button>
        <div className={styles.detail_title}>{movie.data.movie.title}</div>
        <div className={styles.detail_img}>
          <img onClick={prvClick} className={styles.detail_imgs} src={prvMovie===undefined?null:prvMovie.medium_cover_image} alt="" />
          <img src={movie.data.movie.medium_cover_image} alt="" />
          <img onClick={nextClick} className={styles.detail_imgs} src={nxtMovie===undefined?null:nxtMovie.medium_cover_image} alt="" />
        </div>
        {/* <h2 onClick={onClick}><Link to={`/movie/${(testId)}`}>click</Link></h2> */}
        <div className={styles.detail_content}>
          {starIcon.map((value)=>(
            (value)?<FontAwesomeIcon icon={faStar}/>:<FontAwesomeIcon icon={faStarRegular}/>
          ))} {`(${movie.data.movie.rating})`}
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
