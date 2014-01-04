var assert = require('assert');
var uris = require('../');

suite('uris', function() {

  var url;
  setup(function() {
    url = uris({
      homepage: '/',
      dashboard: {
        _root: '/dashboard/',
        email: ':emailId'
      },
      services: {
        _root: '/services/',
        google: 'auth/google'
      },
      user: '/users/:id?'
    });
  });

  test('basic route', function() {

    assert.equal(url('homepage'), '/');

  });

  test('route with children', function() {

    assert.equal(url('dashboard'), '/dashboard/');

  });

  test('child route', function() {

    assert.equal(url('dashboard.email'), '/dashboard/:emailId');

  });

  test('child route with data', function() {

    assert.equal(url('dashboard.email', { emailId: 123 }), '/dashboard/123');
  });

  test('child route with invalid data', function() {

    assert.throws(function() {
      url('dashboard.email', { blah: 123 });
    });

  });

  test('route with optional param', function() {

    assert.equal(url('user'), '/users/:id?');

  });

  test('route with optional param and empty data', function() {

    assert.equal(url('user', {}), '/users/');

  });

  test('route with optional param and data', function() {

    assert.equal(url('user', { id: '123' }), '/users/123');

  });

});
