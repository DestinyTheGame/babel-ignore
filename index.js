'use strict';

var path = require('path');

/**
 * Automated babel-ignore to stop ignoring node_modules that choose to opt-in to
 * the babel compilation step so they can be published without having to compile
 * code.
 *
 * @param {String} file File path of the item we might transform.
 * @returns {Boolean} Ignore this file from compiling.
 * @public
 */
module.exports = function babelignore(file) {
  var dir = path.dirname(file);
  var ignore = true;

  while(dir !== path.resolve(dir, '..')) {
    try {
      var root = require(path.resolve(dir, 'package.json'));

      //
      // We've reached the root of a module, as we found a package.json
      // and nothing was thrown while doing a require call.
      //
      // If we have a babel directive in our `package.json` we know it
      // requires an addition compilation step and it should *not* be
      // ignored.
      //
      if (root['babel-ignore'] === false) {
        ignore = false;
        break;
      }

      break;
    } catch (e) {
      dir = path.resolve(dir, '..');
    }
  }

  return ignore;
};
