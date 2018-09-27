(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*global cEngine */

(function (cEngine) {

  var MOUSE_LEFT_TOUCH = "MOUSE_LEFT_TOUCH";

  var inputPlugin = {

    create: function create(config) {
      config = config || {};

      var input = {

        cEnginePlugin: {
          name: 'inputPlugin',
          version: '0.0.6'
        },
        engine: undefined,
        keys: {},
        touches: [],

        init: function init(engine) {
          input.engine = engine;

          input.engine.canvas.addEventListener('touchstart', input.touchstart);
          input.engine.canvas.addEventListener('touchmove', input.touchmove);
          input.engine.canvas.addEventListener('touchend', input.touchend);
          input.engine.canvas.addEventListener('touchcancel', input.touchend);

          input.engine.canvas.addEventListener('mousedown', input.mousedown);
          input.engine.canvas.addEventListener('mousemove', input.mousemove);
          window.document.addEventListener('mouseup', input.mouseup);

          window.document.addEventListener('keydown', input.onKeydown);
          window.document.addEventListener('keyup', input.onKeyup);
        },

        destroy: function destroy() {
          input.engine.canvas.removeEventListener('touchstart', input.touchstart);
          input.engine.canvas.removeEventListener('touchmove', input.touchmove);
          input.engine.canvas.removeEventListener('touchend', input.touchend);
          input.engine.canvas.removeEventListener('touchcancel', input.touchend);

          input.engine.canvas.removeEventListener('mousedown', input.mousedown);
          input.engine.canvas.removeEventListener('mousemove', input.mousemove);
          window.document.removeEventListener('mouseup', input.mouseup);

          window.document.removeEventListener('keydown', input.onKeydown);
          window.document.removeEventListener('keyup', input.onKeyup);
        },

        mousedown: function mousedown(event) {
          if (event.which == 1) {
            event.preventDefault();
            input.mouseIsTouching = true;
            event.identifier = MOUSE_LEFT_TOUCH;
            input.touches.push(input.createTouch(event));
          }
        },

        mousemove: function mousemove(event) {
          if (event.which == 1) {
            event.preventDefault();
            if (input.mouseIsTouching) {
              event.identifier = MOUSE_LEFT_TOUCH;
              var idx = input.ongoingTouchIndexById(event.identifier);
              if (idx >= 0) {
                input.touches.splice(idx, 1, input.createTouch(event)); // swap in the new touch record
              }
            }
          }
        },

        mouseup: function mouseup(event) {
          if (event.which == 1) {
            event.preventDefault();
            input.mouseIsTouching = false;
            event.identifier = MOUSE_LEFT_TOUCH;
            var idx = input.ongoingTouchIndexById(event.identifier);
            if (idx >= 0) {
              input.touches.splice(idx, 1); // remove it; we're done
            }
          }
        },

        touchstart: function touchstart(event) {
          event.preventDefault();
          var touches = event.changedTouches;
          for (var i = 0; i < touches.length; i++) {
            input.touches.push(input.createTouch(touches[i]));
          }
        },

        touchmove: function touchmove(event) {
          event.preventDefault();
          var touches = event.changedTouches;
          for (var i = 0; i < touches.length; i++) {
            var idx = input.ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              input.touches.splice(idx, 1, input.createTouch(touches[i])); // swap in the new touch record
            }
          }
        },

        touchend: function touchend(event) {
          event.preventDefault();
          var touches = event.changedTouches;
          for (var i = 0; i < touches.length; i++) {
            var idx = input.ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              input.touches.splice(idx, 1); // remove it; we're done
            }
          }
        },

        ongoingTouchIndexById: function ongoingTouchIndexById(idToFind) {
          for (var i = 0; i < input.touches.length; i++) {
            var id = input.touches[i].identifier;

            if (id == idToFind) {
              return i;
            }
          }
          return -1; // not found
        },

        onKeydown: function onKeydown(event) {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = true;
        },

        onKeyup: function onKeyup(event) {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = false;
        },

        createTouch: function createTouch(touch) {
          var rect = input.engine.canvas.getBoundingClientRect();
          var newTouch = {
            identifier: touch.identifier,
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          };

          if (input.engine.useResolutionDevider) {
            newTouch.x = newTouch.x / input.engine.resolutionDevider;
            newTouch.y = newTouch.y / input.engine.resolutionDevider;
          }

          return newTouch;
        }
      };

      return input;
    },

    KeyCode: {
      27: 'ESC',
      32: 'SPACE',
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z'
    }
  };

  cEngine.extend('input', inputPlugin);
})(cEngine);
},{}]},{},[1])