import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { Link, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); 

  const [apiVideo, setApiVideo] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  useEffect(() => {
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2VhODY1Nzc1MmU2OWNkYzkwMjUyYTYzMTI3N2MxOCIsIm5iZiI6MTc1Mzc5NDI0Ny4wNjIsInN1YiI6IjY4ODhjNmM3NjMwOTIyMmZlZTcyZjk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-qTLaKMhzgbGGymAEa-Xz-BQMBAmoxigdIKfev3tZqI'
    } }
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results.length > 0) {
          setApiVideo(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  },[id]);

  return (
    
    <div className='Player'>
      <Link to={'/'}>
        <img src={back_arrow_icon} alt="Back" />
      </Link>
      <iframe
        src={`https://www.youtube.com/embed/${apiVideo.key}`}
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className='player-info'>
        <p>{apiVideo.published_at?.slice(0, 10)}</p>
        <p>{apiVideo.name}</p>
        <p>{apiVideo.type}</p>
      </div>
    </div>
  );
};

export default Player;
