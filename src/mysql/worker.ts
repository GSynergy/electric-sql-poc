/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Comlink from "comlink";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
import { Statement } from "electric-sql/util";

const log = console.log;
const error = console.error;

class AppWorker {
  db: any;

  constructor() {}

  async start(name: string) {
    try {
      log("Loading and initializing SQLite3 module...");
      const sqlite3 = await sqlite3InitModule({ print: log, printErr: error });
      log("Done initializing. Running demo...");
      log("Running SQLite3 version", sqlite3.version.libVersion);
      this.db =
        "opfs" in sqlite3
          ? new sqlite3.oo1.OpfsDb("/" + name)
          : new sqlite3.oo1.DB("/" + name, "ct");
      log(
        "opfs" in sqlite3
          ? `OPFS is available, created persisted database at ${this.db.filename}`
          : `OPFS is not available, created transient database ${this.db.filename}`
      );
    } catch (err) {
      error("Initialization error:", err);
    }
  }

  async exec(statement: Statement) {
    const _statement: any = {
      sql: statement.sql,
      returnValue: "resultRows",
      rowMode: "object",
    };

    if (statement.args !== undefined) {
      _statement["bind"] = statement.args;
    }

    const data = await this.db.exec(_statement);

    return data;
  }

  async execTransaction(statements: Statement[]) {
    await this.db.transaction(function (db: any) {
      statements.forEach((statement) => {
        const _statement: any = {
          sql: statement.sql,
        };

        if (statement.args !== undefined) {
          _statement["bind"] = statement.args;
        }

        db.exec(_statement);
      });
    });
  }

  async changes() {
    const changes = await this.db.exec({
      sql: "SELECT changes() AS changes",
      returnValue: "resultRows",
      rowMode: "array",
    });

    return changes[0][0];
  }
}

const appWorker = new AppWorker();

const workerExports = {
  init: appWorker.start,
  exec: appWorker.exec,
  changes: appWorker.changes,
  execTransaction: appWorker.execTransaction,
};

export type WorkerType = typeof workerExports;

Comlink.expose(workerExports);
