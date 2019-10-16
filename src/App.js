import React from 'react';
import Game from './components/Game';
import Socket from './js/Socket';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {started: false};
        Socket.on("start", () => this.setState({started: true}));
    }

    render() {
        if (this.state.started) {
            return (
                <Game pions={this.state.pions} />
            );
        }
        return (<section></section>)
    }
}

export default App;
