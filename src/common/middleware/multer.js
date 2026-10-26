// import multer from "multer"

// export const upload = () => {
//     const storage = multer.diskStorage({
//         // path i will store the image in it
//         destination: "./uploads",
//         //  file name (naming of images = if user upload multi image with same name filename will handel it)
//         // cb = callBack ==> that will receive the image and if had error or not
//         filename: (req, file, cb) => {
//             // null means ==> error is null (there is no errors)
//             cb(null, `${Date.now()}-${file.originalname}`)
//         }
//     })
//     // multer validation 
//     const fileFilter = (req, file, cb) => {
//         // types are allowed
//         const allowedType = ["image/png", "image/jpeg", "image/jpg"]
//         if (!allowedType.includes(file.mimetype)) {
//             return cb(new Error("invalid image format"), false)
//         }
//         cb(null, true)
//     }

//     return multer({ storage, fileFilter })
// }



// for testing something 
import multer from "multer"
export const upload = () => {
    const storage = multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    const fileFilter = (req, file, cb) => {
        const acceptedTypes = ["image/png", "image/jpeg"]
        if (!acceptedTypes.includes(file.mimetype)) {
            console.log("false");
            return cb(new Error("image is not valid"), false)
        }
        cb(null, true)
    }
    return multer({ storage, fileFilter })
}


















