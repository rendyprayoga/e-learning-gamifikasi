import roles from '../../api/roles';
import BaseModel from './BaseModel';

export default class Role extends BaseModel {
  static api = roles;
}
