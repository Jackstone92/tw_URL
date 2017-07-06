import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
// import to add more middleware - functions when requests come in //
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';


Meteor.startup(() => {
  // Publish Links data to react component //
  Meteor.publish('links', function() {
    return Links.find({});
  });

});



// helper function - executed whenever a user visits with a route //
// like 'localhost:3000/abcd' //
// req = request, res = response, next = next middleware that we need to run //
function onRoute(req, res, next) {
  // If token in request url matches up to link in our links collection //
  // Take token out of the url and try to find the first matching //
  // link in the Links collection and assign it to the variable, link //
  const link = Links.findOne({ token: req.params.token });

  if(link) {
    // Increment the Link Counter //
    // Links.update using Mongo-Style Modifiers //
    Links.update(link, { $inc: { clicks: 1 }});

    // If we find a link object, redirect the user to the long URL //
    // Sets status of request to 307 - request and provide location as link.url //
    res.writeHead(307, { 'Location': link.url });
    // Send response back to user //
    res.end();
  } else {
    // If we don't find a link object, send the user to our normal React App //
    // Hand request to next middleware and eventually it will fall back to react //
    next();
  }
}

// Middleware //
const middleware = ConnectRoute(function(router) {
  // if incoming HTTP request matches token, execture following function //
  // example: //
  // localhost:3000/ NO MATCH //
  // localhost:3000/books/harry_potter NO MATCH //
  // localhost:3000/abcd WILL MATCH! //
  router.get('/:token', onRoute);
});

// WebApp ConnectHandler //
WebApp.connectHandlers
  .use(middleware);
