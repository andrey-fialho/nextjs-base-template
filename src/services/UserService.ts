import { AxiosInstance } from 'axios';

export class UserService {
  private _api: AxiosInstance;
  private base: string = 'users/';

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  me(username: string) {
    return this._api.get(`${this.base}${username}`);
  }
}
