import React from 'react';

const style = {
    cursor : 'pointer'
};

export class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
        };
        //console.log(this.state);
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel() {
        this.setState(state => ({
            open : !state.open
        }));
    }

    render(){
        return(
            <div onClick = {this.togglePanel} style = {style}>
                {this.props.header}
                {this.state.open? (this.props.children) : null}
            </div>
        );

    }
}