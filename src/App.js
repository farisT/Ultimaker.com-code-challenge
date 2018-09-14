import React from 'react';
import axios from 'axios';
import Background from './components/Background';
import Widget from './components/Widget';

export default class App extends React.Component {
    constructor(){
        super()
        this.state = {
            weather: '',
            backgroundImage: '',
            cityName: 'Amsterdam',
            weatherIcon:'',
            temperature: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount(){
        this.fetchWeather();
    }
    fetchWeather () {
        let cityName = this.state.cityName;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a4a6ab8255ec6e24242b6d7955d3ee61`)
        .then(response => {
            this.sanitize(response.data.weather[0].description),
            this.setState({
                weatherIcon: response.data.weather[0].icon,
                temperature: response.data.main.temp
            })
        })

        .catch(error =>{console.log('An error occured' , error)})
    }
    //sanitizes strings to prepare for second fetch
    sanitize(string) {
        string = string.replace(" ", "")
        this.setState({weather:string},this.fetchPhoto)
    }

    //2nd Api call once the weather is identified in order to find a matching photo
    fetchPhoto () {
        let weather = this.state.weather;
        //fallback option
        if(weather === 'fewclouds'){
            weather = 'clouds';
        }
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${weather}&client_id=00a28d7b6c2032ae4347d8bc8a09235544ecb884ce68c152b51fde3a1c5a9273`)
        .then(response => {
            this.setState({backgroundImage:response.data.results[0].urls.regular})
        })
        .catch(error =>{console.log('An error occured' , error)})
    }

    handleChange(event) {
        this.setState({cityName: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.state.cityName);
        this.fetchWeather();
      }


    render(){
        return(
            <div className="app">
                <div>
                <h1 className="app__title">Weather App</h1>
                    <form  onSubmit={this.handleSubmit} className="app__form form-group" >
                        <label>
                            Search for your city:
                        <input className="form-control" type="text" value={this.state.cityName} onChange={this.handleChange} />
                        </label>
                        <div>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div>
                    <Background image={this.state.backgroundImage}>
                        <Widget temperature={this.state.temperature} city={this.state.cityName} icon={this.state.weatherIcon} />
                    </Background>
                </div>
            </div>
        )
    }
}

