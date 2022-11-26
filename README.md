# 영화 정보 웹사이트

### 주소 

https://kangaroo19.github.io/movieweb

## 1.개요
유튜버 노마드 코더 님의 강의를 듣고 만든 영화 웹 서비스 사이트 입니다.영화에 대한 정보를 알 수 있습니다. 

## 2.미리보기

### 홈페이지
![12](https://user-images.githubusercontent.com/86513078/204075080-2e2eaae1-ab97-47d6-ab82-24edca52cc0a.PNG)

영화 제목을 클릭하면 영화 상세 페이지로 넘어갑니다.

### 상세 페이지

![23](https://user-images.githubusercontent.com/86513078/204075136-df29960a-e01f-4c17-853c-8a5af95b5bbb.PNG)

영화 제목,설명 등이 포함된 페이지 입니다. 좌우측에 있는 영화 이미지를 클릭하면 해당 영화 상세 페이지로 넘어갑니다. 좌상단의 아이콘을 클릭하면 홈 페이지로 갑니다.

## 3.코드

다음 4개의 컴포넌트로 구성
- App.js : react-router-dom 이용한 라우팅 처리
- Home.js : 홈페이지 화면 구성
- Movie.js : 홈페이지 화면의 각 영화 요소 구성
- Detail.js : 영화 상세 페이지

### Home.js
```JS
function Home() {
  const [loading, setLoading] = useState(true); //로딩창
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
.
.
.
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
```
movies 배열에 받아온 영화 정보 저장하고 Movie컴포넌트의 props로 넣음

### Detail.js
#### getMovie
```JS
const {id}=useParams()
const getMovie = async (id) => { 
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false)
    setMovie(json.data.movie)  
    setRate(json.data.movie.rating)
  };
```
getMovie함수는 현재 선택한 영화의 id값에 따른 정보(내용,별점,타이틀)를 구성해준다<br> useParam을 사용하여 url에서 변한 값을 가져와 id에 저장
#### getMovies
```JS
const getMovies = async () => {
      const json = await (
      await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")
    ).json();
    setMovies(json.data.movies)
    setPrvMovie((json.data.movies[index-1]===undefined)?json.data.movies[19].medium_cover_image:json.data.movies[index-1].medium_cover_image)
    setNxtMovie((json.data.movies[index+1]===undefined)?json.data.movies[0].medium_cover_image:json.data.movies[index+1].medium_cover_image)    
  }
```
getMovies 함수는 이전 영화와 다음 영화를 구성하게 해준다.<br>
json 변수에 모든 영화정보를 저장하고 Movie컴포넌트에서 보낸 index값을 기준으로 prvMovie에 이전 영화,nxtMovie에 다음 영화를 저장한다<br> 만약 현재 보고있는 영화가 첫번째 영화라면 prvMovie는 제일 마지막 영화이고 보고있는 영화가 마지막 영화라면 nxtMovie는 제일 처음 영화이다. 

 ## 4.기술스택
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/>

  
