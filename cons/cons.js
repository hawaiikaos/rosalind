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

function rosArray(r) {
    //convert rosNotation array to just array of rostexts
    /* r: rosNotation array */
    var outputArray = [];
    for (i = 0; i < r.length; i++) {
        outputArray.push(r[i].rostext);
    }
    return outputArray;
}

function compareLike(a) {
    //return a letter count
    /* a: array of strings */
    
    //check lengths match
    var allmatch = true;
    for (i = 1; i < a.length; i++) {
        if (a[i].length !== a[i-1].length) {
            allmatch = false;
        }
    }
    
    if (allmatch) {
        var countObj = {};
        var allChars = [];
        countObj.A = countObj.C = countObj.G = countObj.T = "";
        for (k = 0; k < a.length; k++) {
            //console.log(a);
            //var chars = a[k].split('');
            allChars.push(a[k].split(''));
            //console.log("allChars: ", allChars);
        }
        for (k = 0; k < a[0].length; k++) {
            var aCount = cCount = gCount = tCount = 0;
            for (j = 0; j < a.length; j++) {
                //switch(a[j])
                //console.log("chars[j]: ", chars[j]);
                //console.log("allChars[k]: ", allChars[k]);
                switch(allChars[j][k]) {
                    case "A":
                        aCount++;
                        break;
                    case "C":
                        cCount++;
                        break;
                    case "G":
                        gCount++;
                        break;
                    case "T":
                        tCount++;
                        break;
                }
            }
            countObj.A = countObj.A + " " + aCount;
            countObj.C = countObj.C + " " + cCount;
            countObj.G = countObj.G + " " + gCount;
            countObj.T = countObj.T + " " + tCount;
        }
        
        /*console.log("A: ", countObj.A);
        console.log("C: ", countObj.C);
        console.log("G: ", countObj.G);
        console.log("T: ", countObj.T);*/
        return countObj;
    } else {
        return a;
    }
}

function removeWhiteSpace(s) {
    /* s: string to remove whitespace from */
    return s.replace(/\s+/g, '');
}

function addWhiteSpace(s) {
    return s.split('').join(' ');
}

function findGreatest(a) {
    /* a: array of values to find greatest value from */
    var greatestPlace = 0;
    for (i = 1; i < a.length; i++) {
        if (parseInt(a[i]) > parseInt(a[greatestPlace])) {
            greatestPlace = i;
        }
    }
    return greatestPlace;
}
function findMostLikely(c) {
    /* c: countObject */
    c.A = removeWhiteSpace(c.A);
    c.C = removeWhiteSpace(c.C);
    c.G = removeWhiteSpace(c.G);
    c.T = removeWhiteSpace(c.T);
    
    //console.log("length: ", c.A.length);
    var likelyString = "";
    for (z = 0; z < c.A.length; z++) {
        var checkArray = [c.A[z], c.C[z], c.G[z], c.T[z]];
        //console.log("checkArray: ", checkArray);
        var greatestIndex = findGreatest(checkArray);
        //console.log("greatestIndex: ", greatestIndex);
        //console.log(z);
        switch (greatestIndex) {
            case 0:
                //console.log("A");
                likelyString = likelyString + "A";
                break;
            case 1:
                //console.log("C");
                likelyString = likelyString + "C";
                break;
            case 2:
                //console.log("G");
                likelyString = likelyString + "G";
                break;
            case 3:
                //console.log("T");
                likelyString = likelyString + "T";
                break;
        }
    }
    return likelyString;
}

fs = require('fs')
fs.readFile('rosalind_cons.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log("error: ", err);
    }
    var lines = data.split(/\r?\n/);
    
    //console.log(rosNotation(lines));
    //console.log(rosArray(rosNotation(lines)));
    var rosMatrix = compareLike(rosArray(rosNotation(lines)));
    console.log(findMostLikely(rosMatrix));
    console.log("A: ", addWhiteSpace(rosMatrix.A));
    console.log("C: ", addWhiteSpace(rosMatrix.C));
    console.log("G: ", addWhiteSpace(rosMatrix.G));
    console.log("T: ", addWhiteSpace(rosMatrix.T));
});