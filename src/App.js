import React from 'react';
import Players from './components/Players';
import Game from './components/Game';
import AskServer from './components/AskServer';
import Socket from './js/Socket';
import ConnexionError from './components/ConnexionError';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {started: false, team: "white", display3d: false, name: null, needAskServer: false, unknownServer: null, disconnect: null};
    }

    componentDidMount() {
        Socket.start(() => {
            Socket.on("name", (data) => this.setState({name: data.name}));
            Socket.on("start", (data) => this.setState({started: true, team: data.team}));
            this.forceUpdate();
        }, () => this.setState({needAskServer: true}), (url) => this.setState({unknownServer: url}), (url) => this.setState({disconnect: url}));
    }

    quit = () => {
        this.setState({started: false, team: "white", display3d: false});
    }

    render() {
        if (!Socket.connecting) {
            console.log(1);
            if (this.state.started) {
                return (
                    <main>
                        <div className="can-toggle">
                          <input id="e" type="checkbox" onChange={(evt) => this.setState({display3d: evt.target.checked})} />
                          <label htmlFor="e" data-checked="3D" data-unchecked="2D">
                            <div></div>
                          </label>
                        </div>
                        <Game quit={this.quit} team={this.state.team} display3d={this.state.display3d} />
                    </main>
                );
            } else if (this.state.needAskServer) {
                return (<main><AskServer /></main>)
            } else if (this.state.disconnect) {
                return (<main><ConnexionError url={this.state.disconnect} message={"Connexion avec le serveur interrompue (\"" + this.state.disconnect + "\")"} /></main>)
            } else if (this.state.unknownServer) {
                return (<main><ConnexionError url={this.state.unknownServer} message={"Impossible de se connecter au serveur (\"" + this.state.unknownServer + "\")"} /></main>)
            }
            return (<main><Players name={this.state.name} /></main>)
        }
        // connecting page
        return <main></main>
    }
}

export default App;
