import React, { Component } from 'react';
// npm install --save react-addons-pure-render-mixin //
// meteor add react-meteor-data //
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';


class LinkList extends Component {

  // Helper class to map list of links //
  renderRows() {
    return this.props.links.map(link => {

      const shortLink = `http://localhost:3000/${link.token}`;

      return(
        <tr key={link.token}>
          <td>{link.url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>
            {link.clicks}
          </td>
        </tr>
      );
    });
  }

  render() {
    return(
      <div className="container linkListTable">
        <h1 className="text-center">View Your Shortened URLs:</h1>
        <br/><br/>
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">URL</th>
              <th className="text-left">Address</th>
              <th className="text-left">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

//Subscription//
export default createContainer(() => {
  Meteor.subscribe('links');

  return { links: Links.find({}).fetch() };
}, LinkList);
