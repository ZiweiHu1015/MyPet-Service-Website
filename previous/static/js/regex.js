// highlight matched string

function highlight() {
    var strExp = document.getElementById("txtExpression").value;
    var strText = document.getElementById("txtText").value;

    var results = [...strText.matchAll(strExp)];
    console.log(results);

    var output = "";
    const highlight = "<span style=\"color:orange\">";

    if (results.length != 0) {
        var idx = 0;
        for (var i = 0; i < results.length; i++) {
            var prev = strText.slice(idx, results[i].index);
            var str = highlight + results[i][0] + "</span>";
            idx = results[i].index + results[i][0].length;
            output += prev + str;
            //console.log(output);
        }
        output += strText.slice(idx, strText.length);
        //console.log(output);
    } else {
        output = strText;
    }
    document.getElementById("output").innerHTML = output;
} 