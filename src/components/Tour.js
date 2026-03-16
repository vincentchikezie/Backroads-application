import React from "react";

import { Card, CardContent, CardFooter } from "./ui/card";

const Tours = ({ image, date, title, info, location, duration, cost }) => {
  return (
    <Card className="tour-card overflow-hidden">
      <div className="tour-img-container">
        <img src={image} className="tour-img" alt={title} />
        <p className="tour-date">{date}</p>
      </div>

      <CardContent className="tour-info">
        <div className="tour-title">
          <h4>{title}</h4>
        </div>
        <p>{info}</p>
        <CardFooter className="tour-footer p-0">
          <p>
            <span>
              <i className="fas fa-map"></i>
            </span>{" "}
            {location}
          </p>
          <p>{duration} days</p>
          <p>from ${cost}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Tours;
