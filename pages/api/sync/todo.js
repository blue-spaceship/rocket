import PouchDB from "pouchdb"
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

import Models, { Todo } from "../../../models"

const handler = async (req, res) => {
    const db = new PouchDB(process.env.NEXT_PUBLIC_POUCHDB, { skip_setup: true })
    const todos = await db.allDocs({ include_docs: true }).then(result => result.rows.map(row => row.doc))
    let newData = {}

    todos.map(todo => {
        const index = todo.type
        if(!newData[index]) {
            newData = { ...newData, [index]: [] }
        }
        newData[index].push(todo)
    })

    Object.keys(newData).map(key => {
        newData[key].map(todo => {
            async function update(){
                todo._id = todo._id.split(':')[1]
                const up = await Models[key].findByIdAndUpdate(todo._id, todo, { new: true, upsert: true })
                console.log(`updated`, up);
            }
            update()
        })
    })
    return res.status(200).send(await Todo.find())
}

export default handler