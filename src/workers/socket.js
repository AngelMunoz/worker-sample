import { log } from "../services/log";

/**
 * @type {WebSocket}
 */
let socket;

function logSocket(data) {
  log("[WebSocket %s] -", "log", data);
}

function onConnect(workerEvent) {
  socket = new WebSocket(
    "wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
  );
  socket.addEventListener("open", (event) => {
    const data = { type: "ConnectionEvent", action: "open" };
    logSocket(data);
    postMessage(data);
  });

  socket.addEventListener("message", (event) => {
    const data = {
      type: "ConnectionEvent",
      action: "message",
      data: event.data,
    };
    logSocket(data);
    postMessage(data);
  });
  socket.addEventListener("close", (event) => {
    const data = {
      type: "ConnectionEvent",
      action: "close",
      reason: event.reason,
    };
    logSocket(data);
    postMessage(data);
  });
  socket.addEventListener("error", (event) => {
    const data = {
      type: "ConnectionEvent",
      action: "error",
      reason: event,
    };
    logSocket(data);
    postMessage(data);
  });
}

addEventListener("message", (event) => {
  if (!socket && event.data === "connect") {
    onConnect(event);
  }
  if (event.data?.type === "ConnectionEvent" && event.data?.action === "send") {
    const data = event?.data?.data ?? "";
    const payload =
      typeof data === "string" ? data : JSON.stringify(event.data.data);
    logSocket(`sending message: ${payload}`);
    socket.send(payload);
  }
});
