import BaseModel from './BaseModel';
import users from '../../api/users';

export default class User extends BaseModel {
  static api = users;

  can(permission) {
    return Boolean(this.get(`Role.permissions.${permission}`));
  }
}
