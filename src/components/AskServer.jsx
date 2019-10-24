import React from 'react';

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: "http://"};
    }

  render() {
    return (
      <section id="players">
          <div>
            <form method="GET" action="./" className="usernameForm">
              <input autoFocus type="text" name="sevreur" placeholder="Adresse du serveur commençant par http://" value={this.state.input} onChange={this.change} />
              <button type="submit" name="validate">Connexion</button>
            </form>
          </div>
      </section>
    )
  }
}
