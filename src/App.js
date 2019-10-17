import React from 'react';
import Game from './components/Game';
import Socket from './js/Socket';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {started: false, team: "white"};
        Socket.on("start", (data) => this.setState({started: true, team: data.team}));
    }

    render() {
        if (this.state.started) {
            return (
                <Game team={this.state.team} />
            );
        }
        return (<section></section>)
    }
}

export default App;
