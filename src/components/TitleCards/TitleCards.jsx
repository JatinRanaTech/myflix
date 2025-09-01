import React, { useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';


const TitleCards = ({title , category}) => {
  const[apiData,setApiData]=useState([]);
   
  useEffect(()=>{
     const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2VhODY1Nzc1MmU2OWNkYzkwMjUyYTYzMTI3N2MxOCIsIm5iZiI6MTc1Mzc5NDI0Ny4wNjIsInN1YiI6IjY4ODhjNmM3NjMwOTIyMmZlZTcyZjk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-qTLaKMhzgbGGymAEa-Xz-BQMBAmoxigdIKfev3tZqI'
  }
};

   fetch(`https://api.themoviedb.org/3/movie/${category ?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res =>res.json())
  .then(res =>setApiData(res.results))
  .catch(err =>console.log(err));
  },[category])
  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className='card-list'  >
        {apiData.map((apidata, i) => (
  apidata.poster_path && (
    <Link to={`/Player/${apidata.id}`} className='card' key={i}>
      <img src={`https://image.tmdb.org/t/p/w500${apidata.poster_path}`} alt={apidata.title} />
      <p>{apidata.title}</p>
    </Link>
  )
))}

      </div>
    </div>
  )
}

export default TitleCards
