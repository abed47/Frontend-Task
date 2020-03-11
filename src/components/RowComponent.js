import React from 'react';
import './RowComponentStyle.css';
import alien from './../assets/images/alien.png';
import player from './../assets/images/player.png';
let rows = []
let boxWidth = 5;
let boxHeight = 5;
class RowComponent extends React.Component {

    
    UNSAFE_componentWillMount(){
        //prompt for user for dimentions
        boxWidth = prompt('enter the board\'s width',6);
        boxHeight = prompt('enter the board\'s height',6);
        generateRows(boxHeight,boxWidth)
    }

    render (){
        return (
            <div>{rows}</div>
        )
    } 
}

function generateRows(height,width){

    //assign a variable to middle row index
    let middleRow = Math.floor(height / 2)

    //loop over  the total number of columns
    for(let i = 0; i < height; i++){
        //if it is the middle row -> call generate columns
        //with the number of columns and true for middle row
        if(i === middleRow){
            rows.push(<div key={"row-"+i}>{generateColumns(width,i,true)}</div>);
            
            //else -> call generate columns
            //with middle row arg as fals
        }else{
        rows.push(<div key={"row-"+i}>{generateColumns(width,i,false)}</div>);
        }
    }
}

function generateColumns(width,rowIndex,isMiddle){
    //parent component box elements representing a row
    let row = [];
    //assign the center column index to a variable
    let center = Math.floor(width / 2);
    //generate random num for indexing
    let randomNum = generateRandomNum(width)
    //check validate that the position does not intersect with the player
    let validIndex = handleIntersection(isMiddle,randomNum,center);

    //loop and add boxes 
    for(let i = 0; width > i ;i++){
        if(isMiddle && i === center){
            row.push(<span className="box" key={rowIndex + ':' + i}><img className="image-el" src={player} alt="player"/></span>)
        }else if(i === validIndex){
            console.log(validIndex)
            row.push(<span className="box" key={rowIndex + ':' + i}><img className="image-el" src={alien} alt="alien"/></span>)
        }else{
            row.push(<span className="box" key={rowIndex + ':' + i}></span>)
        }
    }

    return row;
}

function generateRandomNum(range){
    if(range <= 10){

        //if the range is between 1 and 10
        //return random number between 0 and 10
        if(range === 10){

            return Math.floor(Math.random() * 10);

        }

        
        //generated variable between 0 and 9
        let genNum = Math.floor(Math.random() * 9);

        //if the range is less than 10
        //decrement the generated var
        if(genNum >= range){
            
            for(let i = range; genNum >= range; i--){
                genNum--;
            }

        return genNum;
        }
        return genNum;

    }else if(range >= 10){
        //generate a random number between 0 and 99
        let genNum = Math.ceil(Math.random() * range);

        //if the random num is larger then num or cols
        //decrement the generated var
        if(genNum >= range){

            for(let i = range; genNum >= range; i--){
                genNum--;
            }

            return genNum;
        }
        return genNum;
    }
}

function handleIntersection(isMiddle,randomNum, center){
    //check if is middle row
    if(isMiddle){
        //check if the alien landed on the player
        if(randomNum === center){
            return randomNum + 1;
        }
        return randomNum;
    }
    return randomNum;
}

export default RowComponent;