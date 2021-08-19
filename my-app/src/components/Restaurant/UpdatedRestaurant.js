import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { update_restaurant } from "../../utils/api-client";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  image: yup.string().required(),
  description: yup.string(),
  id: yup.string(),
});

export default function Canvas({ show, handleClose, restaurant }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (data) => await update_restaurant(data), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
      handleClose();
    },
  });

  return (
    <Offcanvas show={show} onHide={handleClose} backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Restaurant</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
          initialValues={{
            name: restaurant.name,
            address: restaurant.address,
            image: restaurant.image,
            description: restaurant.description,
            city: restaurant.city,
            id: restaurant._id,
          }}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik02">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  isValid={touched.city && !errors.city}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik02">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  isValid={touched.city && !errors.city}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={values.image}
                  isValid={touched.image && !errors.image}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik04">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={values.address}
                  isValid={touched.address && !errors.address}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="validationFormik05">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  isValid={touched.description && !errors.description}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Updated</Button>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
