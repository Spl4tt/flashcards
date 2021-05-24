const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

// Call random page when accessing /cards
router.get('/', (req, res) => {
    const randomCardId = Math.floor(Math.random() * cards.length);
    // Redirect to correct page
    res.redirect(`cards/${randomCardId}?side=question`); //?side=question is not needed as the below route will automatically add it.. But anyway
});

// If accessing a card directly, add query string and show the question or the answer
router.get('/:id', (req, res) => {
    let { side } = req.query;
    const { id } = req.params;

    // If direct access to card page: add query string to question side
    if(!side || (side !== 'question' && side !== 'answer')) {
        res.redirect(`${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    // -> {prompt: cards[req.params.id].question, hint: cards[req.params.id].hint}
    const  templateData = { id, text, name };

    if(side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }
    else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;