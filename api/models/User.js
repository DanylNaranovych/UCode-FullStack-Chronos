import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class User extends Model {
    constructor() {
        super("users");
    }

    async create(login, full_name, email, password) {
        const query = `INSERT INTO users(login, full_name, email, password) VALUES(?, ?, ?, ?);`;
        let res = await dbService.makeRequest(query, [login, full_name, email, password]);

        return this.read(res[0].insertId);
    }

    async read(id) {
        const data = await super.read(id);
        this.id = data[0][0].id;
        this.login = data[0][0].login;
        this.password = data[0][0].password;
        this.email = data[0][0].email;
        this.picture_path = data[0][0].picture_path;
        this.full_name = data[0][0].full_name;
    }

    async loginDataCheck(login, password) {
        const sql = 'SELECT * FROM users WHERE login=? AND password=?;';

        let result = await dbService.makeRequest(sql, [login, password]);

        if (result[0].length)
            return result[0][0].id;
        return -1;
    }

    async checkExists(name, value) {
        const query = `SELECT * FROM ${this.table} WHERE ${name} = '${value}'; `;
        const result = await dbService.makeRequest(query);
        return !!result[0].length;
    }

}