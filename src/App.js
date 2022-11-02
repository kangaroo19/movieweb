//import Button from "./Button" //Button폴더에서 Button컴포넌트 가져옴
//import styles from './App.module.css' //styles 이름으로 App.moudle.css 가져옴 ex)styles.클래스명
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home'
import Detail from "./routes/Detail";
import React from 'react';
function App() {
  return (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path='/movie/:id'>
        <Detail/> 
      </Route>
      <Route path='/'>
        <Home/> 
      </Route>
    </Switch>
  </Router> 
)}

export default App;


//useEffect --> 첫번째 인자는 실행할 함수,두번째 인자값이 바뀌면 함수 실행되고 빈 배열이면 함수 한번만 실행됨
//컴포넌트가 파괴되면 첫번째 인자의 함수의 리턴함수 실행됨 이를 cleanup 함수라고 함

//같은 컴포넌트의 리스트를 렌더할때는 key(고유한 값)라는 prop을 넣어줘야함

//Switch 컴포넌트는 한번에 하나의 Route만 랜더링하기 위함

//npm run deploy --> 빌드폴더 생성과 배포가능