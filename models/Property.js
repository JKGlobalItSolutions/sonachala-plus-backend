// const mongoose = require('mongoose');

// const propertySchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   location: {
//     area: { type: String, required: true },
//     city: { type: String, required: true }
//   },
//   propertyType: { type: String, required: true },
//   status: { type: String, default: 'For Rent' },
//   price: { type: Number, required: true },
//   sizeSqFt: { type: Number },
//   bedrooms: { type: Number },
//   bathrooms: { type: Number },
//   floor: { type: String },
//   facing: { type: String },
//   availabilityDate: { type: Date },
//   imageUrl: { type: String }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Property', propertySchema);


// ✅ Updated Property Model to support multiple images


const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    area: { type: String, required: true },
    city: { type: String, required: true }
  },
  propertyType: { type: String, required: true },
  status: { type: String, default: 'For Rent' },
  price: { type: Number, required: true },
  sizeSqFt: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  floor: { type: String },
  facing: { type: String },
  availabilityDate: { type: Date },
  imageUrls: [String] // ✅ Multiple images
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
