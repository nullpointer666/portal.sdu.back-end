import routeCollector from "./route-collector";
import serviceCollector from "./service-collector";
import expressLoader from "./express-loader";
import pipe from "@/pipe";
import events from "@/pipe/names";
import { logger } from "@/middleware";
import Logger from "@/services/logger";
import { init as pipeInit } from "@/pipe";
import { init as configsInit } from "@/config";
import { init as dbInit } from "./db-loader";

export default class Loaders {
  static async init(args) {
    // initializing configs
    Logger.log("Configs initializing....");
    configsInit();
    Logger.log("Configs Done");

    // initializing event-pipe
    Logger.log("EventPipe initializing....");
    pipeInit();
    Logger.log("EventPipe Done");

    pipe.emit(events.server.setup);

    // initializing mongodb connection
    Logger.log("MongoDB initializing....");
    const connection = await dbInit();
    Logger.log("MongoDB Done");

    // initializing express & middleware plugins
    Logger.log("Express initializing....");
    const app = await expressLoader();
    Logger.log("Express Done");

    // collecting services
    Logger.log("Services initializing....");
    await serviceCollector();
    Logger.log("Services Done");

    // collecting routes
    Logger.log("Routes initializing....");
    app.use("/api", logger(), await routeCollector("routes"));
    Logger.log("Routes Done");

    return { app, connection };
  }
}
