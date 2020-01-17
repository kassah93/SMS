import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

const style = {
    cursor : 'pointer'
};

export const Collapsible = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    const Component = props.Component;

    return (
        <React.Fragment >
            <Component onClick = {toggle} style = {style}>
                {props.header}
            </Component>
            <tr>
                <td colSpan = "8" style = {{padding : "0px"}}>
                    <Collapse isOpen = {isOpen} className = "my-3" >
                        {props.children}
                    </Collapse>           
                </td>
            </tr>
            
        </React.Fragment>
    );
}





export const Nestable = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    return (
        
        <React.Fragment >
            <div onClick = {toggle} style = {style}>              
                {props.header}
            </div>
            
            <Collapse isOpen = {isOpen} className = "my-3 ml-3" >
                {props.children}
            </Collapse>           
        </React.Fragment>
    );
}



/*export class Collapsible extends React.Component {
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
}*/