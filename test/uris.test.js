var assert = require('assert');
var urlmap = require('../');

suite('urlmap', function() {

  var url;
  setup(function() {
    url = urlmap({
      homepage: '/',
      dashboard: {
        _root: '/dashboard/',
        email: ':emailId'
      },
      services: {
        _root: '/services/',
        google: {
          _root: 'google/',
          auth: 'auth/'
        },
        twitter: {
          _root: 'twitter/:key/',
          auth: 'auth/'
        }
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

  test('2nd level root route', function() {

    assert.equal(url('services.google'), '/services/google/');

  });

  test('2nd level route', function() {

    assert.equal(url('services.google.auth'), '/services/google/auth/');

  });

  test('2nd level root route with no data passed in', function() {

    assert.equal(url('services.twitter'), '/services/twitter/:key/');

  });

  test('2nd level route with no data passed in', function() {

    assert.equal(url('services.twitter.auth'), '/services/twitter/:key/auth/');

  });

  test('2nd level root route with data passed in', function() {

    assert.equal(url('services.twitter', { key: '123' }), '/services/twitter/123/');

  });

  test('2nd level route with data passed in', function() {

    assert.equal(url('services.twitter.auth', { key: '123' }), '/services/twitter/123/auth/');

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
