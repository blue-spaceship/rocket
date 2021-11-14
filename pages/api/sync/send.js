import PouchDB from "pouchdb"
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

import { Todo } from "../../../models"

const handler = async (req, res) => {
    const todos = await Todo.find({}, '-__v')
        .then(docs => 
            docs.map( todo => ( 
                { ...todo._doc, _id: `Todo:${ todo._id }`, type: 'Todo' }
            )))

    const db = new PouchDB(process.env.NEXT_PUBLIC_POUCHDB, { skip_setup: true })
    await db.bulkDocs(todos)

    return res.status(200).send('foi')
}

export default handler