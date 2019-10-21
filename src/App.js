import React from 'react';
import Players from './components/Players';
import Game from './components/Game';
import Socket from './js/Socket';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {started: false, team: "white", display3d: false, name: null};
        Socket.on("name", (data) => this.setState({name: data.name}));
        Socket.on("start", (data) => this.setState({started: true, team: data.team}));
    }

    quit = () => {
        this.setState({started: false, team: "white"});
    }

    render() {
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
        }
        return (<main><Players name={this.state.name} /></main>)
    }
}

export default App;
