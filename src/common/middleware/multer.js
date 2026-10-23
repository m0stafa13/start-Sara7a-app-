import multer from "multer"

export const upload = () => {
    const storage = multer.diskStorage({
        // path i will store the image in it
        destination: "./uploads",
        //  file name (naming of images = if user upload multi image with same name filename will handel it)
        // cb = callBack ==> that will receive the image and if had error or not
        filename: (req, file, cb) => {
            // null means ==> error is null (there is no errors)
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    // multer validation 
    const fileFilter = (req, file, cb) => {
        // types are allowed
        const allowedType = ["image/png", "image/jpeg", "image/jpg"]
        if (!allowedType.includes(file.mimetype)) {
            return cb(new Error("invalid image format"), false)
        }
        cb(null, true)
    }

    return multer({ storage, fileFilter })
}



