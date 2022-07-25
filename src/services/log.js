// a fake log service just to test if we can actually import things in our worker as well as our non-worker code

export function log(format = "[%s] - ", level, message) {
  const time = new Date().toLocaleTimeString();
  switch (level) {
    case "warn":
      console.warn(format, time, message);
      break;
    case "error":
      console.error(format, time, message);
      break;
    case "debug":
      console.debug(format, time, message);
      break;
    case "log":
    default:
      console.log(format, time, message);
      break;
  }
}
const logger = {
  info(...args) {
    log("[Info: %s]", "log", ...args);
  },
  warn(...args) {
    log("[Warn: %s]", "warn", ...args);
  },
  error(...args) {
    log("[Error: %s]", "error", ...args);
  },
  debug(...args) {
    log("[Debug: %s]", "debug", ...args);
  },
};

export default logger;
