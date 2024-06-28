import * as Comlink from "comlink";

const worker = new Worker(new URL("worker.ts", import.meta.url), {
  type: "module",
});

const workerApi = Comlink.wrap<import("./worker").WorkerType>(worker);

export default workerApi;
