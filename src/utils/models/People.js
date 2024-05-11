import people from '../../api/people';
import BaseModel from './BaseModel';

export default class People extends BaseModel {
  static api = people;
}
