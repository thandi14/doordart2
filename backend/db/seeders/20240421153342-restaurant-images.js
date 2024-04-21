'use strict';

const { RestaurantImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await RestaurantImage.bulkCreate([
    {
      restaurantId: 1,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/1b599fc1-8379-4d63-b0d0-188e4a8b1107.png",
      thumbnailUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,format=auto,width=800,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/8b814800-3cc3-48cb-b7d3-53f47260001f-retina-large.png",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/50754f10-b3c9-420f-99e0-23e7d3f23cc2.png"
    },
    {
      restaurantId: 2,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/e6735cfe-fb1f-4a92-9039-5c39622a4c63.jpg",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=800,format=auto,quality=50/media/photosV2/10c93a6f-dfc3-4507-96d2-1d990a60b4a5-retina-large.JPG",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/Jack_Cover_Square.jpg"
    },
    {
      restaurantId: 3,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/e5e9af30-b1c5-4362-b954-ab7809a15e64.png",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/photosV2/d8cfe3a2-00a1-4ef9-a03b-b15e4348602d-retina-large.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/9818c8eb-75ba-4ed1-9369-318e1a1e62b8.png"
    },
    {
      restaurantId: 4,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/375489.jpg",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/store/header/375489.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/Freddys_logo.jpg"
    },
    {
      restaurantId: 5,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/81992eab-1618-44cb-8048-9fab2b06c96f.jpg",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/photosV2/2857d082-f66d-4092-b899-b77213562c95-retina-large.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/8dc8aef3-b444-4dfc-9581-2cf9ac05e7b1.png"
    },
    {
      restaurantId: 6,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/d9e85489-3652-435d-a2c9-c2bc2febb1b2.png",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/photosV2/e14be211-7745-4375-809f-427e103d4eb1-retina-large.JPG",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/0kVe4BPb.png"
    },
    {
      restaurantId: 7,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/98cf7abd-44d6-4d7e-a9d3-ec97f62ee21e.png",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/photosV2/4dc778de-e74f-4ce0-ba10-6167604d065e-retina-large.png",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/cdd6c814-7677-4d83-9b7b-b88dc77ffa36.jpg"
    },
    {
      restaurantId: 8,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/0608ed10-94d1-49c1-88e0-1d6fc2889568.jpg",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=400,format=auto,quality=50/media/photosV2/5f65cd3e-d3dc-4b18-b93d-1bbb3cf85dff-retina-large.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=200,height=200,format=auto,quality=95/media/restaurant/cover_square/d439d236-e807-41d4-a7ea-0f83500de5c6.png"
    },
    {
      restaurantId: 9,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/9ce6e934-5ff0-4819-b7c6-acff7e181d3a.jpeg",
      thumbnailUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,format=auto,width=800,quality=50/https://doordash-static.s3.amazonaws.com/media/photosV2/57d3b1d4-27fe-4b23-8be9-78ae6e822207-retina-large.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=1200,height=76,format=auto,quality=95/media/restaurant/cover_square/b532d10d-d59b-4b97-9eb2-3389294d3e09.png"
    },
    {
      restaurantId: 10,
      bannerUrl: "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/eab72985-d7df-4c40-8d1a-2dc22736d224.jpg",
      thumbnailUrl: "https://img.cdn4dd.com/p/fit=cover,width=800,format=auto,quality=50/media/photosV2/05d06641-a1b9-4054-b1bb-90a95f7ce023-retina-large.jpg",
      iconUrl: "https://img.cdn4dd.com/p/fit=contain,width=1200,height=76,format=auto,quality=95/media/restaurant/cover_square/Cracker_Barrel_logo.jpg"
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RestaurantImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {})
  }
};
