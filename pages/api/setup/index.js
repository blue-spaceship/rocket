import mongoose from 'mongoose'
import { Test as CloudinaryTest } from '../../../services/cloudnary'
import { Test as MailTest } from '/services/mail'
import { Test as PipelessTest } from '../../../services/pipeless'

const handler = async (req, res) => {
    if(req.method === 'GET' && process.env.NEXT_INSTALL_CONFIG === 'true'){        
        const data = {
            MONGO: await verifyMongo(),
            SECRET: verifySecret(),
            URL: verifyURLBase(),
            CLOUDINARY: await verifyCloudnary(),
            SENDGRID: await verifySendGrid(),
            PIPELESS: await verifyPipeless()
        }
        res.status(200).json(data)
    }else{
        res.status(404)
    }

    res.end()
}

async function verifyMongo(){
    const URL = (process.env.MONGODB_URI !== null && process.env.MONGODB_URI !== '' && process.env.MONGODB_URI !== undefined) ? true : false
    let STATUS = false
    if( URL ){
        STATUS = await mongoose.connect( process.env.MONGODB_URI ).then(resolved =>{
            return true
        }).catch(err =>{
            // console.error(err);
            return false
        })

        await mongoose.disconnect()
    }

    return { URL , STATUS }
}

async function verifySendGrid(){
    const URL = (process.env.SENDGRID_API_KEY !== null && process.env.SENDGRID_API_KEY !== '' && process.env.SENDGRID_API_KEY !== undefined) ? true : false
    let STATUS = false
    if( URL ){
        STATUS = await MailTest().then( result => {
            return true
        }).catch( err => {
            return false
        })
    }
    return { URL , STATUS }
}


async function verifyPipeless(){
    const NAME = (process.env.PIPELESS_APPID !== null && process.env.PIPELESS_APPID !== '' && process.env.PIPELESS_APPID !== undefined) ? true : false
    const KEY = (process.env.PIPELESS_APIKEY !== null && process.env.PIPELESS_APIKEY !== '' && process.env.PIPELESS_APIKEY !== undefined) ? true : false

    let STATUS = false
    if( NAME && KEY ){
        STATUS = await new PipelessTest().Save().then( result => {
            return true
        }).catch(err =>{
            return false
        })
    }
    return { NAME, KEY , STATUS }
}

async function  verifyCloudnary(){
    const URL = (process.env.CLOUDINARY_URL !== null && process.env.CLOUDINARY_URL !== '' && process.env.CLOUDINARY_URL !== undefined) ? true : false
    let STATUS = false
    if( URL ){
        STATUS = await CloudinaryTest()
    }
    return { URL , STATUS }
}

function verifySecret(){
    return process.env.SESSION_SECRET !== null && process.env.SESSION_SECRET !== '' && process.env.SESSION_SECRET !== undefined ? true : false
}

function verifyURLBase(){
    return process.env.NEXTAUTH_URL || false
}


export default handler