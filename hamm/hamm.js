fs = require('fs')
fs.readFile('rosalind_hamm.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  //console.log("lines.length: ", lines.length);
  
  var line1 = lines[0];
  var line2 = lines[1];
  var hamm = 0;
  
  //make sure we are comparing equal length things
  if (line1.length === line2.length) {
      for (i = 0; i < line1.length; i++) {
          //console.log("thing1: ", line1[i]);
          //console.log("thing2: ", line2[i]);
          if (line1[i] !== line2[i]) {
              hamm++;
          }
          //console.log("hamm: ", hamm);
      }
  }
  console.log(hamm);
});