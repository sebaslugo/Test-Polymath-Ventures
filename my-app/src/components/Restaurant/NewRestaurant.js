import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { new_restaurant } from "../../utils/api-client";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  image: yup.string().required(),
  description: yup.string(),
});
export default function Canvas({ show, handleClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (data) => await new_restaurant(data), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
      handleClose();
    },
  });

  return (
    <Offcanvas show={show} onHide={handleClose} backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New Restaurant</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
          initialValues={{
            name: "",
            address: "",
            image: "",
            description: "",
            city: "",
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
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                  values={values.city}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik01">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onChange={handleChange}
                  values={values.address}
                  isValid={touched.address && !errors.address}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image"
                  name="image"
                  onChange={handleChange}
                  values={values.image}
                  isInvalid={!!errors.image}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="textArea"
                  name="description"
                  values={values.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit">Create</Button>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
