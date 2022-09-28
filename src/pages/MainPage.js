import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Joke from "../components/Joke";
import "./MainPage.css";

const MainPage = () => {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchJokeHandler();
  }, []);

  const fetchJokeHandler = async () => {
    setError(null);

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jokes-e5084-default-rtdb.europe-west1.firebasedatabase.app/jokes.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data);
      let fetchedJokes = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          fetchedJokes.push({
            id: key,
            joke: element.joke,
            author: element.author
          });
        }
      }

      console.log(fetchedJokes);
      setJokes(fetchedJokes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content;
  if (error) {
    content = error && <p>{error}</p>;
  } else if (isLoading) {
    content = isLoading && <p>Loading...</p>;
  } else {
    content = jokes.map(joke => {
      return <Joke key={joke.id} joke={joke} />;
    })
  }

  return (
    <>
      <section>
        <button className="button" onClick={fetchJokeHandler}>Fetch Joke</button>
        <Link className="button ml" to='/upload'>Upload</Link>
      </section>
      <section>
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
          alt="chuck avatar"
        />
        {content}
      </section>
    </>
  );
};

export default MainPage;
