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
      // creating a new objject store for the data and giving it a key name of 'id'
      // autoincrementing the id value
      db.createObjectStore('textEntry', { keyPath: 'id', autoIncrement: true });
      console.log('textEntry database created');
    },
  });

// ===============POST DB====================
// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Please hold...updating database...');
    // Create a connection to the database database and version we want to use.
    const textEntryDb = await openDB('textEntry', 1);
    // Create a new transaction and specify the database and data privileges.
    const tx = textEntryDb.transaction('textEntry', 'readwrite');
    // Open up the desired object store.
    const store = tx.objectStore('textEntry');
    // Use the .add() method on the store and pass in the content.
    const request = store.add({ textContent: content });
    // Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  return result;
 };






// ===============GET DB====================
// Method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // Create a connection to the database database and version we want to use.
  const textEntryDb = await openDB('textEntry', 1);
   // Create a new transaction and specify the database and data privileges.
  const tx = textEntryDb.transaction('textEntry', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('textEntry');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
 };

initdb();
