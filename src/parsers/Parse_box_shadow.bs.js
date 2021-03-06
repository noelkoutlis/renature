// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Parse_unit from "./Parse_unit.bs.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as NormalizeColor from "./normalizeColor";

var outerWhitespaceRe = /(?!\(.*)\s(?![^(]*?\))/g;

var outerCommaRe = /(?!\(.*),(?![^(]*?\))/g;

function testBoxShadow(val_) {
  if (val_ === "none") {
    return true;
  }
  var properties = val_.split(outerWhitespaceRe).filter((function (str) {
          if (str !== undefined && str !== "inset") {
            return NormalizeColor.normalizeColor(str) === null;
          } else {
            return false;
          }
        }));
  var n = properties.length;
  if (n >= 2 && n <= 4) {
    return properties.every((function (p) {
                  return Parse_unit.testUnit(Belt_Option.getWithDefault(p, ""));
                }));
  } else {
    return false;
  }
}

function testBoxShadows(val_) {
  var boxShadows = val_.split(outerCommaRe);
  return boxShadows.every((function (boxShadow) {
                if (boxShadow !== undefined) {
                  return testBoxShadow(boxShadow.trim());
                } else {
                  return false;
                }
              }));
}

function parseBoxShadow(val_) {
  var properties = val_.split(outerWhitespaceRe);
  var inset = {
    contents: false
  };
  var color = {
    contents: "rgba(0, 0, 0, 1)"
  };
  var filteredProperties = $$Array.map((function (s) {
          return Belt_Option.getWithDefault(s, "");
        }), properties.filter((function (s) {
              if (s !== undefined) {
                if (s === "inset") {
                  inset.contents = true;
                  return false;
                } else if (NormalizeColor.normalizeColor(s) !== null) {
                  color.contents = s;
                  return false;
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })));
  var n = filteredProperties.length;
  if (n >= 2 && n <= 4) {
    return {
            offsetX: Caml_array.caml_array_get(filteredProperties, 0),
            offsetY: Caml_array.caml_array_get(filteredProperties, 1),
            blur: Belt_Option.getWithDefault(Belt_Array.get(filteredProperties, 2), "0px"),
            spread: Belt_Option.getWithDefault(Belt_Array.get(filteredProperties, 3), "0px"),
            color: color.contents,
            inset: inset.contents
          };
  } else {
    return {
            offsetX: "0",
            offsetY: "0",
            blur: "0",
            spread: "0",
            color: "rgba(0, 0, 0, 1)",
            inset: false
          };
  }
}

function parseBoxShadows(val_) {
  var boxShadows = val_.split(outerCommaRe);
  return $$Array.map((function (boxShadow) {
                if (boxShadow !== undefined) {
                  return boxShadow.trim();
                } else {
                  return "";
                }
              }), boxShadows);
}

export {
  testBoxShadow ,
  testBoxShadows ,
  parseBoxShadow ,
  parseBoxShadows ,
  
}
/* ./normalizeColor Not a pure module */
