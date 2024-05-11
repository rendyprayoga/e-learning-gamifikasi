import BaseModel from './BaseModel';
import categories from '../../api/categories';

export default class Category extends BaseModel {
  static api = categories;

  can(permission) {
    return Boolean(this.get(`Role.permissions.${permission}`));
  }
}
