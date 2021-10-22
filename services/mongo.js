import mongoose from 'mongoose'

const options = {
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
    useNewUrlParser: true
}

export const MongoMiddleware = handler => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res)
    }

    try {
        mongoose.connect( getMongoURI() , options , error => {
            if(error) throw error

            // When connected with no error show where was connected
            console.error(`Connected on ${ process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV }!`)
        })
    } catch (error) {
        console.error(error)
		res.status(500).end()
    }

    return handler(req, res)
}

export const Mongo = handler => {
    if(mongoose.connections[0].readyState){
        return handler()
    }

    try {
        mongoose.connect( getMongoURI() , options , error => {
            if(error) throw error
            console.error(`Connected on ${ process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV }!`)
        })
    } catch (error) {
        return error
    }

    return handler()
}

export default MongoMiddleware

function getMongoURI(){
    let MONGO_URI = `${process.env.MONGODB_URI}`

    if(
        ( process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ) ||
        ( process.env.NODE_ENV && process.env.NODE_ENV !== 'production' )
    ){
        MONGO_URI += `-${ process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV }`
    }

    return `${MONGO_URI}?retryWrites=true&w=majority`
}