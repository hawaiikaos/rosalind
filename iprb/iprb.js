//Adapted from: http://stackoverflow.com/questions/24094466/javascript-sum-two-arrays-in-single-iteration
Array.prototype.addArray = function (a) {
    var sum = [];
    if (a != null && this.length == a.length) {
        for (var i = 0; i < a.length; i++) {
            sum.push(this[i] + a[i]);
        }
    }
    return sum;
}

function countPermutations(t) {
    /* t: total number of individuals */
    var count = 0;
    var tally = t;
    
    for (i = 1; i < t; i++) {
        count = count + tally;
        tally--;
    }
    return count - (t - 1);
}

function childMatrix(a,b) {
    /* a, b: parent alleles */
    
    return [a[0] + b[0], a[0] + b[1], a[1] + b[0], a[1] + b[1]];
}

function countChildren(c) {
    /* c: child matrix */
    var dd = dr = rr = 0;
    
    for (i = 0; i < c.length; i++) {
        switch (c[i]) {
        case "dd":
            dd++;
            break;
        case "dr":
            dr++;
            break;
        case "rd":
            dr++;
            break;
        case "rr":
            rr++;
            break;
        }
    }
    return [dd, dr, rr];
} 
function calculateDominance(k, m, n) {
    /* k: dominant-dominant input
       m: dominant-recessive input
       n: recessive-recessive input
    */
    var DDProbability = DRProbability = RRProbability = 0;
    
    var total = parseInt(k) + parseInt(m) + parseInt(n);
    //total = 1;
    //console.log("total: ", total);
    var permutations = countPermutations(total);
    //console.log("permutations: ", permutations);
    
    var dMatrix = ['d','d'];
    var drMatrix = ['d','r'];
    var rMatrix = ['r','r'];
    
    var result = childMatrix(drMatrix, drMatrix);
    //console.log("result: ", result);
    //console.log(countChildren(result));
    
    var resultMatrix = [0,0,0];
    
    permcheck = 0;
    for (x = 0; x < k; x++) {
        //d + d
        var max = -1;
        for (aa = 0; aa < k; aa++) {
            
            if ((aa !== x) && (aa > max) && (x > max)) {
                /*console.log("not like");
                console.log("x: ", x, "aa: ", aa, "max: ", max);
                console.log("aa !== x: ", (aa !== x));
                console.log("aa > max: ", (aa > max));
                console.log("x > max: ", (x > max));*/
                resultMatrix = resultMatrix.addArray(countChildren(childMatrix(dMatrix, dMatrix)));
                permcheck++;
            } else  {
                //console.log("like");
            }
            max++;
        }
        //d + dr
        for (y = 0; y < m; y++) {
            resultMatrix = resultMatrix.addArray(countChildren(childMatrix(dMatrix, drMatrix)));
            permcheck++;
        }
        //d + r
        for (z = 0; z < n; z++) {
            resultMatrix = resultMatrix.addArray(countChildren(childMatrix(dMatrix, rMatrix)));
            permcheck++;
        }
    }
    //console.log("permcheck: ", permcheck);
    for (v = 0; v < m; v++) {
        //dr + dr
        var max = -1;
        for (bb = 0; bb < m; bb++) {
            if ((bb !== v) && (bb > max) & (v > max)) {
                resultMatrix = resultMatrix.addArray(countChildren(childMatrix(drMatrix, drMatrix)));
                permcheck++;
            }
            max++;
        }
        //dr + r
        for (w = 0; w < n; w++) {
            resultMatrix = resultMatrix.addArray(countChildren(childMatrix(drMatrix, rMatrix)));
            permcheck++;
        }
    }
    //console.log("permcheck: ", permcheck);
    //r + r
    for (u = 0; u < n; u++) {
        var max = -1;
        for (cc = 0; cc < n; cc++) {
            if ((cc !== u) && (cc > max) && (u > max)) {
                resultMatrix = resultMatrix.addArray(countChildren(childMatrix(rMatrix, rMatrix)));
                permcheck++;
            }
            max++;
        }
    }
    //console.log("permcheck: ", permcheck);
    
    //console.log("resultMatrix: ", resultMatrix);
    //add up all combinations that have a dominant allele
    var dominantTotal = resultMatrix[0] + resultMatrix[1];
    var totalTotal = resultMatrix[0] + resultMatrix[1] + resultMatrix[2];
    var probability = dominantTotal / totalTotal;
    //console.log("probability: ", probability);
    console.log(probability);
}

fs = require('fs')
fs.readFile('rosalind_iprb.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log("error: ", err);
  }
  var lines = data.split(/\r?\n/);
  var chars = lines[0].split(' ');
  //console.log("chars: ", chars);
  var DD = chars[0];
  var DR = chars[1];
  var RR = chars[2];
  
  calculateDominance(DD, DR, RR);
});