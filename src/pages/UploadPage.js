import { useState } from "react";
import { Link } from "react-router-dom";
import './UploadPage.css'

function UploadPage() {
  const [joke, setJoke] = useState();
  const [author, setAuthor] = useState();

  const uploadJoke = async () => {
    try {
      const jokeObject = {
        joke,
        author,
      };

      const response = await fetch(
        "https://jokes-e5084-default-rtdb.europe-west1.firebasedatabase.app/jokes.json",
        {
          method: "POST",
          body: JSON.stringify(jokeObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <button className="button" onClick={uploadJoke}>Upload Joke</button>
        <Link className="button ml" to='/'>See Jokes</Link>
      </section>
      <section>
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
          alt="chuck avatar"
        />
        <form>
          <section className="df dc">
            <div className="df">
            <label htmlFor="joke">Joke:</label>
            <input
              type="text"
              name="joke"
              id="joke"
              onChange={(e) => setJoke(e.target.value)}
              value={joke}
            />
            </div>
            <div className="df">

            <label htmlFor="author">Author name:</label>
            <input
              type="text"
              name="author"
              id="author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            </div>
            </section>
        </form>
      </section>
    </>
  );
}

export default UploadPage;
