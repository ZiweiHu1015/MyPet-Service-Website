const url = "http://localhost:8080/counter"; // NOTE NEW URL

// NEW: helper method for posting data
async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}



function petCreate() {
    (async () => {
	let counterName = document.getElementById("validationServer04").value;
	let userName = document.getElementById("validationServer01").value +" "+ document.getElementById("validationServer02").value;
	const data = { 'name' : counterName }; //
	const newURL = url + "/users/" + userName + "/create" ;
	console.log("petCreate: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
		document.getElementById("output").innerHTML = userName + ", " + counterName ;
	} else {
	    document.getElementById("output").innerHTML = "No post is found.</b>";
	}
    })();
}

function petRead() {
    (async () => {
	let counterName = document.getElementById("searchLocation").value;
	let userName = document.getElementById("searchName").value;
	const data = { 'name' : counterName };
	const newURL = url + "/users/" + userName + "/read" ;
	console.log("petRead: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output3").innerHTML = "You already have a post with message: " + j['value'] +  "</b>";
	} else {
	    document.getElementById("output3").innerHTML = "You haven't posted any services yet, please create a new one:)</b>";
	}	    
    })();
}

function petSearch() {
    (async () => {
	let counterName = document.getElementById("searchLocationAll").value;
	const data = { 'name' : counterName };
	const newURL = url + "/users/search?name=" + counterName;
	console.log("petRead: fetching " + newURL);
	const resp = await fetch(newURL);
	const j = await resp.json();
	console.print(resp)
	if (j['result'] !== 'error') {
	    document.getElementById("outputAll").innerHTML = j['value'] +  "</b>";
	} else {
	    document.getElementById("outputAll").innerHTML = "No services posted at this location yet</b>";
	}	    
    })();
}

function petUpdate() {
    (async () => {
	let counterName = document.getElementById("validationServer04").value;
	let userName = document.getElementById("validationServer01").value +" "+ document.getElementById("validationServer02").value;
	let counterValue = document.getElementById("validationServer05").value;
	const data = { 'name' : counterName ,'value':counterValue};
	const newURL = url + "/users/" + userName + "/update";
	console.log("petUpdate: fetching " + newURL);
	const resp = await postData(newURL,data);
    const j = await resp.json();
	if (j['result'] !== 'error') {
		document.getElementById("output2").innerHTML = //"301: <b>" + userName + ", " + counterName + " value = " +
		 j['value'] + "</b>";
	} else {
	    document.getElementById("output2").innerHTML = "No post is found.";
	}	    
    })();
}

function petDelete() {
    (async () => {
	let counterName = document.getElementById("searchLocation").value;
	let userName = document.getElementById("searchName").value;
	const data = { 'name' : counterName };
	const newURL = url + "/users/" + userName + "/delete";
	console.log("petDelete: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output3").innerHTML = "Your service post at " + counterName + " has been deleted.</b>";
	} else {
	    document.getElementById("output3").innerHTML = "No post is found.</b>";
	}	    
    })();
}