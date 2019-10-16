import React from 'react';
import PieceRender from './PieceRender';

export default class Plateau extends React.Component {

  onClick = (type) => {
    this.props.game.transform(type);
  }

  render() {
    return (
      <section id="choosePane">
          <div>
            <h2>En quoi voullez-vous transformer le pion ?</h2>
            <div>
                <div>
                    {(() => {
                        let tr = [];
                        let all = ["reine", "fou", "tour", "cavalier"];
                        for (let e of all) {
                          tr.push(<Proposition key={tr.length} color={this.props.color} onClick={this.onClick} type={e} />);
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

class Proposition extends React.Component {
  render() {
    return (
      <div className={"square"} onClick={() => {this.props.onClick(this.props.type)}}>
        <PieceRender displayType={this.props.type} color={this.props.color} />
      </div>
    );
  }
}
