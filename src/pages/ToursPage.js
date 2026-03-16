import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { tours } from "../data";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const ToursPage = () => {
  const locations = useMemo(() => {
    const uniq = new Set(tours.map((t) => t.location));
    return ["all", ...Array.from(uniq).sort()];
  }, []);

  const maxCost = useMemo(
    () => Math.max(...tours.map((t) => Number(t.cost) || 0)),
    []
  );
  const maxDuration = useMemo(
    () => Math.max(...tours.map((t) => Number(t.duration) || 0)),
    []
  );

  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState(maxCost);
  const [duration, setDuration] = useState(maxDuration);
  const [sort, setSort] = useState("price-asc");
  const [query, setQuery] = useState("");

  const filteredTours = useMemo(() => {
    const filtered = tours.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        String(t.title).toLowerCase().includes(q) ||
        String(t.location).toLowerCase().includes(q);
      const matchesLocation = location === "all" || t.location === location;
      const matchesPrice = Number(t.cost) <= Number(price);
      const matchesDuration = Number(t.duration) <= Number(duration);
      return matchesQuery && matchesLocation && matchesPrice && matchesDuration;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sort === "price-desc") return Number(b.cost) - Number(a.cost);
      if (sort === "duration-asc") return Number(a.duration) - Number(b.duration);
      if (sort === "duration-desc") return Number(b.duration) - Number(a.duration);
      return Number(a.cost) - Number(b.cost);
    });

    return sorted;
  }, [query, location, price, duration, sort]);

  return (
    <main className="section" id="tours-page">
      <div className="section-center">
        <h2 className="text-center mb-8">All Tours</h2>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-6">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Search</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title or location"
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Location</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
                >
                  <option value="price-asc">price: low to high</option>
                  <option value="price-desc">price: high to low</option>
                  <option value="duration-asc">duration: short to long</option>
                  <option value="duration-desc">duration: long to short</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Max price: ${price}</span>
                <input
                  type="range"
                  min={0}
                  max={maxCost}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Max duration: {duration} days</span>
                <input
                  type="range"
                  min={0}
                  max={maxDuration}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
              </label>

              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setQuery("");
                    setLocation("all");
                    setPrice(maxCost);
                    setDuration(maxDuration);
                    setSort("price-asc");
                  }}
                >
                  reset
                </Button>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Showing <span className="font-medium">{filteredTours.length}</span> of{" "}
              <span className="font-medium">{tours.length}</span>
            </div>
          </CardContent>
        </Card>

        {filteredTours.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="mb-4">No tours match your filters.</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setLocation("all");
                  setPrice(maxCost);
                  setDuration(maxDuration);
                }}
              >
                clear filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="featured-center">
            {filteredTours.map((tour) => {
              return (
                <Card className="tour-card overflow-hidden" key={tour.id}>
                  <div className="tour-img-container">
                    <img src={tour.image} className="tour-img" alt={tour.title} />
                    <p className="tour-date">{tour.date}</p>
                  </div>
                  <CardContent className="tour-info">
                    <div className="tour-title">
                      <h4>{tour.title}</h4>
                    </div>
                    <p>{tour.info}</p>
                    <div className="tour-footer">
                      <p>
                        <span>
                          <i className="fas fa-map"></i>
                        </span>
                        {tour.location}
                      </p>
                      <p>{tour.duration} days</p>
                      <p>from ${tour.cost}</p>
                    </div>
                    <div className="mt-4">
                      <Button asChild>
                        <Link to={`/tours/${tour.id}`}>view details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default ToursPage;
