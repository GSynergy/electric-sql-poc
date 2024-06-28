export default [
  {
    "statements": [
      "CREATE TABLE \"items\" (\n  \"value\" TEXT NOT NULL,\n  CONSTRAINT \"items_pkey\" PRIMARY KEY (\"value\")\n);\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings (namespace, tablename, flag) VALUES ('main', 'items', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;",
      "CREATE TRIGGER update_ensure_main_items_primarykey\n  BEFORE UPDATE ON \"main\".\"items\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"value\" != new.\"value\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column value as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_items_into_oplog;",
      "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_patch('{}', json_object('value', new.\"value\")), json_object('value', new.\"value\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_items_into_oplog;",
      "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_patch('{}', json_object('value', new.\"value\")), json_object('value', new.\"value\"), json_object('value', old.\"value\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_items_into_oplog;",
      "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_patch('{}', json_object('value', old.\"value\")), NULL, json_object('value', old.\"value\"), NULL);\nEND;"
    ],
    "version": "1"
  },
  {
    "statements": [
      "CREATE TABLE \"customers\" (\n  \"customerid\" TEXT NOT NULL,\n  \"firstname\" TEXT,\n  \"lastname\" TEXT,\n  \"email\" TEXT,\n  CONSTRAINT \"customers_pkey\" PRIMARY KEY (\"customerid\")\n);\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings (namespace, tablename, flag) VALUES ('main', 'customers', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_customers_primarykey;",
      "CREATE TRIGGER update_ensure_main_customers_primarykey\n  BEFORE UPDATE ON \"main\".\"customers\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"customerid\" != new.\"customerid\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column customerid as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_customers_into_oplog;",
      "CREATE TRIGGER insert_main_customers_into_oplog\n   AFTER INSERT ON \"main\".\"customers\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'customers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'customers', 'INSERT', json_patch('{}', json_object('customerid', new.\"customerid\")), json_object('customerid', new.\"customerid\", 'email', new.\"email\", 'firstname', new.\"firstname\", 'lastname', new.\"lastname\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_customers_into_oplog;",
      "CREATE TRIGGER update_main_customers_into_oplog\n   AFTER UPDATE ON \"main\".\"customers\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'customers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'customers', 'UPDATE', json_patch('{}', json_object('customerid', new.\"customerid\")), json_object('customerid', new.\"customerid\", 'email', new.\"email\", 'firstname', new.\"firstname\", 'lastname', new.\"lastname\"), json_object('customerid', old.\"customerid\", 'email', old.\"email\", 'firstname', old.\"firstname\", 'lastname', old.\"lastname\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_customers_into_oplog;",
      "CREATE TRIGGER delete_main_customers_into_oplog\n   AFTER DELETE ON \"main\".\"customers\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'customers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'customers', 'DELETE', json_patch('{}', json_object('customerid', old.\"customerid\")), NULL, json_object('customerid', old.\"customerid\", 'email', old.\"email\", 'firstname', old.\"firstname\", 'lastname', old.\"lastname\"), NULL);\nEND;"
    ],
    "version": "2"
  }
]