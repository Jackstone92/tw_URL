import React, { Component} from 'react';

class LinkCreate extends Component {

  constructor(props) {
    super(props);

    // default state for error //
    this.state = { error: ''};
  }

  // Form Submission Event Handler //
  handleSubmit(event) {
    event.preventDefault();

    // console.log(this.refs.input.value);
    // call Meteor Method //
    // add callback as last argument for error handling //
    Meteor.call('links.insert', this.refs.input.value, (error) => {
      // console.log(error);
      if(error) {
        this.setState({ error: 'Enter a valid URL'});
      } else {
        this.setState({ error: ''});
        //clear input if successful//
        this.refs.input.value = '';
      }
    });
  }

  render() {
    return(
      <div className="jumbotron mainHeader">
        <div className="container linkCreateForm">
          <div>
            <h1 className="text-center headerTitle">Boost Marketing Potential</h1>
            <h2 className="text-center headerSubtitle">Link Customisation, Shortening and Analytics</h2>
          </div>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-group">
              <div className="text-danger">{this.state.error}</div>

              <div className="form-group">
                <input ref="input" placeholder="Paste a link to shorten it" className="form-control" />
              </div>

              <span className="input-group-btn">
                <button className="btn btn-primary">Shorten</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default LinkCreate;
