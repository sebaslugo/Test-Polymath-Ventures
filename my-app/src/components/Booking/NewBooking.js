import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Offcanvas, Form, Button, Alert } from "react-bootstrap";
import { new_booking } from "../../utils/api-client";
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  client: yup.string().required(),
  restaurant: yup.string().required(),
  date: yup.date().required(),
});

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={(val) => {
        onChange(name, val);
      }}
    />
  );
};

export default function Canvas({ show, handleClose, restaurant }) {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(async (data) => await new_booking(data), {
    onSuccess: (error) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["allBooking"]);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(null);
        handleClose();
      }
      /*  */
    },
  });

  return (
    <Offcanvas show={show} onHide={handleClose} backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{`Booking - ${restaurant.name}`}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
          initialValues={{
            client: "",
            restaurant: restaurant._id,
            date: new Date(),
          }}
        >
          {({ handleSubmit, handleChange, errors, values, setFieldValue }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Client</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Client"
                  name="client"
                  onChange={handleChange}
                  isInvalid={!!errors.client}
                  values={values.client}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.client}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Date</Form.Label>
                <DatePickerField
                  name="date"
                  value={values.date}
                  onChange={setFieldValue}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">Create</Button>
              {error && (
                <Alert style={{ marginTop: "10px" }} variant="danger">
                  Error: {error}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
