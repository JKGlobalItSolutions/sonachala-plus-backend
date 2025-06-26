// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const propertyRoutes = require('./routes/propertyRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/properties', propertyRoutes);

// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('MongoDB connected');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// })
// .catch(err => console.error('MongoDB connection error:', err));




// server.js


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const propertyRoutes = require('./routes/propertyRoutes');

// const adminRoutes = require('./routes/adminRoutes');
// app.use('/api/admin', adminRoutes);


// const app = express();
// const PORT = process.env.PORT || 5000; // ✅ UNCOMMENTED and FIXED

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/properties', propertyRoutes);



// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('✅ MongoDB connected');
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// })
// .catch(err => console.error('❌ MongoDB connection error:', err));




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express(); // ✅ Make sure this is declared before any app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes); // ✅ This must come after app is declared

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to MongoDB and start server
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
//     );
//   })
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
