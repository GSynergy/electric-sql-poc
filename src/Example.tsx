import { useEffect } from "react";
import { useLiveQuery } from "electric-sql/react";
import { genUUID } from "electric-sql/util";
import { Customers } from "./generated/client";
import { useElectric } from "./ElectricProvider";

import "./Example.css";

export const Example = () => {
  const { db } = useElectric()!;
  // const { results } = useLiveQuery(db.items.liveMany());

  const { results: customers } = useLiveQuery(
    db.customers.liveMany({ take: 10 })
  );

  const { results: customers1 } = useLiveQuery(db.customers.liveMany());

  console.log("customers1", customers1?.length);

  useEffect(() => {
    const syncItems = async () => {
      // Resolves when the shape subscription has been established.
      const shape = await db.customers.sync();

      // Resolves when the data has been synced into the local database.
      await shape.synced;
    };

    syncItems();
  }, []);

  // const addItem = async () => {
  //   await db.items.create({
  //     data: {
  //       value: genUUID(),
  //     },
  //   });
  // };

  function generateRandomEmail() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const domainChars = "abcdefghijklmnopqrstuvwxyz";

    function getRandomString(length: number, charSet: string) {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      return result;
    }

    const usernameLength = Math.floor(Math.random() * 6) + 5; // username length between 5 and 10
    const domainLength = Math.floor(Math.random() * 5) + 5; // domain length between 5 and 9
    const tldLength = Math.floor(Math.random() * 3) + 2; // TLD length between 2 and 4

    const username = getRandomString(usernameLength, chars);
    const domain = getRandomString(domainLength, domainChars);
    const tld = getRandomString(tldLength, domainChars);

    return `${username}@${domain}.${tld}`;
  }

  function generateRandomString(length: number) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function chunkArray(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const addCustomer = async () => {
    const _customers = [];

    for (let i = 0; i < 10; i++) {
      _customers.push({
        customerid: genUUID(),
        email: generateRandomEmail(),
        firstname: generateRandomString(10),
        lastname: generateRandomString(7),
      });
    }

    console.log("time 1", new Date().getTime());

    const chunks = chunkArray(_customers, 5000);

    for (let i = 0; i < chunks.length; i++) {
      await db.customers.createMany({ data: chunks[i] });
    }

    console.log("time 2", new Date().getTime());
  };

  const clearItems = async () => {
    await db.customers.deleteMany({ where: {} });
  };

  return (
    <div>
      <div className="controls">
        <button className="button" onClick={addCustomer}>
          Add Customer
        </button>
        <button className="button" onClick={clearItems}>
          Clear
        </button>
      </div>
      {customers?.map((customer: Customers) => (
        <p key={customer.customerid} className="item">
          <span>Name : </span> <span>{customer.firstname}</span> :{" "}
          <span>{customer.lastname}</span>
        </p>
      ))}
    </div>
  );
};
