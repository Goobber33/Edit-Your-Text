import { openDB } from 'idb';

const initializeDatabase = async () => {
  return openDB('jateDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jateStore')) {
        db.createObjectStore('jateStore', { keyPath: 'id', autoIncrement: true });
        console.log('jateDB database created');
      } else {
        console.log('jateDB database already exists');
      }
    },
  });
};

export const saveToDb = async (data) => {
  const database = await initializeDatabase();
  const transaction = database.transaction('jateStore', 'readwrite');
  const objectStore = transaction.objectStore('jateStore');
  const dbResponse = await objectStore.put({ jate: data });
  console.log("Data stored to the database", dbResponse);
  return transaction.done;
};

export const retrieveFromDb = async () => {
  const database = await initializeDatabase();
  const transaction = database.transaction('jateStore', 'readonly');
  const objectStore = transaction.objectStore('jateStore');
  const queryResult = await objectStore.getAll();
  console.log(queryResult);
  return queryResult;
};

initializeDatabase();
