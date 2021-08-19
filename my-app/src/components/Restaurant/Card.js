import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { delete_restaurant } from "../../utils/api-client";
import NewBooking from "../Booking/NewBooking";
import UpdatedRestaurant from "./UpdatedRestaurant";

export default function Cards({ elm }) {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const mutation = useMutation(async (id) => await delete_restaurant(id), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <Card style={{ margin: "10px", maxWidth: "300px" }}>
      <Card.Img variant="top" src={elm.image} />
      <Card.Body>
        <Card.Title>{elm.name}</Card.Title>
        <Card.Text style={{ fontWeight: "500" }}>{elm.city}.</Card.Text>
        <Card.Text>{elm.address}.</Card.Text>
        <Card.Text>{elm.description}</Card.Text>
        <div>
          <Button variant="warning" onClick={() => setShowUpdate(true)}>
            Edit
          </Button>
          <Button
            variant="danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              mutation.mutate(elm._id);
            }}
          >
            Delete
          </Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => setShow(true)}>
            Booking
          </Button>
        </div>
      </Card.Body>
      {show && (
        <NewBooking
          show={show}
          handleClose={() => setShow(false)}
          restaurant={elm}
        />
      )}
      {showUpdate && (
        <UpdatedRestaurant
          restaurant={elm}
          show={showUpdate}
          handleClose={() => setShowUpdate(false)}
        />
      )}
    </Card>
  );
}
