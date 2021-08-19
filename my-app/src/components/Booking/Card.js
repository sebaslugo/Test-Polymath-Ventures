import React from "react";
import { Card } from "react-bootstrap";

export default function Cards({ elm }) {
  return (
    <Card style={{ margin: "10px", maxWidth: "300px" }}>
      <Card.Body>
        <Card.Title>Restaurant: {elm.restaurant.name}</Card.Title>
        <Card.Text style={{ fontWeight: "500" }}>
          Client: {elm.client}.
        </Card.Text>
        <Card.Text>{elm.date}.</Card.Text>
      </Card.Body>
    </Card>
  );
}
