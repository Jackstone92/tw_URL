import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
// note: lowercase c for check! //
import { check, Match } from 'meteor/check';

Meteor.methods({
  // valid javascript key //
  // to do with links collection => links.insert //
  'links.insert': function(url) {
    // console.log('attempting to save', url);
    // returns url if success else returns undefined //
    // Match.where() to check a custom validation - check is built-in validation, but we require custom //
    check(url, Match.Where(url => validUrl.isUri(url)));

    // if passed the check, we're ready to save the url //
    // Generate random token - takes random number between 0 and 1, converts to string and slices -5 //
    const token = Math.random().toString(36).slice(-5);
    Links.insert({ url: url, token: token, clicks: 0 });
  }
});


export const Links = new Mongo.Collection('links');
