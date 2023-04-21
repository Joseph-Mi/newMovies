import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (
  trailers,
  poster,
  title,
  date,
  description,
  revenue,
  time,
  vote,
  count,
  lang,
  popularity
) => {

  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const h5 = document.createElement("h4");
  const h6 = document.createElement("h4");
  const h7 = document.createElement("h4");
  const h8 = document.createElement("h4");
  const h9 = document.createElement("h4");
  const h10 = document.createElement("h4");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  img.style.alignItems = "left";
  img.style.width = "300px";
  img.style.height = "400px";
  const trailer = trailers.filter((trailer) => trailer.type === "Trailer");
  h1.innerText = `/n ${title};
  h3.innerText = `Release Date: ${date}`;
  h4.innerText = `Overview: ${description}`;
  h5.innerText = `Revenue: $${revenue}`;
  h6.innerText = `Runtime: ${time} mins`;
  h7.innerText = `Vote Average: ${vote}/10`;
  h8.innerText = `Number of Votes: ${count}`;
  h9.innerText = `Language: ${lang}`;
  h10.innerText = `Popularity Rating: ${popularity}`;

  details.append(h1);
  details.append(h3);
  details.append(h4);
  details.append(h5);
  details.append(h6);
  details.append(h7);
  details.append(h8);
  details.append(h9);
  details.append(h10);

  tile.append(img);
  
  if (trailer.length) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${trailer.at(0).key}`;
    iframe.style.marginLeft = "2vw";
    tile.append(iframe);
  } else {
    const p = document.createElement("p");
    p.innerText = "No trailer available!";
    tile.append(p);
  }


  tile.append(details);

  return tile;
};

function clearDiv(id) {
  let checkEmpty = document.getElementById(id).innerHTML === "";
  if (checkEmpty) {
    return;
  } else {
    document.getElementById(id).innerHTML = "";
  }
}

async function getData(id) {
  let movie = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false&append_to_response=videos`
  );
  const tile = createMovieTile(
    movie.videos.results,
    movie.poster_path,
    movie.title,
    movie.release_date,
    movie.overview,
    movie.revenue,
    movie.runtime,
    movie.vote_average,
    movie.vote_count,
    movie.original_language,
    movie.popularity
  );
  let movies = document.getElementById("movies");
  movies.appendChild(tile);
}

document.getElementById("getMovie").addEventListener("click", () => {
  clearDiv("movies");
  let movieID = document.getElementById("movieOptions").value;
  getData(movieID);
});
