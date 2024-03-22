import dbService from "../utils/dbService.js";

export default class Model {

    constructor(table) {
        this.table = table;
    }

    async create(data) {
        const query = `INSERT INTO ${this.table} SET ${data} ; `;
        return await dbService.makeRequest(query);
    }

    async read(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ${id}; `;
        return await dbService.makeRequest(query);
    }

    async update(id, name, value) {
        const query = `UPDATE ${this.table} SET ${name} = ? WHERE id = ? ; `;
        await dbService.makeRequest(query, [value, id]);
    }

    async delete(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?; `;
        await dbService.makeRequest(query, [id]);
    }
}