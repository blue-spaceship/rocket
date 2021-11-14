import connectDB from '/services/mongo'
import { ToDo } from '/models'

const handler = async (req, res) => {
    if(req.method === 'GET' && process.env.NEXT_INSTALL_CONFIG === "true"){
        const counter = await ToDo.countDocuments()
        if(counter === 0){
            await new ToDo({ name: 'Install Next.js', completed: false, owner: '618bba2f62ccd41ef7b1d737'}).save()
            await new ToDo({ name: 'Install MongoDB', completed: false, owner: '618bba2f62ccd41ef7b1d737'}).save()
            await new ToDo({ name: 'Install Node.js', completed: false, owner: '618bba2f62ccd41ef7b1d737'}).save()
            return res.status(200).end('Seed criado')
        }else{
            return res.status(201).end('Já foi semeado')
        }        
    }else{
        res.status(404)
    }

    res.end()
}

export default connectDB(handler)