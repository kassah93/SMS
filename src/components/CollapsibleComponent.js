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
        const Component = this.props.Component;
        return(
            <React.Fragment>
                <Component onClick = {this.togglePanel} style = {style}>
                    {this.props.header}
                </Component>
                {this.state.open? (this.props.children) : null}
            </React.Fragment>
        );

    }
}