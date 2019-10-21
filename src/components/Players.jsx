import React from 'react';
import Socket from '../js/Socket';

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: "", players: []};
    }

    componentDidMount() {
        Socket.on("players", (data) => this.setState({players: data.players}));
        Socket.send("updatePlayers");
    }

    componentWillUnmount() {
        Socket.getSocket().removeAllListeners("players");
    }

    change = (evt) => {
        this.setState({input: evt.target.value});
    }

    sendPseudo = (e) => {
        e.preventDefault();
        if (this.state.input.length < 3 || this.state.input[0] === "" || this.state.input.length > 15) return;
        Socket.send("join", {name: this.state.input});
    }

    ask = (name) => {
        Socket.send("ask", {name: name});
    }

    getPlayersElements() {
        return this.state.players.map((e, i) => (<li key={i}><span>{e.name}</span><span>{e.inGame ? "En jeu" : "En attente"}<button onClick={() => this.ask(e.name)} disabled={e.inGame}>{e.asked ? "Rejoindre" : "Inviter"}</button></span></li>));
    }

  render() {
    return (
      <section id="players">
          <div>
            {(() => {
                if (this.props.name) {
                    return (<div className="players">
                      <h2>Joueurs</h2>
                      <p>Connécté en tant que {this.props.name}</p>
                      <ul id="playersInQueueList">
                        {this.getPlayersElements()}
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
