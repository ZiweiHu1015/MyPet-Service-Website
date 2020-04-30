let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
	this.theDatabase = db;

	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	// Serve static pages from a particular path.
	this.server.use('/', express.static('./html'));
	this.server.use('/',express.json());
	// Set a single handler for a route.
	this.router.post('/users/:userId/create', this.createHandler.bind(this));
	this.router.post('/users/:City/search',this.searchHandler.bind(this));
	// Set multiple handlers for a route, in sequence.
	this.router.post('/users/:userId/read',   [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
	this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
	// Set a fall-through handler if nothing matches.
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the counter endpoint at '/counter'.
	this.server.use('/pet', this.router);
    }

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId'],
														 request.body.Lname,
														 request.body.City);
//	console.log("result from database.isFound: " + JSON.stringify(value));
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
	
private async searchHandler(request, response): Promise<void>{
	await this.searchPet(request.body.City, response);
}


private async deleteHandler(request, response) : Promise<void> {
	await this.deletePet(request.params['userId'],
						 request.body.Lname,
						 request.body.City,
						response);
    }


	private async readHandler(request, response): Promise<void>{
		await this.readPet(request.params['userId'],
						   request.body.Lname,
						   request.body.City,
						   response);
	}

    private async createHandler(request, response) : Promise<void> {
	await this.createPet( request.params['userId'],
						 request.body.Lname, 
						 request.body.City,
						 request.body.value, response);
    }

	private async updateHandler(request, response): Promise<void> {
	await this.updatePet( request.params['userId'],
						   request.body.Lname,
						   request.body.City,
						   request.body.value, response);
	}
   
    public listen(port) : void  {
	this.server.listen(port);
	}
	
	public async updatePet(Fname:string, Lname:string,
						   City: string, value:string, response): Promise<void>{

	console.log("updating at server");
	await this.theDatabase.update(Fname, Lname, City, value);
	response.write(JSON.stringify({'result':'created',
								   'Fname': Fname,
								   'Lname': Lname,
								   'City' : City,
								   'value': value}));
	response.end();
						   }

	public async createPet(Fname: string, Lname:string, 
							City:string, value:string, response) : Promise<void> {
	console.log("creating city named '" + City + "'");
	await this.theDatabase.create(Fname, Lname, City, value);
	response.write(JSON.stringify({'result' : 'created',
				       'Fname' : Fname,
					   'Lname' : Lname,
						'City': City,
						'value': value}));
	response.end();
    }

    public async errorCounter(Fname: string, Lname: string, City: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readPet(Fname: string, Lname: string, City: string, response) : Promise<void> {
	let value = await this.theDatabase.get(Fname, Lname, City);
	response.write(JSON.stringify({'result' : 'read',
				       'Fname' : Fname,
					   'Lname' : Lname,
					   'City'  : City,
					   'value' : value}));
	response.end();
	}
	
	public async searchPet(cityName:string, response): Promise<any>{

		let value = await this.theDatabase.search(cityName);
		response.write(JSON.stringify({'result':'search',
									   'City':cityName,
									   'value':value}));
		response.end()
	}


    public async deletePet(Fname : string, Lname:string, City:string,response) : Promise<void> {
		await this.theDatabase.del(Fname,Lname,City);
		response.write(JSON.stringify({'result' : 'deleted',
						   'Fname'  : Fname,
						   'Lname'  : Lname }));
		response.end();
		}
}

