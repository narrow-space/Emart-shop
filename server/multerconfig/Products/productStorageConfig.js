const multer =require("multer");
// /storage config
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
     callback(null,"./productsimguploads")

    },
    filename:(req,file,callback)=>{
        const filename =`image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})
// filter

const filefilter=(req,file,callback)=>{
    if(file.mimetype === "image/png" || file.mimetype ==="image/jpg" ||file.mimetype === "image/jpeg" ||file.mimetype === "image/webp"||file.mimetype === "image/avif"||file.mimetype === "image/gif"){
        callback(null,true)
    }else{
        callback(null,false)
            return callback(new Error("only png,jpg,jpeg formatted Allow"))
        
    }
}

const productsupload =multer({
    storage:storage,
    fileFilter:filefilter
})


module.exports =productsupload;