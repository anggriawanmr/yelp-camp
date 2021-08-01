const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60ee76433a83652ae89bb7ec",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla iure repudiandae magnam veniam modi, mollitia ipsum, aut neque unde itaque odio cum corrupti voluptates, earum expedita placeat alias suscipit totam! ",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/anggriawanmr/image/upload/v1626837231/YelpCamp/kumxxxi5zqfxd1tm0ino.jpg",
          filename: "YelpCamp/kumxxxi5zqfxd1tm0ino",
        },
        {
          url: "https://res.cloudinary.com/anggriawanmr/image/upload/v1626837237/YelpCamp/e53fofvznbbw6leg1yr8.jpg",
          filename: "YelpCamp/e53fofvznbbw6leg1yr8",
        },
        {
          url: "https://res.cloudinary.com/anggriawanmr/image/upload/v1626837263/YelpCamp/aqfpowttyyjmmkotjgvo.jpg",
          filename: "YelpCamp/aqfpowttyyjmmkotjgvo",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
