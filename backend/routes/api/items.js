const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, MenuItem, ItemOption, ItemSelection, ItemRecommendation, CartItems, CartItemNotes } = require('../../db/models');

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
                    {
                        model: ItemSelection,
                        include : [
                            {
                                model: ItemRecommendation,
                                include : [
                                    {
                                        model: ItemOption,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: ItemRecommendation,
                        include : [
                            {
                                model: ItemOption,
                            }
                        ]
                    }

                ]
            }
        ]
    });

    res.json( item )

})

router.get('/:id', async (req, res) => {
    let itemId = req.params.id;
    let itemExist = await MenuItem.findByPk(itemId);

    if (!itemExist) {

        res.status(404).json({"message": "Menu Item couldn't be found"});

    }

    const mostRecentCart = await ShoppingCart.findOne({
        order: [
            ['createdAt', 'DESC'] 
        ]
    })

    let item = await CartItems.findByPk(itemId, {
        where: {
            itemId,
            cartId: mostRecentCart.datavalues.id

        },
        include : [
            {
                model: MenuItem,
                model: {
                    model: CartItemNotes,
                    include : [
                        {
                            model: ItemSelection,
                            include : [
                                {
                                    model: ItemRecommendation,
                                    include : [
                                        {
                                            model: ItemOption,
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            model: ItemRecommendation,
                            include : [
                                {
                                    model: ItemOption,
                                }
                            ]
                        }

                    ]
                },
            }
        ]
    });

    res.json( item )

})


module.exports = router;
