/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ElectrifyOptions,
  RunResult,
  Transaction,
  UncoordinatedDatabaseAdapter,
} from "electric-sql/electric";
import {
  BatchDatabaseAdapter,
  SerialDatabaseAdapter,
} from "electric-sql/generic";
import { Statement, Row, QualifiedTablename } from "electric-sql/util";
import { Mutex } from "async-mutex";
import { ElectricConfig, electrify as baseElectrify } from "electric-sql";
import { DbSchema, ElectricClient } from "electric-sql/client/model";
import { WebSocketWeb } from "electric-sql/sockets/web";
import workerApi from "./mysql";

class ElectricDatabase {
  db: any;
  #mutex: Mutex;

  constructor(public name: string) {
    this.#mutex = new Mutex();
  }

  async exec(statement: Statement): Promise<Row[]> {
    const release = await this.#mutex.acquire();
    try {
      return workerApi.exec(statement);
    } finally {
      release();
    }
  }

  async execBatch(statements: Statement[]) {
    const release = await this.#mutex.acquire();
    try {
      return workerApi.execTransaction(statements);
    } finally {
      release();
    }
  }

  async getRowsModified() {
    return await workerApi.changes();
  }

  // Creates and opens a DB backed by an IndexedDB filesystem
  static async init(dbName: string) {
    await workerApi.init(dbName);
    return new ElectricDatabase(dbName);
  }
}

type Database = Pick<
  ElectricDatabase,
  "exec" | "name" | "getRowsModified" | "execBatch"
>;

export class MyDatabaseAdapter extends BatchDatabaseAdapter {
  readonly db: Database;
  readonly defaultNamespace = "main";

  constructor(db: Database) {
    super();
    this.db = db;
  }

  private async exec(statement: Statement): Promise<Row[]> {
    return await this.db.exec(statement);
  }

  private async getRowsModified() {
    return await this.db.getRowsModified();
  }

  async execBatch(statements: Statement[]): Promise<RunResult> {
    await this.db.execBatch(statements);
    const rowsAffected = await this.getRowsModified();

    return {
      rowsAffected,
    };
  }

  async _run(statement: Statement): Promise<RunResult> {
    await this.exec(statement);
    const rowsAffected = await this.getRowsModified();

    return {
      rowsAffected,
    };
  }

  async _query(statement: Statement): Promise<Row[]> {
    const data = await this.exec(statement);
    return data;
  }
}

export { ElectricDatabase };

export type { Database };

export const electrify = async <T extends Database, DB extends DbSchema<any>>(
  db: T,
  dbDescription: DB,
  config: ElectricConfig = {},
  opts?: ElectrifyOptions
): Promise<ElectricClient<DB>> => {
  const dbName = db.name;
  const adapter = opts?.adapter || new MyDatabaseAdapter(db);
  const socketFactory = opts?.socketFactory || WebSocketWeb;

  const client = await baseElectrify(
    dbName,
    dbDescription,
    adapter,
    socketFactory,
    config,
    opts
  );

  return client;
};
