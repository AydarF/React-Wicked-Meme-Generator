import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor(){
      super();
      this.state = {
         topText: "",
         bottomText: "", 
         initialImg: "http://i.imgflip.com/1bij.jpg",
         imgCollection: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.imgCollection.length);
    const randMeme = this.state.imgCollection[randNum].url;
    this.setState({initialImg: randMeme}) 
  }
  
  handleChange(event){
      const {name, value} = event.target;
      this.setState({
        [name]: value
      })
  }

  componentDidMount(){
      fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            this.setState({
                imgCollection: response.data.memes
            })
        })
  }

  render() {  
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
            <input type="text" name="topText" value={this.state.topText} onChange={this.handleChange} placeholder="Top text" />
            <input type="text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} placeholder="Bottom text" />
            <button>Generate</button>
        </form>
        <div className="meme">
            <img src={this.state.initialImg} alt="Meme" />   
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2> 
        </div>
      </div>
    )
  }
}

export default MemeGenerator;
