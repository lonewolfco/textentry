import { openDB } from 'idb';

const initdb = async () =>

  // Creating a new database called 'textEntry' and will be using version 1 of the database
  openDB('textEntry', 1, {
    // adding database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('textEntry')) {
        console.log('textEntry database already exists');
        return;
      }
      // creating a new object store for the data and giving it a key name of 'id'
      // autoincrementing the id value
      db.createObjectStore('textEntry', { keyPath: 'id', autoIncrement: true });
      console.log('textEntry database created');
    },
  });

// ===============PUT DB====================
// Method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('Please hold...updating database...');
  const textEntryDb = await openDB("textEntry", 1);
  const tx = textEntryDb.transaction("textEntry", "readwrite");
  const store = tx.objectStore("textEntry");
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};






// ===============GET DB====================

// Method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");
  const textEntryDb = await openDB("textEntry", 1);
  const tx = textEntryDb.transaction("textEntry", "readonly");
  const store = tx.objectStore("textEntry");
  const request = store.get(1);
  const result = await request;
  console.log("🚀 - data received from the database");
  return result;
};



initdb();
