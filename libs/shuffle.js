import { shuffle } from 'lodash-es';

// provide a shuffle algorithm
export default function _shuffle(array) {
  // just a wrapper here, a more sophiscated version could go here
  return shuffle(array);
}