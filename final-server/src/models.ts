import { MongoClient, Db, Collection, ObjectID } from 'mongodb';

export default class Models {

  private db: Db;

  constructor() {
    const secret = require('./secret.json');
    // const dbUrl: string = 'mongodb+srv://ysha:Woaizhongguo%402020@ysha-ieadu.mongodb.net/test?retryWrites=true&w=majority'
    const dbUrl: string = 'mongodb+srv://' + secret.username + ':' + secret.password + '@ysha-ieadu.mongodb.net/test?retryWrites=true&w=majority';
    // connect mongo
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        this.db = client.db();
        console.log(`>> The ${this.db.databaseName} database has been connected!`);
      }
    });
  }

  public async fetch(collectionName: string, query?: any): Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    return await collection.find(query).toArray();
  }

  public async put(collectionName: string, data: any, ) : Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    return await collection.insertOne(data);
  }

  public async get(collectionName: string, id: string) : Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    return await collection.findOne({ _id: new ObjectID(id)});
  }

  public async getUserByName(collectionName: string, field: string, name: string) : Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    return await collection.findOne({[field]: name});
  }

  public async getUserDatas(collectionName: string, userId: string) : Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    return await collection.find({ userId: new ObjectID(userId)}).toArray();
  }

  public async patch(collectionName: string, data: any) : Promise<any> {
    const collection = this.db.collection(collectionName) as Collection;
    const query = { _id: new ObjectID(data._id)};
    delete data._id;
    await collection.updateOne(query, { $set: data });
    return await collection.findOne(query);
  }

  public async del(collectionName: string, id: string) : Promise<void> {
    const collection = this.db.collection(collectionName) as Collection;
    await collection.deleteOne({_id : new ObjectID(id)});
  }
}


