/* transitions:
   A <-> G
   C <-> T

   transversions:
   A <-> C
   A <-> T
   C <-> G
   G <-> T
*/

function discoverMatchType(a, b) {
    /* a: character 1 to match
       b: character 2 to match
    */
    
    if (a === b) {
        return "self";
    }
    
    if (a === "A") {
        if (b === "G") {
            return "transition";
        } else {
            return "transversion";
        }
    } else if (a === "G") {
        if (b === "A") {
            return "transition";
        } else {
            return "transversion";
        }
    } else if (a === "C") {
        if (b === "T") {
            return "transition";
        } else {
            return "transversion";
        }
    } else if (a === "T") {
        if (b === "C") {
            return "transition";
        } else {
            return "transversion";
        }
    }
}
var roslib = require("../roslib.js");

fs = require('fs')
fs.readFile('rosalind_tran.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  
  var rosgroups = roslib.rosNotation(lines);
  
  //console.log("rosgroups: ", rosgroups);
  //console.log("discoverMatchType: ", discoverMatchType(rosgroups[0].rostext[0], rosgroups[1].rostext[0]));
  
  var transitionCount = 0;
  var transversionCount = 0;
  
  for (i = 0; i < rosgroups[0].rostext.length; i++) {
      var result = discoverMatchType(rosgroups[0].rostext[i], rosgroups[1].rostext[i]);
      if (result === "transition") {
          transitionCount++;
      } else if (result === "transversion") {
          transversionCount++;
      } else {
          //is self, no need to count
          //transversionCount++;
      }
  }
  console.log("s1 length: ", rosgroups[0].rostext.length);
  console.log("s2 length: ", rosgroups[1].rostext.length);
  console.log("total transitions: ", transitionCount);
  console.log("total transversions: ", transversionCount);
  console.log("ratio: ", transitionCount/transversionCount);
  
  console.log("s1: ", rosgroups[0].rostext);
  console.log("s2: ", rosgroups[1].rostext);

});