import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client wrapper with enhanced functionality.
 */
class RedisClient {
  /**
   * Initializes a new RedisClient instance and sets up event listeners.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client connection error:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if the Redis client is currently connected.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Asynchronously retrieves the value associated with the given key.
   * @param {string} key The key to retrieve the value for.
   * @returns {Promise<string|null>} The value associated with the key, or
   * null if not found.
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Asynchronously sets a key-value pair with an expiration time.
   * @param {string} key The key to set.
   * @param {string|number|boolean} value The value to store.
   * @param {number} duration The expiration time in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Asynchronously deletes the specified key and its associated value.
   * @param {string} key The key to delete.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
