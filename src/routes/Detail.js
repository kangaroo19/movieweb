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
  let [index,setIndex]=useState(location.state.index)
  const [movies,setMovies]=useState([])
  const [prvMovie,setPrvMovie]=useState(null)
  const [nxtMovie,setNxtMovie]=useState(null)
  
  const getMovies = async () => {
      const json = await (
      await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")
    ).json();
    setMovies(json.data.movies)
    setPrvMovie((json.data.movies[index-1]===undefined)?json.data.movies[19].medium_cover_image:json.data.movies[index-1].medium_cover_image)
    setNxtMovie((json.data.movies[index+1]===undefined)?json.data.movies[0].medium_cover_image:json.data.movies[index+1].medium_cover_image)    
  }
  
  useEffect(()=>{
    getMovies()  
  },[index]) //getMovies함수는 index값이 바뀔 때 마다 실행

  const {id}=useParams()
  const [loading,setLoading]=useState(true)
  const [movie,setMovie]=useState(null)
  const [rate,setRate]=useState(0)

  const getMovie = async (id) => { //현재 선택한 영화 정보(내용,별점,타이틀) 보여줌
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false)
    setMovie(json.data.movie) //여기서 movie값을 줬다고 밑에서도 movie.rating으로 하면 안됨 오류남
    setRate(json.data.movie.rating)
  };
  
  useEffect(() => { //처음 페이지 렌더링되면 getMovie 함수 실행
    getMovie(id);
  }, []); //dependency에 값이 없다고 해서 다른곳에서 함수 호출 못하는것은 아님
  
  const prvClick=()=>{
    if(index===0){  //현재 보고있는 영화가 첫번째 영화일때
      setIndex(movies.length-1)
      getMovie(String(movies[movies.length-1].id)) //바뀐 인덱스값의 id값이 인자로 들어감

    }
    else{
      setIndex(--index) //다음 영화 이미지 클릭하면 현재 인덱스값-1
      getMovie(String(movies[index].id)) //바뀐 인덱스값의 id값이 인자 로 들어감
    }
  }
  const nxtClick=()=>{
    if(index===movies.length-1){ //현재 보고있는 영화가 마지막 영화일때
      setIndex(0)
      getMovie(String(movies[0].id))
    }
    else{
      setIndex(++index)
      getMovie(String(movies[index].id)) 
    }
  }
  let starIcon=new Array(10).fill(false)
  for(let i=0;i<parseInt(rate);i++){ 
    starIcon[i]=true
  }
  return (
  <div >
    {loading?
    <div className={styles.spinner}><Spin/></div>:
    
    <div className={styles.container} >
      <button className={styles.home_button}><Link to={`/movie/`}><FontAwesomeIcon icon={faHouse}/></Link></button>
      <div className={styles.detail_title}>{movie.title}</div>
      <div className={styles.detail_img}>
        <img onClick={prvClick} className={styles.detail_imgs} src={prvMovie} alt="" />
        <img src={movie.medium_cover_image} alt="" />
        <img onClick={nxtClick} className={styles.detail_imgs} src={nxtMovie} alt="" />
      </div>
      <div className={styles.detail_content}>
        {starIcon.map((value,index)=>(
          (value)?<FontAwesomeIcon key={index} icon={faStar}/>:<FontAwesomeIcon key={index} icon={faStarRegular}/>
        ))} {`(${movie.rating})`}
        <br/>
        <div className={styles.detail_summary_container}>{movie.description_full} </div>             
      </div>
    </div>
    }
  </div>
);
}
export default Detail;

//useParams는 url(특히 변경되는 값,id)에 있는값을 반환해 주는 함수
