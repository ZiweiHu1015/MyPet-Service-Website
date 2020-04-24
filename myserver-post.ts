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
	// Set multiple handlers for a route, in sequence.
	this.router.post('/users/:userId/read',   [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
	this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
	this.router.get('/users/:userId/search',[this.errorHandler.bind(this), this.searchHandler.bind(this)]);
	// Set a fall-through handler if nothing matches.
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the counter endpoint at '/counter'.
	this.server.use('/pet', this.router);
    }

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.body.name);
//	console.log("result from database.isFound: " + JSON.stringify(value));
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
	await this.createPet(request.params['userId']+"-"+request.body.name, response);
    }

    private async readHandler(request, response): Promise<void> {
	console.log(request.params['userId']);
	await this.readPet(request.params['userId']+"-"+request.body.name, response);
	}
	
	private async searchHandler(request, response): Promise<void> {
		console.log(request.params['userId']);
		await this.searchPet(request.query.name, response);
		}

    private async updateHandler(request, response) : Promise<void> {
	await this.updatePet(request.params['userId']+"-"+request.body.name, request.body.value, response);
    }

    private async deleteHandler(request, response) : Promise<void> {
	await this.deletePet(request.params['userId']+"-"+request.body.name, response);
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async createPet(name: string, response) : Promise<void> {
	console.log("creating city named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readPet(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
	}
	
	public async searchPet(name: string, response) : Promise<void> {
		let value = await this.theDatabase.search(name);
		response.write(JSON.stringify({'result' : 'search',
						   'name' : name,
						   'value' : value }));
		response.end();
		}

    public async updatePet(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deletePet(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
    }
}

