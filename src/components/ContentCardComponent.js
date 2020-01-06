import React from 'react';
import {Card, CardBody, CardHeader, CardTitle, CardText, Badge} from 'reactstrap';

export const ContentCard = ({type , color, name , ID, symbol}) => {
    let maxHeight;
    if (symbol) {
         maxHeight = "150px";
    } else {
         maxHeight = "100px";
    }
    return(
        <div className = "col-md-4" key = {ID}>
            <Card outline color = {color} style = {{border : "2px solid" , maxHeight : maxHeight}}  >
                <CardHeader>
                    <Badge color = {color} > {type + " ID :"} </Badge> 
                    <Badge color = "light">{ID}</Badge>                          
                </CardHeader>
                <CardBody >
                    <CardTitle>
                        <Badge color = {color}>{type + " Name :"} </Badge>
                        <Badge  color = "light"> {name} </Badge> 
                    </CardTitle>
                    {symbol ? (<CardText>
                                    <Badge color = {color}>{type + " Symbol :"} </Badge>
                                    <Badge  color = "light"> {symbol} </Badge>
                               </CardText>) : null}
                </CardBody>
            </Card>
        </div>
    );
}
