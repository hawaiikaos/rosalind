var codons = [
    ["UUU","F"],["CUU","L"],["AUU","I"],["GUU","V"],
    ["UUC","F"],["CUC","L"],["AUC","I"],["GUC","V"],
    ["UUA","L"],["CUA","L"],["AUA","I"],["GUA","V"],
    ["UUG","L"],["CUG","L"],["AUG","M"],["GUG","V"],
    ["UCU","S"],["CCU","P"],["ACU","T"],["GCU","A"],
    ["UCC","S"],["CCC","P"],["ACC","T"],["GCC","A"],
    ["UCA","S"],["CCA","P"],["ACA","T"],["GCA","A"],
    ["UCG","S"],["CCG","P"],["ACG","T"],["GCG","A"],
    ["UAU","Y"],["CAU","H"],["AAU","N"],["GAU","D"],
    ["UAC","Y"],["CAC","H"],["AAC","N"],["GAC","D"],
    ["UAA","\n"],["CAA","Q"],["AAA","K"],["GAA","E"],
    ["UAG","\n"],["CAG","Q"],["AAG","K"],["GAG","E"],
    ["UGU","C"],["CGU","R"],["AGU","S"],["GGU","G"],
    ["UGC","C"],["CGC","R"],["AGC","S"],["GGC","G"],
    ["UGA","\n"],["CGA","R"],["AGA","R"],["GGA","G"],
    ["UGG","W"],["CGG","R"],["AGG","R"],["GGG","G"]];

function rosNotation(l) {
    /* l: file lines */
    var concatted = "";
    var rosID = "";
  
    var rosgroups = [];
  
    for (i = 0; i < l.length; i++) {
        if(l[i].includes(">")) {
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
fs.readFile('rosalind_splc.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  //console.log(rosNotation(lines));
  
  var spliceArray = rosNotation(lines);
  var spliceSource = spliceArray.splice(0,1)[0].rostext;
  
  //console.log("spliceSource: ", spliceSource);
  for (i = 0; i < spliceArray.length; i++) {
      //console.log("spliceArray[i].rostext: ", spliceArray[i].rostext);
      var r = new RegExp(spliceArray[i].rostext,"g");
      spliceSource = spliceSource.replace(r, "");
  }
  
  //console.log("spliceSource: ", spliceSource);
  //console.log("spliceArray: ", spliceArray);
  
  //convert to RNA
  spliceSource = spliceSource.replace(/T/g, "U");
  
  var outputstring = "";
  
  var chars = spliceSource.match(/.{1,3}/g);
  //console.log("chars", chars.join());
  
  for (j = 0; j < chars.length; j++) {
      for (k = 0; k < codons.length; k++) {
          //console.log("codons[k][0]: ", codons[k][0], "chars[j]: ", chars[j]);
          if (chars[j] === codons[k][0]) {
              //console.log("match");
              //console.log("codons[k][1]:", codons[k][1]);
              outputstring = outputstring + codons[k][1];
              //console.log("outputstring: ", outputstring);
              //break;
          } else {
              //console.log("not match");
          }
      }
  }
  
  console.log(outputstring);
  
});