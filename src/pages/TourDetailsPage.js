import { Link, useParams } from "react-router-dom";
import { tours } from "../data";
import { Button } from "../components/ui/button";

const TourDetailsPage = () => {
  const { id } = useParams();
  const tour = tours.find((t) => String(t.id) === String(id));

  if (!tour) {
    return (
      <main className="section">
        <div className="section-center" style={{ textAlign: "center" }}>
          <h2>Tour not found</h2>
          <Button asChild>
            <Link to="/tours">back to tours</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="section-center">
        <div className="mb-4">
          <Button variant="outline" asChild>
            <Link to="/tours">back</Link>
          </Button>
        </div>

        <article className="tour-card" style={{ marginBottom: 0 }}>
          <div className="tour-img-container">
            <img src={tour.image} className="tour-img" alt={tour.title} />
            <p className="tour-date">{tour.date}</p>
          </div>
          <div className="tour-info">
            <div className="tour-title">
              <h2 style={{ marginBottom: 0 }}>{tour.title}</h2>
            </div>
            <p>{tour.info}</p>
            <div className="tour-footer" style={{ marginTop: "1rem" }}>
              <p>
                <span>
                  <i className="fas fa-map"></i>
                </span>
                {tour.location}
              </p>
              <p>{tour.duration} days</p>
              <p>from ${tour.cost}</p>
            </div>

            <div className="mt-6">
              <Button asChild>
                <Link to="/contact">book this tour</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default TourDetailsPage;
