const db = require ('./conn.js');

class topics {

    static async getAll() {
        try {
            const response = await db.any(`select topics.topic, topics.number, ranks.name from topics join ranks on topics.number = ranks.number order by topics.display_order`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async updateRank(topic, newRank) {
        const query = `update topics set number = ${newRank} where topic = '${topic}'`;

        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log("ERROR", err.message);
            return err
        }
    }
}

module.exports = topics;