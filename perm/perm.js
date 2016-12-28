function scramble(c, a, b) {
    var tempvalue = c[a];
    c[a] = c[b];
    c[b] = tempvalue;
}

function getCombinations(a) {
    var temparray = [];
    var combinations = [];
    var c = a.split('');

    for (x = 0; x < c.length; x++) {
        temparray[x] = 0;
    }

    combinations.push(a.split('').join(' '));
    
    i = 0;
    while (i < c.length) {
        if (temparray[i] < i) {
            if (i % 2 === 1) {
                scramble(c, temparray[i], i);
            } else {
                scramble(c, 0, i);
            }
            temparray[i]++;
            i = 0;
            combinations.push(c.join(' '));
        } else {
            temparray[i] = 0;
            i++;
        }
    }
    return combinations;
}

fs = require('fs')
fs.readFile('rosalind_perm.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  var permnum = parseInt(lines[0]);
  
  var permarray = [];
  var permvalues = [];
  //permvalues = ["d","b","c"];
  
  for (i = 1; i < (permnum + 1); i++) {
      //console.log("i: ", i);
      permvalues.push(String(i));
  }
  console.log("permvalues: ", permvalues.join());
  var counter = 0;
  var combinations = getCombinations("123456");
      
      
  console.log(combinations.length);
  //console.log("combinations: ", combinations);
  for (x = 0; x < combinations.length; x++) {
      console.log(combinations[x]);
  }
});