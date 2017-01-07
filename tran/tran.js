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
    
    if (a === "A") {
        if (b === "G") {
            return "transition";
        } else if (b === "A") {
            return "self";
        } else {
            return "transversion";
        }
    } else if (a === "G") {
        if (b === "A") {
            return "transition";
        } else if (b === "G") {
            return "self";
        } else {
            return "transversion";
        }
    } else if (a === "C") {
        if (b === "T") {
            return "transition";
        } else if (b === "C") {
            return "self";
        } else {
            return "transversion";
        }
    } else if (a === "T") {
        if (b === "C") {
            return "transition";
        } else if (b === "C") {
            return "self";
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
  console.log("discoverMatchType: ", discoverMatchType(rosgroups[0].rostext[0], rosgroups[1].rostext[0]));
});