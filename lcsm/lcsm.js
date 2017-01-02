//find smallest common string amongst a given set of strings

var roslib = require("../roslib.js");

function collapseToArrays(o) {
    /* o: superset object */
    
    var arrays = [];
    for (var key in o) {
        // skip loop if the property is from prototype
        if (!o.hasOwnProperty(key)) continue;
        arrays.push(o[key]);
    }
    return arrays;
}
function findMatches(o, k) {
    /* o: superset object
       k: key for shortest array */
    console.log("in findMatches");
    console.log("k: ", k);
    //console.log("o: ", o);
    if (k) {
        var shortestArray = o[k];
        console.log("Shortest Array: ", shortestArray);
        var arrays = collapseToArrays(o);
        console.log("arrays: ", arrays);
        for (i = 0; i < arrays.length; i++) {
            var matchedAtAll = false;
            for (j = 0; j < arrays[i].length; j++) {
                for (k = 0; k < shortestArray.length; k++) {
                    var temp = i +'' + j + '' + k;
                    if (arrays[i][j] === shortestArray[k]) {
                        //console.log(temp);
                        matchedAtAll = true;
                    } else {
                        //console.log("no match");
                    }
                }
            }
            console.log("matchedAtAll: ", matchedAtAll);
        }
    } else {
        return false;
    }
}

function findShortestArray(o) {
    /* o: object with arrays (superset) */
    //console.log("o: ", o);
    var shortest;
    var count = 0;
    var shortestKey = "";
    for (var key in o) {
        // skip loop if the property is from prototype
        if (!o.hasOwnProperty(key)) continue;

        var array = o[key];
        //console.log("array.length: ", array.length);
        if (count == 0) {
            shortest = array.length;
            shortestKey = key;
        } else if (array.length < shortest) {
            shortest = array.length;
            shortestKey = key;
        }
        /*for (var prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;

            // your code
            console.log(prop + " = " + obj[prop]);
        }*/
        count++;
    }
    /*console.log("shortest array length: ", shortest);
    console.log("shortest key: ", shortestKey);
    console.log("count: ", count);*/
    
    if (shortest == 0) {
        //console.log("no possible matches");
        return false;
    } else {
        //console.log("last shortest key: ", shortestKey);
        //console.log(o[shortestKey]);
        return shortestKey;
    }
}
function findLongestCommonString(a,b) {
    var subs = [];
    var chars = a.split('');
    //console.log("chars: ", chars);
    var y = 0;
    var endIndex = a.length;
    for (x = 1; x <= a.length; x++) {
        tempstring = a;
        while (tempstring.length > 0) {
            var substring = a.substr(y,x);
            //console.log("substring: ", substring);
            //console.log("tempstring: ", tempstring);
            var r = new RegExp(tempstring,"g");
            var match = b.match(r);
            if (match !== null) {
                console.log("match: ", match);
                //subs.push(match); //capture #times matched
                subs.push(match[0]); //ignore duplicates
            }
            tempstring = tempstring.slice(x, -1);
            
        }

    }
    
    /*for (x = 0; x < b.length; x++) {
        console.log(b[x].match)
    }*/
    return subs;
}
fs = require('fs')
fs.readFile('rosalind_lcsm.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  
  var rosgroups = roslib.rosNotation(lines);
  
  var superset = {};
  for (i = 0; i < rosgroups.length; i++) {
      for (j = 0; j < rosgroups.length; j++) {
          if (j !== i) {
              /*console.log("comparing lines:");
              console.log(rosgroups[i].rostext);
              console.log(rosgroups[j].rostext);*/
              var subset = findLongestCommonString(rosgroups[i].rostext, rosgroups[j].rostext);
              var uniqueKey = i + "_" + j;
              superset[uniqueKey] = subset;
          }
      }
  }
  //console.log("superset: ", superset);
  var shortestKey = findShortestArray(superset);
  findMatches(superset, shortestKey);
  
});