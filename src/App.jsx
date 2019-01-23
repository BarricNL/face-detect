import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navi/Navigation';
import SignIn from './components/signin/signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import './App.css';
import 'tachyons'



const app = new Clarifai.App({
 apiKey: 'b2d5347224d24699b5e4f3bd75f96db9'
});


const particlesOptions = {
  
    particles: {
      number:{
        value:100,
        density:{
          enable: true,
          value_area:800
        }
      }
  }

}


class App extends Component {

constructor(){
  super()
  this.state={
    input:'',
    imageUrl:'',
    box:{},
    route: 'signout',
    isSignedIn: false
  }
}



calculateFaceLocation=(data)=>{
  const  clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
 
  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col *width),
    bottomRow: height - (clarifaiFace.bottom_row *height)

  }
}

displayFaceBox = (box) => {
  
  this.setState({box:box})
}

onInputChange= (event)=>{
  this.setState({input:event.target.value})
}

onButtonSubmit=()=>{
  this.setState({imageUrl:this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    (response) => this.displayFaceBox(this.calculateFaceLocation(response)))
   .catch(err=>console.log(err));


  

}

onRouteChange = (route)=>{
  if(route==='signout'){
    this.setState({isSignedIn: false})
  } else if (route === 'signin'){
    this.setState({isSignedIn:true})
  }
  this.setState({route : route})
}

  render() {
    
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
          <Particles className='particles'
              params={particlesOptions}
          />
          <Navigation onRounteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          
          { route === 'signin'
          
          ? <div> 
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          :(
            route==='signout'
            ?<SignIn onRouteChange={this.onRouteChange}/>
            :<Register onRouteChange={this.onRouteChange}/>
          )
          
         
          }

      </div>
    );
  }
}

export default App;