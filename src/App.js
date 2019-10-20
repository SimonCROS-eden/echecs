import React from 'react';
import Game from './components/Game';
import Socket from './js/Socket';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {started: false, team: "white", display3d: false};
        Socket.on("start", (data) => this.setState({started: true, team: data.team}));
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
                    <Game team={this.state.team} display3d={this.state.display3d} />
                </main>
            );
        }
        return (<section></section>)
    }
}

export default App;
