if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

//min 53:41 https://www.youtube.com/watch?v=jP2DNQyOE90