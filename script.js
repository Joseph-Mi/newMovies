const movieSelect = document.getElementById("movieOptions");
const getMovie = document.getElementById("getMovie");
const mCont = document.getElementById("mContainer");
const pCont = document.getElementById("pContainer");
let movieID = null;

movieSelect.addEventListener('click', () => {
  if(button.click){
    movieID = movieSelect.value;
  }
})

getMovie.addEventListener('click', () => {
  if(getMovie.click){
    clearData();
    getmovie(movieID);
  }
})

function clearData(){
  while (mCont.firstChild) {
    mCont.removeChild(mCont.firstChild);
  }
  while (pCont.firstChild){
    pCont.removeChild(pCont.firstChild);
  }
}

function movieData(id){
  axios.get(`https:api.themoviedb.org/3/movie/${id}`, {
        params:{
        api_key: "fbb6ba03bbd1aaeb92c52f989ea8698d",
        append_to_response: "videos",
        }
      }
    ).then((movieData) => {
          const img = document.createElement('img');
          const p = document.createElement('p');
          const getTrailer = document.createElement('trailer');
          // const iframe = document.createElement('iframe');
  
          // const trailers = movieData.data.videos.results.filter((trailer) => trailer.type == "Trailer");

          // iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
          img.src = `https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`;

          p.innerHTML = `Movie title: ${movieData.data.title} <br>
          Overview: ${movieData.data.overview}<br>
          Release date: ${movieData.data.release_date} <br>
          Popularity ranking: ${movieData.data.popularity}<br>
          Budget: $${movieData.data.budget}<br>
          Runtime: ${movieData.data.runtime} mins<br>
          Average rating: ${movieData.data.vote_average}/10<br>
          Revenue: $${movieData.data.revenue}<br>`;

          getTrailer.innerHTML = "Get Trailer";
        
          
          mContainer.append(img);
          // mContainer.append(iframe);
          pContainer.append(p); 
          pContainer.append(getTrailer);
  });
}

getTrailer.addEventListener('click', () => {
  if(button.click){
    
  }
})