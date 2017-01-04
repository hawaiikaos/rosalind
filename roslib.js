module.exports = {
    rosNotation: function(l) {
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
};
