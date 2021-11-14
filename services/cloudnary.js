import cloudinary from 'cloudinary'

export const Test = async () => {
    return await cloudinary.v2.api.ping().then(response=>{
        return true
    }).catch(error=>{
        // console.error(error);
        return false
    })
}

const Upload = async (pathBase, file) =>{
    const url = await cloudinary.v2.uploader.upload(file.path, { folder: `${ getPath() }/${pathBase}` },
        function(error, result) {
            if(error){
                // console.error(error);
            }else{
                return result
            }
        }
    )
    
    return url.secure_url
}


function getPath(){
    return `${process.env.NEXT_PUBLIC_APP_NAME}/${ process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV }`
}

export default Upload
