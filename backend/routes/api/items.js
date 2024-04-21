const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, MenuItem, ItemOption, ItemSelection } = require('../../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
    let itemId = req.params.id;
    let itemExist = await MenuItem.findByPk(itemId);

    if (!itemExist) {

        res.status(404).json({"message": "Menu Item couldn't be found"});

    }

    let item = await MenuItem.findByPk(itemId, {
        include : [
            {
                model: ItemOption,
                include : [
                    { model: ItemSelection }
                ]
            }
        ]
    });

    res.json( item )

})


module.exports = router;
