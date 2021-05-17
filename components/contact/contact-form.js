import { useState, useEffect } from "react";
import axios from 'axios'

import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const ContactForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [error, setError] = useState("")

  const submitMessageHandler = async (event) => {
    event.preventDefault();

    setRequestStatus("pending");

    axios.post('/api/contact', {
        email: emailInput,
        name: nameInput,
        message: messageInput
    }).then(response => {
        setRequestStatus("success")
        setEmailInput('')
        setNameInput('')
        setMessageInput('')
    }).catch(error => {
        setRequestStatus("error")
        setError(error)
    })
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: error.message || "Something went wrong",
    };
  }

  useEffect(() => {

    if(requestStatus === 'success' || requestStatus === 'error') {
         const timer = setTimeout(() => {
           setRequestStatus(null);
         }, 3000);
         return () => {
           clearTimeout(timer);
         };
    }
     
  }, [requestStatus])

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
