/*UUU F      CUU L      AUU I      GUU V
  UUC F      CUC L      AUC I      GUC V
  UUA L      CUA L      AUA I      GUA V
  UUG L      CUG L      AUG M      GUG V
  UCU S      CCU P      ACU T      GCU A
  UCC S      CCC P      ACC T      GCC A
  UCA S      CCA P      ACA T      GCA A
  UCG S      CCG P      ACG T      GCG A
  UAU Y      CAU H      AAU N      GAU D
  UAC Y      CAC H      AAC N      GAC D
  UAA Stop   CAA Q      AAA K      GAA E
  UAG Stop   CAG Q      AAG K      GAG E
  UGU C      CGU R      AGU S      GGU G
  UGC C      CGC R      AGC S      GGC G
  UGA Stop   CGA R      AGA R      GGA G
  UGG W      CGG R      AGG R      GGG G*/

/*["UUU","F"],["CUU","L"],["AUU","I"],["GUU","V"],
  ["UUC","F"],["CUC","L"],["AUC","I"],["GUC","V"],
  ["UUA","L"],["CUA","L"],["AUA","I"],["GUA","V"],
  ["UUG","L"],["CUG","L"],["AUG","M"],["GUG","V"],
  ["UCU","S"],["CCU","P"],["ACU","T"],["GCU","A"],
  ["UCC","S"],["CCC","P"],["ACC","T"],["GCC","A"],
  ["UCA","S"],["CCA","P"],["ACA","T"],["GCA","A"],
  ["UCG","S"],["CCG","P"],["ACG","T"],["GCG","A"],
  ["UAU","Y"],["CAU","H"],["AAU","N"],["GAU","D"],
  ["UAC","Y"],["CAC","H"],["AAC","N"],["GAC","D"],
  ["UAA","Stop"],["CAA","Q"],["AAA","K"],["GAA","E"],
  ["UAG","Stop"],["CAG","Q"],["AAG","K"],["GAG","E"],
  ["UGU","C"],["CGU","R"],["AGU","S"],["GGU","G"],
  ["UGC","C"],["CGC","R"],["AGC","S"],["GGC","G"],
  ["UGA","Stop"],["CGA","R"],["AGA","R"],["GGA","G"],
  ["UGG","W"],["CGG","R"],["AGG","R"],["GGG","G"]*/

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
    
var teststring = "AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA";
var testarray = teststring.match(/.{1,3}/g);
var outputstring = "";

var lines = [];
var linearray = [];

fs = require('fs')
fs.readFile('rosalind_prot.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  //console.log("lines: ", lines);
  //console.log("lines.length: ", lines.length);
  linearray = lines[0].match(/.{1,3}/g);
  for (i = 0; i < linearray.length; i++) {
      for(k = 0; k < codons.length; k++) {
          if (linearray[i] === codons[k][0]) {
              //console.log("codons[k][1]:", codons[k][1]);
              outputstring = outputstring + codons[k][1];
              break;
          }
      }
  }

  console.log("outputstring: ", outputstring);
  //console.log("codons: ", codons);
  //console.log("testarray: ", testarray);
});


