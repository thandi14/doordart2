'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { User } = require("../models");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'demo-lition',
        firstName: "Demo",
        lastName: "Lition",
        state: "CA",
        city: "Los Angeles",
        address: "1901 Blake Ave",
        zipCode: "90039",
        phone: "817235499",
        door: false,
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'fakeUser1',
        firstName: "Fake",
        lastName: "User1",
        state: "CA",
        city: "Irvine",
        address: "1100 Steely",
        zipCode: "92614",
        phone: "817333444",
        door: true,
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'fakeUser2',
        firstName: "Fake",
        lastName: "User2",
        state: "TX",
        city: "Arlington",
        address: "3701 Dr. MLK Jr Dr",
        zipCode: "76014",
        phone: "817565472",
        door: false,
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'thandimpofu2003@user.io',
        username: 'thandi.14',
        firstName: "Thandi",
        lastName: "Mpofu",
        state: "TX",
        city: "Keller",
        address: "1740 Hickory Chase Cir",
        zipCode: "76248",
        phone: "8179756306",
        door: true,
        hashedPassword: bcrypt.hashSync('Love2003!')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo-lition', 'fakeUser1', 'fakeUser2', "thandi.14"] }
    }, {});
  }
};
