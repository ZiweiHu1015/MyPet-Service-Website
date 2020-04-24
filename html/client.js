const url = "http://localhost:8080/pet"; 


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
	let City = document.getElementById("validationServer04").value;
	let Fname = document.getElementById("validationServer01").value
	let Lname = document.getElementById("validationServer02").value
	//let userName = document.getElementById("validationServer01").value +" "+ document.getElementById("validationServer02").value;
	const data = { 'Lname' : Lname,
					'City':City,
					'value':'Empty Post'}; //
	const newURL = url + "/users/" + Fname + "/create" ;
	console.log("petCreate: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
		document.getElementById("output").innerHTML = Fname + ", " + Lname ;
	} else {
	    document.getElementById("output").innerHTML = "No post is found.</b>";
	}
    })();
}

function petRead() {
    (async () => {
	let cityName = document.getElementById("searchLocation").value;
	let Fname = document.getElementById("searchName1").value;
	let Lname = document.getElementById("searchName2").value;
	const data = { 'Fname' : Fname,
				   'Lname' : Lname,
				   'City'  : cityName };
	const newURL = url + "/users/" + Fname + "/read" ;
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

function petUpdate() {
	(async () => {
	let City = document.getElementById("validationServer04").value;
	let Fname = document.getElementById("validationServer01").value;
	let Lname = document.getElementById("validationServer02").value;
	let value = document.getElementById("validationServer05").value;
	const data = {'Fname':Fname,
				  'Lname':Lname,
				  'City' :City,
				  'value':value};
	const newURL = url + "/users/"+Fname+"/update";
	console.log("updating at clients: "+ newURL);
	const resp= await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error'){
		document.getElementById("output2").innerHTML = j['value'] + "</b>";
	} else {
		document.getElementById("output2").innerHTML = "Faild to update </b>"
	}
	})();
}

function petSearch() {
	(async () => {
	let City = document.getElementById("searchLocationAll").value;
	//let Fname = document.getElementById("searchName1").value;
	//let Lname = document.getElementById("searchName2").value
	const data = { 'City'  : City };
	const newURL = url + "/users/" + City+ "/search" ;
	console.log("petSearch: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
		document.getElementById("output3").innerHTML = "Services at "+ City + " are " + j['value'] +  "</b>";
	} else {
		document.getElementById("output3").innerHTML = "No services at " + City+" for now </b>";
	}	    
	})();
}


function petDelete() {
    (async () => {
		let cityName = document.getElementById("searchLocation").value;
		let Fname = document.getElementById("searchName1").value;
		let Lname = document.getElementById("searchName2").value;
		const data = { 'Fname' : Fname,
		'Lname' : Lname,
		'City'  : cityName };
    const newURL = url + "/users/" + Fname + "/delete" ;
	console.log("petDelete: fetching " + newURL);
	const resp = await postData(newURL,data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output3").innerHTML = "Your service post at " + cityName + " has been deleted.</b>";
	} else {
	    document.getElementById("output3").innerHTML = "No post is found.</b>";
	}	    
    })();
}


