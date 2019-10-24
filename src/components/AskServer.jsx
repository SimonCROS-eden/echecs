import React from 'react';

export default class AskServer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: "http://"};
    }

    change = (evt) => {
        this.setState({input: evt.target.value});
    }

  render() {
    return (
      <section id="players">
          <div>
            <section>
                <h2>Connexion à un serveur sur le réseau local</h2>
                <form method="GET" action="./" className="usernameForm">
                  <input autoFocus type="text" name="server" placeholder="Adresse du serveur" value={this.state.input} onChange={this.change} />
                  <button type="submit">Connexion</button>
                </form>
            </section>
          </div>
      </section>
    )
  }
}
