var roslib = require("../roslib.js");

function compareSubness(a, b) {
    /* a: first string to compare
       b: second string to compare
       output: superstring of both */
    
    //console.log("a.length: ", a.length);
    //console.log("b.length: ", b.length);
    
    //console.log("match: ", a.indexOf(b));
    
    var s = b;
    var index1 = -1;
    var matchLength1 = 0;
    
    while (index1 === -1) {
        if (s.length === 0) {
            break;
        }
        s = s.slice(0,-1);
        index1 = a.indexOf(s);
        //console.log("s: ", s);
        //console.log("a: ", a);
    }
    matchLength1 = s.length;
    
    s = a;
    var index2 = -1;
    var matchLength2 = 0;
    while (index2 === -1) {
        if (s.length === 0) {
            break;
        }
        s = s.slice(0,-1);
        index2 = b.indexOf(s);
        //console.log("s: ", s);
        //console.log("a: ", b);
    }
    matchLength2 = s.length;
    
    //console.log("index1: ", index1);
    //console.log("index2: ", index2);
    //return index;
    
    var superstring = "";
    
    //console.log(a, b);
    //console.log(a.slice(0,index1) + b);
    //console.log(b.slice(0,index2) + a);
    
    var super1 = a.slice(0,index1) + b;
    var super2 = b.slice(0,index2) + a;
    
    if (super1.length < super2.length) {
        return super1;
    } else if (super2.length < super1.length) {
        return super2;
    } else {
        //??
        return "inconclusive";
    }
    //console.log(a.slice(0,index1),b.slice(0,index1));
    //console.log(a.slice(0,index2),b.slice(0,index2));
    /*console.log("a:");
    console.log("1: ", a.slice(0,index1));
    console.log("2: ", a.slice(0,index2));
    console.log("3: ", a.slice(0, matchLength1));
    console.log("4: ", a.slice(0, matchLength2));
    console.log("5: ", a.slice(index1, matchLength1));
    console.log("6: ", a.slice(index2, matchLength2));
    
    console.log("b:");
    console.log("1: ", b.slice(0,index1));
    console.log("2: ", b.slice(0,index2));
    console.log("3: ", b.slice(0, matchLength1));
    console.log("4: ", b.slice(0, matchLength2));
    console.log("5: ", b.slice(index1, matchLength1));
    console.log("6: ", b.slice(index2, matchLength2));*/

    /*if (index1 < index2) {
        console.log("index 1 is more overlap");
        console.log(a, b);
        console.log(a.slice(0,index1));
        superstring = b + a.slice(0, index1);
    } else if (index2 < index1) {
        console.log("index 2 is more overlap");
        console.log(a, b);
        console.log(b.slice(0,index2));
        superstring = a + b.slice(0,index2);
    } else if (index1 === index2){
        console.log("either is the same");
        superstring = a + b.slice(0,index2);
    } else {
        superstring = a + b;
        //???
    }*/
    //console.log("superstring: ", superstring);
}

fs = require('fs')
fs.readFile('rosalind_long.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  
  var rosgroups = roslib.rosNotation(lines);
  
  //console.log("rosgroups: ", rosgroups);
  var inputArray = [];
  for (i = 0; i < rosgroups.length; i++) {
      //console.log(compareSubness(rosgroups[i-1].rostext, rosgroups[i].rostext));
      inputArray.push(rosgroups[i].rostext);
  }
  
  while (inputArray.length > 1) {
      console.log("in while");
      var tempArray = [];
      for (j = 1; j < inputArray.length; j++) {
          console.log("j: ", j);
          console.log("tempArray: ", tempArray);
          console.log("inputArray: ", inputArray);
          tempArray.push(compareSubness(inputArray[j-1], inputArray[j]));
      }
      inputArray = tempArray;
  }
  console.log("inputArray: ", inputArray);
});