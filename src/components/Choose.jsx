import React from 'react';
import Square from './Square.jsx';

export default class Plateau extends React.Component {

  render() {
    return (
      <section id="choosePane">
          <div>
            <h2>En quoi voullez-vous transformer le pion ?</h2>
            <div>
                <div>
                    {(() => {
                        let tr = [];
                        for (var i = 0; i < 4; i++) {
                            tr.push(<Square key={i} color={i % 2 === 0 ? "white" : "black"} />)
                        }
                        return tr;
                    })()}
                </div>
            </div>
          </div>
      </section>
    )
  }
}
