import configs from "@/config";

class Logger {
  static route(req) {
    if (configs.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.info(
        `[${this.getCurrentTime()}] -> ${req.method} REQUEST at ${req.originalUrl}`
      );
    }
  }

  static fired(name) {
    if (configs.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.warn(`[${this.getCurrentTime()}] -> EVENT fired: ${name}`);
    }
  }

  static handled(name, who, message) {
    if (configs.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.info(
        `[${this.getCurrentTime()}] -> ${name} EVENT handled by ${who} performing: `
      );
    }
  }

  static error(who, message) {
    if (configs.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.error(`[${this.getCurrentTime()}] -> ERROR at ${who}\nMessage: ${message}`);
    }
  }

  static log(message) {
    if (configs.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.log(`[${this.getCurrentTime()}] -> LOG: ${message}`);
    }
  }

  static getCurrentTime() {
    return new Date().toLocaleString();
  }
}

export default Logger;
