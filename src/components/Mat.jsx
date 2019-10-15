import React from 'react';

export default class Plateau extends React.Component {

  render() {
    return (
      <section id="choosePane">
          <div>
            <h2>{this.props.message}</h2>
          </div>
      </section>
    )
  }
}
