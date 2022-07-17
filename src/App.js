import Particles from 'react-tsparticles'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import React,{ Component } from 'react';

const app = new Clarifai.App({
  apiKey: '9696118b2e93421d905dc122c4254883'
})

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enables: true,
        value_area: 800
      }
    }
  }  
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err){

      }
    )
  }

  render(){
      return (
        <div className="App">
          <Particles className='particles'
          params={particlesOptions} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageUrl={this.state.imageUrl} />
        </div>
      );
    }
}

export default App;
