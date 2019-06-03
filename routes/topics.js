const express = require('express'),
    router = express.Router();
    topicsModel = require('../models/topics')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const allTopics = await topicsModel.getAll();
    console.log("allTopics:", allTopics);
    res.render('template', {
        locals: {
            title: 'Development Topics',
            topicsList: allTopics
        },
        partials: {
            partial: 'partial-topics' //.html is implied
        }
    });
});

router.post('/', (req,res) => {
    const topic = req.body.topic;
    const rank = req.body.Rank;
    // console.log("request body:", req.body)
    console.log("topic", topic, "rank", rank)
    // topicsModel.updateRank(topic,rank)
    topicsModel.updateAllRanks(topic, rank)
    .then(async () => {
        // res.status(200).send('SUCCESS!');
        const allTopics = await topicsModel.getAll();

        res.render('template', {
            locals: {
                title: 'Development Topics',
                topicsList: allTopics
            },
            partials: {
                partial: 'partial-topics' //.html is implied
            }
        });

    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

module.exports = router;