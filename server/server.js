const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
let app = express();



//Static file
app.use(express.static(publicPath));

//Fire up the server
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
