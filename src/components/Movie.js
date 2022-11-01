import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import styles from '../App.module.css'

function Movie({id,coverImg,title,summary,genres}){
    return  <div>
    <img src={coverImg} alt={title} />
    <Link to={`/movie/${id}`} className={styles.blk}>{title}</Link>
    <p>{summary}</p>
    <ul>
      {genres.map((value)=>(
        <li key={value}>{value}</li>
      ))}
    </ul>
  </div>
}

Movie.propTypes={
    id:PropTypes.number.isRequired,
    coverImg:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    genres:PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie

//a태그는 페이지 전체 새로고침됨 --> Link컴포넌트 사용,되게 빠르게 반응하는 것처럼 보임
