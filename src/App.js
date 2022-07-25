import { useEffect, useState } from "react";
import { subscribe, sendMessage } from "./services/socket";
import logo from "./logo.svg";
import "./App.css";
import logger from "./services/log";

function App() {
  const [logs, setLog] = useState([]);

  useEffect(() => {
    const sub = subscribe((event) => {
      logger.debug(event);
      setLog((logs) => [event, ...logs]);
    });
    return sub;
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
