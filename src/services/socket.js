// a set of functions to interact with the web worker without exposing it to the rest of the code

import logger from "./log";

const worker = new Worker(new URL("../workers/socket.js", import.meta.url));

export function subscribe(onMessage) {
  if (!onMessage || typeof onMessage !== "function") {
    logger.warn("Subscription callback is not a function");
  }
  // send a connection event to the worker
  worker.postMessage("connect");
  // and add a shared listener so we can remove the listener later
  const listener = (event) => {
    logger.debug(event);
    if (
      event.data?.type === "ConnectionEvent" &&
      event.data?.action === "message"
    ) {
      onMessage(event);
    }
  };
  worker.addEventListener("message", listener);
  return () => worker.removeEventListener("message", listener);
}

export function sendMessage(data) {
  worker.postMessage({
    type: "ConnectionEvent",
    action: "send",
    data,
  });
}

export function disconnectSocket() {
  worker.postMessage("disconnect");
}
