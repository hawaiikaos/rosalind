function rosNotation(l) {
    /* l: file lines */
    var concatted = "";
    var rosID = "";
  
    var rosgroups = [];
  
    for (i = 0; i < l.length; i++) {
        //console.log("i: ", i);
        if(l[i].includes(">")) {
            //skip
            if (i > 0) {
                var rosObj = {};
                rosObj.ros = rosID;
                rosObj.rostext = concatted;
                rosgroups.push(rosObj);
            }
            concatted = "";
            rosID = l[i].slice(1);
        } else {
          
            concatted = concatted + l[i];

        }
        if (i === (l.length - 1)) {
            var rosObj = {};
            rosObj.ros = rosID;
            rosObj.rostext = concatted;
            rosgroups.push(rosObj);
        }
    }
    return rosgroups;
}

fs = require('fs')
fs.readFile('rosalind_grph.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  
  //console.log(rosNotation(lines));
  var rozzed = rosNotation(lines);
  
  //use O3 notation, where 3 is length of overlap
  oValue = 3;
  
  /*if (pathname.substring(0, 6) == "/sub/1") {
      // ...
  }*/
 //str.endsWith(searchString[, position])
      
  //var teststring = "yo ho ho";
  //var substring = "yo";
  /*console.log("starts with: ", teststring.startsWith(substring,0));
  console.log("starts with2: ", teststring.startsWith(substring));
  console.log("ends with: ", teststring.endsWith(substring));
  console.log("ends with2: ", teststring.endsWith("ho"));*/
  
  //console.log("rozzed length: ", rozzed.length);
  //console.log("rozzed[0]: ", rozzed[0].rostext);
  //var suffix = rozzed[0].rostext.slice((-1 * oValue));
  //console.log("suffix: ", suffix);
  
  for (i = 0; i < rozzed.length; i++) {
      var suffix = rozzed[i].rostext.slice((-1 * oValue));
      for (j = 0; j < rozzed.length; j++) {
          if (j != i) {
              var prefix = rozzed[j].rostext.slice((oValue + 1));
              //console.log("suffix: ", suffix, "prefix: ", prefix);
              if (rozzed[j].rostext.startsWith(suffix)) {
                  //console.log("it's a match");
                  console.log(rozzed[i].ros, rozzed[j].ros);
              } else {
                  //console.log("no match", rozzed[i].rostext, rozzed[j].rostext);
              }
          } else {
              //matching on self; don't do that
              //console.log("self");
          }
      }
  }
});