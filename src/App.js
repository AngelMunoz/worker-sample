import "./App.css";
import logo from "./logo.svg";
import { useEffect, useState } from "react";
// use our services
import logger from "./services/log";
import { subscribe, sendMessage } from "./services/socket";

function App() {
  const [logs, setLog] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe((event) => {
      logger.debug(event);
      setLog((logs) => [event, ...logs]);
    });
    // not used here, but in case we need to
    // we provide cleanup function that removes the listener
    // to the web socket
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={() => {
            sendMessage({ message: "sending stuff" });
          }}
        >
          Send Message
        </button>
        {/* dummy logger here */}
        <pre className="log">
          {logs.map(({ data }, i) => {
            return (
              <p key={i}>
                {data.type} - {data.action} - {JSON.stringify(data)}
              </p>
            );
          })}
        </pre>
      </header>
    </div>
  );
}

export default App;
