import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFoundPage = () => {
  return (
    <main className="section">
      <div className="section-center" style={{ textAlign: "center" }}>
        <h2>404</h2>
        <p>The page you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">go home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
