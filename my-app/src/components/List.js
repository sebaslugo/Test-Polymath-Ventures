import { Container, Row } from "react-bootstrap";
import React from "react";
import CardRestaurant from "./Restaurant/Card";
import CardBooking from "./Booking/Card";

export default function List({ restaurants, bookings }) {
  return (
    <Container fluid="md" style={{ marginTop: "50px" }}>
      <Row xs={1} md={3}>
        {restaurants &&
          restaurants.map((elem) => (
            <CardRestaurant elm={elem} key={elem._id} />
          ))}
        {bookings &&
          bookings.map((elem) => <CardBooking elm={elem} key={elem._id} />)}
      </Row>
    </Container>
  );
}
