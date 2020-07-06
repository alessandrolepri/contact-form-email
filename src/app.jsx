import React, { useState } from "react"
import ReactDOM from 'react-dom'
import axios from "axios"
import { Form, Button } from "react-bootstrap"

import { Icon } from "semantic-ui-react"

import GetInTouch from './getInTouch'

import "./module.scss";

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [result, setResult] = useState(null);

  const sendEmail = (event) => {
    event.preventDefault();
    axios
      .post("/contact", { ...state })
      .then((response) => {
        setResult(response.data);
        setState({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      })
      .catch(() => {
        setResult({
          success: false,
          message:
            "Internal error. Please try again later",
        });
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <GetInTouch />
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="Full Name"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            aria-describedby="emailHelp"
            value={state.email}
            placeholder="Your email"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="mobile">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            pattern="[0-9]*"
            name="mobile"
            value={state.mobile}
            placeholder="Your Number"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={state.message}
            rows="3"
            placeholder="Please write your message"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="privacy">
          <info>
            <p className="required-fields"> INDICATES REQUIRED FIELD </p>
          </info>
        </Form.Group>

        <Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={
              state.name.length < 5 ||
              state.message.length < 100 ||
              state.email.length < 10 ||
              state.mobile.length < 9
            }
          >
            <Icon name="paper plane" />
            SEND
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

ReactDOM.render(
  <ContactForm />,
  document.getElementById('root')
)