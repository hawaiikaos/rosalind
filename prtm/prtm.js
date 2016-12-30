/* A   71.03711
   C   103.00919
   D   115.02694
   E   129.04259
   F   147.06841
   G   57.02146
   H   137.05891
   I   113.08406
   K   128.09496
   L   113.08406
   M   131.04049
   N   114.04293
   P   97.05276
   Q   128.05858
   R   156.10111
   S   87.03203
   T   101.04768
   V   99.06841
   W   186.07931
   Y   163.06333
*/

var monoisotopicMass = {
    A: 71.03711,
    C:   103.00919,
    D:   115.02694,
    E:   129.04259,
    F:   147.06841,
    G:   57.02146,
    H:   137.05891,
    I:   113.08406,
    K:   128.09496,
    L:   113.08406,
    M:   131.04049,
    N:   114.04293,
    P:   97.05276,
    Q:   128.05858,
    R:   156.10111,
    S:   87.03203,
    T:   101.04768,
    V:   99.06841,
    W:   186.07931,
    Y:   163.06333
};


fs = require('fs')
fs.readFile('rosalind_prtm.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  //var lines = data.split(/\r?\n/);
  var chars = data.split('');
  //console.log("chars: ", chars);
  
  var totalWeight = 0;
  
  for (i = 0; i < chars.length; i++) {
      
      var weight = monoisotopicMass[chars[i]];
      if (weight !== undefined) {
          totalWeight += weight;
      }
  }
  console.log(totalWeight);
  
});