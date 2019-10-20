import React from 'react';
import Socket from '../js/Socket';

export default class Plateau extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: ""};
    }

    change = (evt) => {
        this.setState({input: evt.target.value});
    }

    sendPseudo = () => {
        if (this.state.input.length < 3 || this.state.input[0] === "" || this.state.input.length > 15) return;
        Socket.send("join", {pseudo: this.state.input});
    }

  render() {
    return (
      <section id="players">
          <div>
            {(() => {
                if (this.props.pseudo) {
                    return (<div className="players">
                      <h2>Joueurs</h2>
                      <ul id="playersInQueueList">
                      </ul>
                    </div>);
                }
                return (<form method="GET" action="" className="usernameForm">
                  <input autoFocus type="text" name="username" placeholder="Pseudo" value={this.state.input} onChange={this.change} />
                  <button type="submit" onClick={this.sendPseudo} name="validate">Connexion</button>
                </form>);
            })()}
          </div>
      </section>
    )
  }
}
