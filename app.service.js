/**
 * Handles Data Access and manipulation for app
 */
class DataService {
  constructor() {
    // initialize by loading persistent data from storage media and computing metric sums
    this.valueStore = {};
    this.metricSumStore = {};
    console.log("Storage initialized");
  }

  /**
   * Inserts new value or Updates existing value store for the key provided
   * @param {string} key - metrics key
   * @param {number} newValue - metrics value
   * @returns {void}
   */
  updateKey(key, newValue) {
    if (this.valueStore[key]) {
      this.valueStore[key].push({
        val: newValue,
        ts: Date.now()
      });
    } else {
      this.valueStore[key] = [
        {
          val: newValue,
          ts: Date.now()
        }
      ]
    }

    // now, increment sum for the key by the newValue provided in the metricSumStore
    if (this.metricSumStore[key]) {
      this.metricSumStore[key] += newValue;
    } else {
      // key doesn't exist in metricSumStore before, so set a new value instead
      this.metricSumStore[key] = newValue
    }
  }

  /**
   * Fetches 1-hour window sum for the provided key
   * @param {string} key - metrics key
   * @returns {Number}
   */
  getSumForKey(key) {

    this.removeOldValues(key);
    const sum = this.metricSumStore[key] || 0;
    return Math.round(sum);
  }

  /**
   * Removes values older than 1 hour from the values store
   * and updates the metricSumStore for the current key
   * @param {string} key - metrics key
   * @returns {Number}
   */
  removeOldValues(key) {

    const currentTime = Date.now();
    const oneHourAgo = 60 * 60 * 1000;

    let deletedValuesSum = 0;

    const values = [ ...(this.valueStore[key] || []) ];
    for (let data of values) {
      if (currentTime - data.ts > oneHourAgo) {
        // add to deleted Values' Sum
        deletedValuesSum += data.val;
        // remove this value from store
        this.valueStore[key].shift();
      } else {
        break;
      }
    }

    this.metricSumStore[key] = (this.metricSumStore[key] || 0) - deletedValuesSum;
    return deletedValuesSum;
  }
}


module.exports = new DataService();
