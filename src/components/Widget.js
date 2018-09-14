import React from 'react';

const Widget = (props) => {
    console.log(props.icon)
    let weatherIcon = `http://openweathermap.org/img/w/${props.icon}.png`
    console.log(weatherIcon)
    return (
    <div className="widget">
        <div className="widget__city">
            {props.city}
        </div>
        <div className="city__weather">
            <span className="temperature">
                {props.temperature}
            </span>
            <span>
                <img className="temperature__icon" src={weatherIcon} />
            </span>
        </div>
    </div>
    )
}

export default Widget;