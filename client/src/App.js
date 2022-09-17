import './App.css';
import {useState,useEffect} from 'react';
import ListMovie from './componenets/ListMovie';
import axios from "axios"
import Button from '@mui/material/Button';
import env from "react-dotenv";
import SearchIcon from '@mui/icons-material/Search';
 


function App() {
const api_key = env.NEW_AP
// const api2 = "https://api.themoviedb.org/3/movie/popular?api_key=9cf4b49fa52c44e12236142e2cef7d63";
const api = `https://api.themoviedb.org/3/movie/popular?api_key=${env.NEW_AP}`
// const API_SEARCH2 = "https://api.themoviedb.org/3/search/movie?api_key=9cf4b49fa52c44e12236142e2cef7d63&query="
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${env.NEW_AP}&query=`
 
const [movies,setmovies] = useState([]);
const [typed,settyped] = useState("");



const inpChange=(e)=>{
 settyped(e.target.value)

}

const handleSubmit=(event)=>{
event.preventDefault()
axios.get(API_SEARCH+typed).then((response)=>setmovies(response.data.results)).catch((err)=>console.log(err))

}
 

 
useEffect(()=>{
axios.get(api)
.then((response)=>{console.log(response.data.results)
setmovies(response.data.results)}).catch((err)=>(console.log(err)))
},[])





return(
<div className="App">
<div>
  <div className='caption'>
    MOVIE SITE 
  
  </div>
  <div >
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder='search ...' className='search' onChange={inpChange}></input>
      <div className='button-search'>
        <Button className='button-searc' variant="contained" onClick={handleSubmit}> <SearchIcon/> </Button>
      </div>
      
    </form>
    <div className='log'>
      <Button variant="outlined" color="secondary" className='login'>Login/Signup</Button>
    </div>
   
    </div>
   <div className='movies'>
    
    {movies.map((movie)=>(<ListMovie key={movie.id} movie={movie} {...movies}/>))}
    
   </div>
  
</div>


</div>
  );
}

export default App