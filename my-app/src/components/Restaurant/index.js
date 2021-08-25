import ListRestaurant from "../List";
import NewRestaurant from "./NewRestaurant";
import { useQuery } from "react-query";
import { get_restaurants } from "../../utils/api-client";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

export default function Restaurants() {
  const { data } = useQuery(["todos"], get_restaurants);
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button
        style={{ marginLeft: "120px", marginTop: "20px", width: "200px" }}
        onClick={() => setShow(true)}
      >
        New
      </Button>
      {data && data.length && <ListRestaurant restaurants={data} />}
      <NewRestaurant show={show} handleClose={() => setShow(false)} />
    </div>
  );
}
