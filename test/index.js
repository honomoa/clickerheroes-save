var parse = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isPlainObject = require('lodash.isplainobject');
var fs = require('graceful-fs');
var path = require('path');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(parse));
});

test('works', function(t) {
  t.plan(5);
  var fix = path.resolve(__dirname, './fixture.txt');
  fs.readFile(fix, {encoding: 'ascii'}, function(error, data) {
    var parsed = parse(data);
    t.ok(isPlainObject(parsed));
    t.equal(parsed.lastSkillUsed, 0);
    t.equal(parsed.primalSouls, 2);
    t.equal(parsed.kongId, '');
    t.equal(parsed.currentZoneHeight, 123);
  });
});