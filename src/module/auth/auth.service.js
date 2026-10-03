import { userModel } from "../../database/model/user.model.js";
export const signUp = async (body) => {
    let { name, email, password, age } = body
    console.log(name, email, password, age);
    let userExists = await userModel.findOne({ email })
    if (userExists) {
        return {
            message: "user already exists"
        }
    } else {
        let addUser = await userModel.create({ name, email, password, age })
        if (addUser) {
            return {
                message: "user added successfully",
                user: addUser
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    }
}
