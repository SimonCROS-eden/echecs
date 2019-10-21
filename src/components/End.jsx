import React from 'react';

export default class End extends React.Component {

  render() {
    return (
      <section id="choosePane">
          <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.message}</p>
            <button onClick={this.props.quit}>Retour au salon</button>
          </div>
      </section>
    )
  }
}
