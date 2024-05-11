import BaseModel from './BaseModel';
import questions from '../../api/questions';

export default class Questions extends BaseModel {
  static api = questions;
}
