import React from 'react';

export class Home extends React.Component {

    render() {
        return(
            
            <div className = "container">
                <div className = "row">
                    <div className = "col-12">
                        <div className="alert alert-success text-center" >
                            Logged in
                        </div>                       
                    </div>
                </div>
            </div>
                       
        );
    }
}