import { sum } from "./Math.js";
import { range } from "./Arrays.js";

const Random = {
  /**
   * 
   * @param {number} min inclusive
   * @param {number} max inclusive
   * @returns {number} a number min <= x <= max
   */
  int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * @returns {boolean} 50/50 chances
   */
  coinToss() {
    return this.int(0, 9) >= 5;
  },

  /**
   * @returns {string} a letter from a-Z
   */
  letter() {
    const code = this.coinToss() ? this.int(65, 90) : this.int(97, 122);
    return String.fromCharCode(code);
  },

  /**
   * @param {number} len the length of the string to return.
   * @returns {string} a string of letters.
   */
  string(len = 8) {
    return sum(range(0, len).map(_ => this.letter()), "");
  },

  /**
   * @returns {string} a string of letters and numbers 8 - 16 characters long.
   */
  chain() {
    const length = this.int(8, 16);
    return sum(
      range(0, length).map(
        _ => this.coinToss() ? this.int(0, 9) : this.letter()
      ), ""
    );
  },

  /**
   * @param {Array} arr an array
   * @returns {Array} a new array with the same items but in random order
   */
  shuffle(arr) {
    if (!Array.isArray(arr)) return undefined;
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      let j = this.int(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

export default Random;
 