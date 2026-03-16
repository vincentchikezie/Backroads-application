import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-banner">
        <h1>backroads app</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          explicabo debitis est autem dicta.
        </p>
        <Button asChild className="hero-btn">
          <Link to={{ pathname: "/", hash: "#tours" }}>explore tours</Link>
        </Button>
      </div>
    </section>
  );
};
export default Hero;
