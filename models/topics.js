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

    static async updateAllRanks(topicArray, newRankArray) {
        let query = `update topics as t set
                        number = c.number
                        from (values
                            ('${topicArray[0]}', ${newRankArray[0]}),
                            ('${topicArray[1]}', ${newRankArray[1]}),
                            ('${topicArray[2]}', ${newRankArray[2]}),
                            ('${topicArray[3]}', ${newRankArray[3]}),
                            ('${topicArray[4]}', ${newRankArray[4]}),
                            ('${topicArray[5]}', ${newRankArray[5]})
                        ) as c(topic, number)
                        where t.topic = c.topic`;
        // console.log("Update Query", query);
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

// update topics as t set
//     number = c.number
// from (values
//     ('Node', 5),
//     ('Express', 0)
// ) as c(topic, number)
// where t.topic = c.topic;