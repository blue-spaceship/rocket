import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import PouchAuth from 'pouchdb-authentication'

PouchDB.plugin(PouchDBFind)
PouchDB.plugin(PouchAuth)

export class LocalData {
    static _instance = null
    localDB = null
    remoteDB = null

    static getInstance() {
        if(!this._instance) { this._instance = new LocalData() }
        return this._instance.localDB
    }

    static getRemote(){
        if(!this._instance) { this._instance = new LocalData() }
        return this._instance.localDB.remoteDB
    }

    constructor () {
        this.localDB = new PouchDB('bluespaceship-local')
        if(process.env.NEXT_PUBLIC_POUCHDB){
            this.remoteDB = new PouchDB(process.env.NEXT_PUBLIC_POUCHDB, { skip_setup: true })
            PouchDB.sync('bluespaceship-local', process.env.NEXT_PUBLIC_POUCHDB, { live: true, retry: true })
        }
    }

    static async get( type ){
        return await LocalData.getInstance().find({ selector: { type } }).then(result => result.docs)
    }
}

export class Todo {
    TYPE = 'Todo'

    constructor(data) {
        this.data = data
    }

    toJSON() {
        return {
            _id: `${ this.TYPE }:${ new Date().getTime().toString() }`,
            type: this.TYPE,
            ...this.data
        }
    }
}

export default LocalData