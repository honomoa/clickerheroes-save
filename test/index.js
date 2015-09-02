var parse = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isPlainObject = require('lodash.isplainobject');
var fs = require('graceful-fs');
var path = require('path');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(parse.decode));
});

test('works', function(t) {
  t.plan(5);
  var fix = path.resolve(__dirname, './fixture.txt');
  fs.readFile(fix, {encoding: 'ascii'}, function(error, data) {
    var parsed = parse.decode(data.toString());
    t.ok(isPlainObject(parsed));
    t.equal(parsed.lastSkillUsed, 0);
    t.equal(parsed.primalSouls, 2);
    t.equal(parsed.kongId, '');
    t.equal(parsed.currentZoneHeight, 123);
  });
});

test('throws on cheating', function(t) {
  t.plan(1);
  var fix = path.resolve(__dirname, './cheat.txt');
  fs.readFile(fix, {encoding: 'ascii'}, function(error, data) {
    t.throws(function() {
      parse.decode(data.toString());
    }, /Anti-cheat/);
  });
});
