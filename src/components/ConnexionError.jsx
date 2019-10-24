import React from 'react';

export default class ConnexionError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: props.url};
    }

    change = (evt) => {
        this.setState({input: evt.target.value});
    }

  render() {
    return (
      <section id="players">
          <div>
            <section>
                <h2 className="error">Erreur !</h2>
                <p className="error">{this.props.message}</p>
                <h3>Réssayer</h3>
                <form method="GET" action="./" className="usernameForm">
                  <input className="error error--border" autoFocus type="text" name="server" placeholder="Adresse du serveur" value={this.state.input} onChange={this.change} />
                  <button type="submit">Connexion</button>
                </form>
            </section>
          </div>
      </section>
    )
  }
}
