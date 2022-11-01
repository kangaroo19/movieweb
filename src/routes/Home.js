import { useState,useEffect } from "react"
import Movie from "../components/Movie"
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from '../App.module.css'

function Home(){
    const [loading,setLoading]=useState(true)
    const [movies,setMovies]=useState([])
    const getMovies=async()=>{
    const response=await fetch('https:yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')
    const json=await response.json()
    setMovies(json.data.movies)
    setLoading(false)
  }
  useEffect(()=>{
    getMovies()
  },[])
  
  return <div>
    {loading?//<div className={styles.example}><Spin/></div>:
    <h1>loading</h1>:
    <div>
      {movies.map((value)=>(
        <Movie
          key={value.id}
          id={value.id}
          coverImg={value.medium_cover_image} 
          title={value.title} 
          summary={value.summary} 
          genres={value.genres}
        />
      ))}
      </div>}</div>
}

export default Home