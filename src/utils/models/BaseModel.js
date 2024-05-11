import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

/**
 * Base utility model.
 */
export default class Base {
  /**
   * API module.
   */
  static api;

  /**
   * Make model out of data attribute.
   *
   * @param {Object|Array} data
   * @returns {this|this[]}
   */
  static make(data) {
    if (Array.isArray(data)) {
      return data.map((attributes) => new this(attributes));
    }

    return new this(data);
  }

  /**
   * Fetch items and instantiate them.
   *
   * @param {Object} params
   * @returns {Object}
   */
  static async fetch(params) {
    const response = await this.api.fetch(params);
    const data = this.make(response.data.data);
    const meta = response.data.meta;

    return { response, data, meta };
  }

  /**
   * Fetch an item by ID and instantiate them.
   *
   * @param {Number} id
   * @returns {Object}
   */
  static async fetchByID(id) {
    const response = await this.api.fetchByID(id);
    const data = this.make(response.data.data);

    return { response, data };
  }

  /**
   * @param {Object} attributes
   */
  constructor(attributes = {}) {
    this._attributes = attributes;

    Object.defineProperty(this, '_attributes', { enumerable: false });
    this._defineAttributes(attributes);
  }

  /**
   * Get attribute by Lodash path.
   *
   * @param {String|Array} path
   * @returns {mixed}
   */
  get(path) {
    return get(this, path);
  }

  /**
   * Return a copy of the model's attributes object.
   *
   * @returns {Object}
   */
  toJSON() {
    const clone = (value) => {
      if (value?.toJSON) {
        return value.toJSON();
      }

      if (Array.isArray(value)) {
        return value.reduce((result, value) => {
          result.push(clone(value));
          return result;
        }, []);
      }

      if (typeof value === 'object') {
        return cloneDeep(value);
      }

      return value;
    };

    return Object.entries(this._attributes).reduce((result, [key, value]) => {
      result[key] = clone(value);
      return result;
    }, {});
  }

  /**
   * Define public attributes.
   */
  _defineAttributes(attributes) {
    for (const key of Object.keys(attributes)) {
      Object.defineProperty(this, key, {
        get: () => this._attributes[key],
        enumerable: true,
      });
    }
  }
}
