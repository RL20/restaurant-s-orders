import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
// const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  // Create WebSocket connection.
  // const socket = new WebSocket("ws://localhost:3000");

  /***********
    Client1
    <button onclick="sendMessage()">Send Msg</button>

    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:3000');

    // Connection opened
    socket.addEventListener('open', function (event) {
        console.log('Connected to WS Server')
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

    const sendMessage = () => {
        socket.send('Hello From Client1!');
    }
		 */
  const [formInputsValidity, setFormInputsValidity] = useState({
    // name: true,
    street: true,
    city: true,
    phone: true,
    // postalCode: true,
  });

  // const nameInputRef = useRef();
  const streetInputRef = useRef();
  // const postalCodeInputRef = useRef();
  const phoneInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    // const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);
    // const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputsValidity({
      // name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      phone: enteredPhoneIsValid,
      // postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid = enteredStreetIsValid && enteredCityIsValid && enteredPhoneIsValid;
    // const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPhoneIsValid;
    // const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      // name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      phone: enteredPhone,
      // postalCode: enteredPostalCode,
    });
  };

  // const nameControlClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`;
  // const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`;
  const phoneCodeControlClasses = `${classes.control} ${formInputsValidity.phone ? "" : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {/* <div className={nameControlClasses}>
        <label htmlFor="name">שם מלא</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div> */}

      <div className={streetControlClasses}>
        <label htmlFor="street">רחוב</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">עיר</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={phoneCodeControlClasses}>
        <label htmlFor="phone">טלפון</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>Please enter a valid phone Number!</p>}
      </div>
      {/* <div className={postalCodeControlClasses}>
        <label htmlFor="postal">מיקוד</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (6 characters long)!</p>}
      </div> */}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          ביטול
        </button>
        <button className={classes.submit}>אישור</button>
      </div>
    </form>
  );
};

export default Checkout;
