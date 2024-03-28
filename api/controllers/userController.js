import TokenService from "../utils/tokenService.js";
import User from "../models/User.js";

export default class usersController {
    static async updateUserPhoto(req, res) {
        try {
            const token = req.cookies.token;
            const { userId } = await TokenService.getData(token);
            const usersTable = new User();

            const filePath = '/pics/IMG_' + Date.now() + '.' + req.files.photo.name.split('.').pop();

            await req.files.photo.mv("public" + filePath);
            await usersTable.update(userId, "picture", filePath);

            res.status(200).json({
                msg: "Success",
            });
        } catch (err) {
            console.error(err);
        }
    }
}