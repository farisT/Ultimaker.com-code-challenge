import React from 'react';


const Background = (props) => {
    let backgroundStyle ={
        backgroundImage: `url(${props.image})`
    }
    return (
        <div className='background' style={backgroundStyle}>
            {props.children} 
        </div>
    )
}

export default Background