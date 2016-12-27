fs = require('fs')
fs.readFile('rosalind_gc.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  //console.log("data: ", data);
  var lines = data.split(/\r?\n/);
  //console.log("lines[0]: ", lines[0]);
  var max = {};
  max.maxvalue = 0;
  max.maxros = "";
  
  var concatted = "";
  var rosID = "";
  
  var rosgroups = [];
  
  for (i = 0; i < lines.length; i++) {
      //console.log("i: ", i);
      if(lines[i].includes(">")) {
          //skip
          if (i > 0) {
              var rosObj = {};
              rosObj.ros = rosID;
              rosObj.rostext = concatted;
              rosgroups.push(rosObj);
          }
          concatted = "";
          rosID = lines[i];
      } else {
          //console.log("lines[i]: ", lines[i]);
          //console.log("line length: ", lines[i].length);
          //console.log("Gs + Cs: ", lines[i].match(/G/g).length + lines[i].match(/C/g).length);
          //console.log("GC content: ", (lines[i].match(/G/g).length + lines[i].match(/C/g).length) / lines[i].length);
          
          concatted = concatted + lines[i];
          /*var gcContent = (lines[i].match(/G/g).length + lines[i].match(/C/g).length) / lines[i].length;
          if (gcContent > max.maxvalue) {
              max.maxvalue = gcContent;
              max.maxros = lines[i-1];
          }*/
      }
  }
  /*console.log("maxros: ", max.maxros);
  console.log("maxvalue: ", max.maxvalue);*/
  
  //console.log("rosgroups.length: ", rosgroups.length);
  //console.log("rosgroups[0]: ", rosgroups[0]);
  
  for (j = 0; j < rosgroups.length; j++) {
      console.log("j: ", j);
      console.log("match G: ", rosgroups[j].rostext.match(/G/g).length);
      console.log("match C: ", rosgroups[j].rostext.match(/C/g).length);
      console.log("length: ", rosgroups[j].length);
      var gcContent = (rosgroups[j].rostext.match(/G/g).length + rosgroups[j].rostext.match(/C/g).length) / rosgroups[j].rostext.length;
      if (gcContent > max.maxvalue) {
          max.maxvalue = gcContent;
          max.maxros = rosgroups[j].ros;
      }
      console.log("gcContent: ", gcContent);
  }
  console.log("maxros: ", max.maxros);
  console.log("maxvalue: ", max.maxvalue);
  
});
