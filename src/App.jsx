import { useState } from 'react'
import './App.css'
import movies from "./contacts";
import Card from "./Card";

function App() {
  const [count, setCount] = useState(0)
  const uniqueGenres = [...new Set(movies.flatMap((movie) => movie.genres))];
  const [result, setResult] = useState(movies);
  const [hovered, setHovered] = useState(false);
  const [clicked_g, setClicked] = useState([]);
  const [filter, setFilter] = useState(false);
  let res="";
  return (
    <div>
      <div style={{display:'block'}}>
      <h1 className="heading">Movies</h1>
      <input placeholder="Enter a movie name..." className="val"></input>
      <button 
        onClick={() => {
          res = document.getElementsByClassName("val")[0].value;

          if (res.length > 0 && clicked_g.length > 0) {
            console.log("hi");

            setResult(
              movies.filter((movie) => {
                return (movie.name.toLowerCase().includes(res) &&
                  clicked_g.some((click) => movie.genres.includes(click))) ||
                  (movie.name.includes(res[0] + res[1]) &&
                    clicked_g.some((click) => movie.genres.includes(click)))
                  ? movie
                  : null;
              })
            );
          } else if (res.length > 0 && clicked_g.length == 0) {
            console.log("hello");
            setResult(
              movies.filter((movie) => {
                return movie.name.toLowerCase().includes(res) ||
                  movie.name.includes(res[0] + res[1])
                  ? movie
                  : null;
              })
            );
          } else if (res.length == 0 && clicked_g.length > 0) {
            console.log("goodbye");

            setResult(
              movies.filter((movie) =>
                clicked_g.some((click) => movie.genres.includes(click))
              )
            );
          }
        }}
      >
        🔎
      </button>

      <button onClick={() => (filter ? setFilter(false) : setFilter(true))}>
        Filters
      </button>
      </div>
      {filter
  ? uniqueGenres.map((genre) => (
      <div  >
        <div>
          <input 
            onChange={() => {
              
              if (
                document.getElementById(genre).checked &&
                !clicked_g.includes(genre)
              ) {
                
                setClicked([...clicked_g, genre]);
                
                // Make it solid when selected
                
              } else if (
                !document.getElementById(genre).checked &&
                clicked_g.includes(genre)
              ) {
                
                setClicked(
                  clicked_g.filter((item) => {
                    return item !== genre;
                  })
                );
                
                
              }
              console.log(clicked_g);
            }}
            type="checkbox"
            name={genre}
            id={genre}
            value={genre}
          ></input>
          <label style={{opacity:hovered?1:0.4}}className={genre}  onMouseOver={() => {
            console.log("hovered");
              
              setHovered(true);
              
            }}
            onMouseOut={() => {
              setHovered(false);
            }}
           
            
            htmlFor={genre}
          >
            {genre}
          </label>
        </div>
      </div>
    ))
  : ""}
      {result.length > 0 ? (
  <div className="cards-grid">
    {result.map((movie, i) => (
      <div style={{ display: "inline-block", margin: "10px" }} key={i}>
        <Card 
          name={movie.name}
          img={movie.img}
          rating={movie.rating}
          genre={
            <div className="genres-container">
              {movie.genres.map((genre, idx) => (
                <span key={idx} className="genre-badge">
                  {genre}
                </span>
              ))}
            </div>
          }
          summary={movie.summary}
        />
      </div>
    ))}
  </div>
) : (
  <div>
    <p>No movies with that name exist!</p>
  </div>
)}
    </div>
  );
 
}

export default App