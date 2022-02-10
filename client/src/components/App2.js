import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Orders from "./Orders";
import { api } from "../api/Api";
// const ENDPOINT = "http://127.0.0.1:9000";
const ENDPOINT = api;

function App2() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <Orders />
    </div>
  );
}

export default App2;
