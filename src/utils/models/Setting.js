import settings from '../../api/settings';
import BaseModel from './BaseModel';

export default class Setting extends BaseModel {
  static api = settings;
}
