import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client for the files manager application.
 */
class DBClient {
  /**
   * Initializes a new DBClient instance and establishes a connection to
   * the MongoDB server.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if the client is connected to the MongoDB server.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the total count of users in the database.
   * @returns {Promise<number>} The number of users.
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Retrieves the total count of files in the database.
   * @returns {Promise<number>} The number of files.
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Gets a reference to the 'users' collection.
   * @returns {Promise<Collection>} A Promise that resolves to
   * the users collection.
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Gets a reference to the 'files' collection.
   * @returns {Promise<Collection>} A Promise that resolves to the
   * files collection.
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
