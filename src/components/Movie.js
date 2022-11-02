import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import styles from './Movie.module.css'
function Movie({id,coverImg,title,year,summary,genres}){
    return ( 
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img}/>
      <div>
        <h2 className={styles.movie__title}>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <h3 className={styles.movie__year}>{year}</h3>
        <p>{summary.length>235 ? `${summary.slice(0,235)}...`:summary}</p>
        <ul className={styles.movie_genres}>
          {genres.map((value)=>(
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
    )
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
