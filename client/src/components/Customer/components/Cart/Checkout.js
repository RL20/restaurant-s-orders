import { useRef, useState } from "react";

import classes from "./Checkout.module.css";
import validator from "validator";

const isValidPhoneNumber = (value) => validator.isMobilePhone(value, "he-IL") === true;
const isValidPhisAlphanumeric = (value) => validator.isAlphanumeric(value.split(" ").join(""), "he") && parseInt(value.trim().length) >= 3;
const isEmpty = (value) => value.trim() === "";
const isTwoChars = (value) => parseInt(value.trim().length) >= 2;

const Checkout = (props) => {
  /***********
		<body>
    Client1
    <button onclick="sendMessage()">Send Msg</button>
</body>
<script>
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
</script> 
		 */

  const [formInputsValidity, setFormInputsValidity] = useState({
    street: true,
    city: true,
    phone: true,
  });

  const streetInputRef = useRef();
  const phoneInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredStreetIsValid = isValidPhisAlphanumeric(enteredStreet);
    const enteredCityIsValid = isValidPhisAlphanumeric(enteredCity);
    const enteredPhoneIsValid = isValidPhoneNumber(enteredPhone);
    // const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputsValidity({
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsValid = enteredStreetIsValid && enteredCityIsValid && enteredPhoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      street: enteredStreet,
      city: enteredCity,
      phone: enteredPhone,
    });
  };

  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`;
  const phoneCodeControlClasses = `${classes.control} ${formInputsValidity.phone ? "" : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={streetControlClasses}>
        <label htmlFor="street">????????</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>?????? ????????/?? ???? ???????? ???????? ????????????! (3 ???????????? ?????????? )</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">??????</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>?????? ????????/?? ???? ?????? ???????? ????????????! (3 ???????????? ??????????)</p>}
      </div>
      <div className={phoneCodeControlClasses}>
        <label htmlFor="phone">??????????</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputsValidity.phone && <p>!?????? ???????? ???????? ?????????? ????????</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          ??????????
        </button>
        <button className={classes.submit}>??????????</button>
      </div>
    </form>
  );
};

export default Checkout;
