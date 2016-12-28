function indices(s, r) {
    /* s: string to search
       r: substring to look for
    */
  var result = [];
  for (i = 0; i < s.length; ++i) {
    if (s.substring(i, i + r.length) == r) {
        //output requires ordinal place counting from 1 not 0
        var out = i + 1;
      result.push(out);
    }
  }
  return result;
}

fs = require('fs')
fs.readFile('rosalind_subs.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  var teststring = lines[0];
  var regexstring = new RegExp(lines[1],"g");
  //var regex = new RegExp("#" + stringToGoIntoTheRegex + "#", "g");
  
  //console.log("matches?: ", teststring.match(regexstring));
  //console.log("matches where?:", teststring.indexOf(lines[1]));
  //console.log(indices(teststring, lines[1]));
  var output = indices(teststring, lines[1]);
  var outstring = "";
  for (j = 0; j < output.length; j++){
      outstring = outstring + " " + output[j];
  }
  console.log(outstring);
});