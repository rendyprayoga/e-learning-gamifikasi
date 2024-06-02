import BaseModel from './BaseModel';
import ranks from '../../api/ranks';

export default class Rank extends BaseModel {
  static api = ranks;
}
