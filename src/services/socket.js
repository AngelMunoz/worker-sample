import logger from "./log";

const worker = new Worker(new URL("../workers/socket.js", import.meta.url));

export function subscribe(onMessage) {
  if (!onMessage || typeof onMessage !== "function") {
    logger.warn("Subscription callback is not a function");
  }
  worker.postMessage("connect");
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
  return () => {
    worker.postMessage("disconnect");
    worker.removeEventListener("message", listener);
  };
}

export function sendMessage(data) {
  worker.postMessage({
    type: "ConnectionEvent",
    action: "send",
    data,
  });
}
