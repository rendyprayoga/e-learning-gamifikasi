import BaseModel from './BaseModel';
import reports from '../../api/reports';

export default class Report extends BaseModel {
  static api = reports;

  can(permission) {
    return Boolean(this.get(`Role.permissions.${permission}`));
  }
}
