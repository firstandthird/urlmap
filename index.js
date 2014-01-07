
module.exports = function(urls) {

  function buildPath(parts, depth, path, _urls) {
    depth = depth || 0;
    path = path || '';
    _urls = _urls || urls;

    var pathBit = parts[depth];
    var pathBitType = typeof _urls[pathBit];

    if('object string'.indexOf(pathBitType) === -1) {
      throw new Error(parts.join('.') + ' not found in url list');
    }

    if(pathBitType === 'string') {
      return path += _urls[pathBit];
    }

    if(pathBitType === 'object') {
      if(typeof _urls[pathBit]._root === 'string') {
        path += _urls[pathBit]._root;
      }

      if(parts.length === depth +1) {
        return path;
      } else {
        _urls = _urls[pathBit];
        depth++;
        return buildPath(parts, depth, path, _urls);
      }
    }
  }

  return function(url, data) {
    var parts = url.split('.');
    var path = buildPath(parts);
    var field, value, re, matches, i, c;

    if(typeof data === 'object') {
      for(field in data) {
        value = data[field];
        matches = path.match(new RegExp('\\:' + field + '\\??', 'gi'));

        if(!matches) {
          throw new Error('Invalid data: ' + field + ' : ' + value);
        }

        path = path.replace(matches[0], value);
      }

      // Clean up any stragglers
      path = path.replace(/\:.+\?\/?/, '');
    }

    return path;
  };

};
