/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const { user } = req;
    const myToken = uuidv4();

    await redisClient.set(`auth_${myToken}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ myToken });
  }

  static async getDisconnect(req, res) {
    const myToken = req.headers['x-myToken'];

    await redisClient.del(`auth_${myToken}`);
    res.status(204).send();
  }
}
