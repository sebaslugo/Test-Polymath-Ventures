import List from "../List";
import { useQuery } from "react-query";
import { get_booking } from "../../utils/api-client";
import React from "react";

export default function Restaurants() {
  const { data } = useQuery(["allBooking"], get_booking);

  return <div>{data && data.length && <List bookings={data} />}</div>;
}
