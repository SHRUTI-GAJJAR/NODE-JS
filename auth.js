
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Persons');


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        // console.log('Received credentials:', USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const ispassMatch = await user.comparePass(password);
        if (ispassMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username.' });
        }
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;