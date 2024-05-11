import BaseModel from './BaseModel';
import answers from '../../api/answers';

export default class Answer extends BaseModel {
  static api = answers;
}
