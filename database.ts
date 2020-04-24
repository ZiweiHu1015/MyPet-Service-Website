export class Database {

    private MongoClient = require('mongodb').MongoClient;
	private uri = "mongodb+srv://ZiweiHu1015:01041841Hz@finaldb-ewl75.mongodb.net/test?retryWrites=true&w=majority";
	
	private client;
    private collectionName : string;
    private dbName : string = "finaldb";

    constructor(collectionName) {
	this.collectionName = collectionName;
	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });

	
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
<<<<<<< HEAD
    }

=======
	}
	
	// this.client.connect(err => {
	// 	const collection = this.client.db("test").collection("devices");
	// 	// perform actions on the collection object
	// 	this.client.close();
	//   });
	

<<<<<<< HEAD:mongo-database.ts
=======
    public async put(key: string, value: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("put: key = " + key + ", value = " + value);
	let result = await collection.updateOne({'name' : key}, { $set : { 'value' : value} }, { 'upsert' : true } );
	console.log("result = " + result);
    }

    public async get(key: string) : Promise<string> {
	let db = this.client.db(this.dbName); // this.level(this.dbFile);
	let collection = db.collection(this.collectionName);
	console.log("get: key = " + key);
	let result = await collection.findOne({'name' : key });
	console.log("get: returned " + JSON.stringify(result));
	if (result) {
	    return result.value;
	} else {
	    return null;
	}
	}
	
	// public async create(key: string):Promise<string>{
	// 	let db = this.client.db(this.dbName);
	// 	let collection = db.collection(this.collectionName);
	// 	console.log("get: key = " +key);
	// 	let result = await collection.insert({'name': key});
	// 	console.log("get: returned" +JSON.stringify(result));
	// 	if(result){
	// 		return result.value;
	// 	}else{
	// 		return null; 
	// 	}
	// }

>>>>>>> 2ca5ae348e7aa4cd358ec0f205480ca2e3887d22:database.ts
>>>>>>> 8c3074af3456bd29080d7d7a92b260908f655455

//    public async get(key: string) : Promise<string> {
//		let db = this.client.db(this.dbName); // this.level(this.dbFile);
//		let collection = db.collection(this.collectionName);
//		console.log("get: key = " + key);
//		let result = await collection.findOne({'Lname' : key });
//		console.log("get: returned " + JSON.stringify(result));
//		if (result) {
//			return result.value;
//		} else {
//			return null;
//		}
//		}
	public async get(FName:string, LName:string, CityName:string): Promise<string>{
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("get key = "+ FName+" "+LName +" "+CityName);
		let result = await collection.findOne({ 'Fname':FName,
											    'Lname' :LName,
												'City' :CityName});
		console.log("get returned: " +JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
	}


<<<<<<< HEAD
    public async del(Fname: string, Lname:string, City:string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + Fname);
		let result = await collection.deleteOne({'Fname' : Fname,
												 'Lname' : Lname,
												 'City'  : City });
		console.log("Deleted");
		// await this.db.del(key);
		}



	public async search(cityName:string): Promise<any>{
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("search key = "+ cityName);
		let result = await collection.findMany({"City": cityName});
		console.log(result)
		if (result){
			return result.value;
		} else {
			return null;
		}
	}



    public async put(key: string, value: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("put: key = " + key + ", value = " + value);
	let result = await collection.updateOne({'name' : key}, 
											{ $set : { 'value' : value} }, 
											{ 'upsert' : true } );
	console.log("result = " + result);
	}
	
	public async update(Fname:string, Lname:string, City:string, value:string): Promise<void>{
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("updating "+Fname+ " " + Lname +" at " + City);
	let result = await collection.updateOne({'Fname':Fname},
											 { $set: { 'value' : value} },
											 { 'upsert' : true } );
	console.log("update successful: "+ result)
	}

	




	public async create(Fname:string, Lname:string, City:string, value:string) : Promise<void>{
        let db = this.client.db(this.dbName);
        let collection = db.collection(this.collectionName);
        let doc = {
            'Fname': Fname,
			'Lname': Lname,
			'City':City,
			'value': value
        }
        let result = await collection.insertOne(doc);

        //let result = await collection.updateOne({'word':name},{$set: {'img': img, 'languages':{}, 'definition':null}, },{'upsert' : true});
        console.log("create: word = " + Fname + " "+Lname +" "+City +" "+ "Empty Post");
        console.log(result);
    }
=======
    
>>>>>>> 8c3074af3456bd29080d7d7a92b260908f655455
   



public async isFound(userId: string, LName:string, cityName:string) : Promise<boolean>  {
	console.log("isFound: key = " + userId);
	let v = await this.get(userId, LName, cityName);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }
}
