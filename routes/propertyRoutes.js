// const express = require('express');
// const router = express.Router();
// const Property = require('../models/Property');
// const multer = require('multer');
// const path = require('path');

// // Multer storage setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // GET all properties
// router.get('/', async (req, res) => {
//   try {
//     const properties = await Property.find();
//     res.json(properties);
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     res.status(500).json({ message: 'Error fetching properties' });
//   }
// });

// // GET single property
// router.get('/:id', async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.json(property);
//   } catch (error) {
//     console.error('Error fetching property:', error);
//     res.status(500).json({ message: 'Error fetching property' });
//   }
// });

// // POST create new property (with image)
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//     const newProperty = new Property({
//       title: req.body.title,
//       location: {
//         area: req.body.area,
//         city: req.body.city
//       },
//       propertyType: req.body.propertyType,
//       status: req.body.status,
//       price: req.body.price,
//       sizeSqFt: req.body.sizeSqFt,
//       bedrooms: req.body.bedrooms,
//       bathrooms: req.body.bathrooms,
//       floor: req.body.floor,
//       facing: req.body.facing,
//       availabilityDate: req.body.availabilityDate,
//       imageUrl: imageUrl
//     });

//     await newProperty.save();
//     res.status(201).json(newProperty);
//   } catch (error) {
//     console.error('Error creating property:', error);
//     res.status(500).json({ message: 'Error creating property' });
//   }
// });

// // ✅ PUT update property (with image upload)
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const updateData = {
//       title: req.body.title,
//       price: req.body.price,
//       status: req.body.status,
//       bedrooms: req.body.bedrooms,
//       bathrooms: req.body.bathrooms
//     };

//     // If new image uploaded
//     if (req.file) {
//       updateData.imageUrl = `/uploads/${req.file.filename}`;
//     }

//     const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!updatedProperty) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     res.json(updatedProperty);
//   } catch (error) {
//     console.error('Error updating property:', error);
//     res.status(500).json({ message: 'Error updating property' });
//   }
// });

// // DELETE property
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProperty = await Property.findByIdAndDelete(req.params.id);
//     if (!deletedProperty) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.json({ message: 'Property deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting property:', error);
//     res.status(500).json({ message: 'Error deleting property' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const multer = require('multer');
const path = require('path');

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Create Property – Upload multiple images
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    const newProperty = new Property({
      title: req.body.title,
      location: {
        area: req.body.area,
        city: req.body.city
      },
      propertyType: req.body.propertyType,
      status: req.body.status,
      price: req.body.price,
      sizeSqFt: req.body.sizeSqFt,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      floor: req.body.floor,
      facing: req.body.facing,
      availabilityDate: req.body.availabilityDate,
      imageUrls
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('❌ Create Error:', err);
    res.status(500).json({ message: err.message || 'Failed to create property' });
  }
});

// ✅ Update Property
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      price: req.body.price,
      status: req.body.status,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      // add more fields as needed
    };

    if (req.files && req.files.length > 0) {
      updateData.imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Property not found' });
    res.json(updated);
  } catch (err) {
    console.error('❌ Update Error:', err);
    res.status(500).json({ message: err.message || 'Failed to update property' });
  }
});

// ✅ Get All Properties
router.get('/', async (req, res) => {
  try {
    const data = await Property.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get One Property by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Property.findById(req.params.id);
    item ? res.json(item) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete Property
router.delete('/:id', async (req, res) => {
  try {
    const del = await Property.findByIdAndDelete(req.params.id);
    del ? res.json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;








// Admin login


// POST /api/admin/AdminLogin
router.post("/AdminLogin", async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    return res.json({ success: true, message: "Logged in" });
  } else {
    return res.json({ success: false, message: "Invalid credentials" });
  }
});




// 


router.put(
  "/:id",
  upload.array("images", 10), // allow up to 10 images
  async (req, res) => {
    const files = req.files; // ⬅️ array of files
    const { title, price, status, bedrooms, bathrooms } = req.body;

    const imageUrls = files.map((file) => `/uploads/${file.filename}`);

    const updateData = {
      title,
      price,
      status,
      bedrooms,
      bathrooms,
      $push: { imageUrls: { $each: imageUrls } }, // append images
    };

    try {
      await Property.findByIdAndUpdate(req.params.id, updateData);
      res.json({ success: true, message: "Property updated" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);
