import "./Joke.css";

const Joke = ({joke}) => {

  return (
    <div className="joke">
      <h3>{joke.joke}</h3>
      <p>{joke.author}</p>
    </div>
  );
};

export default Joke;
