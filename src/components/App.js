import React, { Component } from 'react';
import List from './List';

export default class App extends Component{

  state={
    output: [],
    input: '',
    category: '',
    rate: '',
    watched: '',
    watchNumber: 0,
    watchedNumber: 0,
  }

  static defaultProps ={
    movieBase:[]
  }

  handleInput= (e) =>{
    const input = e.target.value
    this.setState({
      input
    })
  }

  handleAddMovie = () =>{  
    const {movieBase} = this.props
    const {input, category, rate, watched} = this.state
    if (input === '' || category === '' || rate === '' || watched === '' ) return alert('uzupełnij pola')  
    const newID = movieBase.length + 1
    movieBase.push({id: newID, name: input, categ: category, rating: rate, watch: watched}) 
    const watchNumber = movieBase.filter(single => single.watch === 'false').length
    const watchedNumber = movieBase.filter(single => single.watch === 'true').length    
    this.setState({
      watchNumber,
      watchedNumber,      
      output: movieBase,
      input: '',
      category: '',
      rate: '',
      watched: '',      
    })
  }  

  handleFiltrMovies (e) {    
    let movieBase = [...this.props.movieBase]
    const watch = e.target.value    
    if(watch === 'all') {
        this.setState({
        output: this.props.movieBase
      })
    }
      else {
        movieBase = movieBase.filter(single => single.watch === watch)
        this.setState({
          output: movieBase
        })
      }
    }  

  handleRemoveMovie = (id) => {  
    const {movieBase} = this.props    
    const index = movieBase.map(single => single.id).indexOf(id)    
    this.props.movieBase.splice(index, 1)    
    const watchNumber = movieBase.filter(single => single.watch === 'false').length
    const watchedNumber = movieBase.filter(single => single.watch === 'true').length   
    this.setState({
      watchNumber,
      watchedNumber,
      output: this.props.movieBase        
    })
  } 

  handleMoveToWatched = (id) => { 
    const {movieBase} = this.props        
    const index = movieBase.map(single => single.id).indexOf(id)   
    if(this.props.movieBase[index].watch === 'true')  {
      this.props.movieBase[index].watch = 'false'
    } else if (movieBase[0].watch === 'false') {
      this.props.movieBase[index].watch = 'true'
    }     
    const watchNumber = movieBase.filter(single => single.watch === 'false').length
    const watchedNumber = movieBase.filter(single => single.watch === 'true').length
    this.setState({
      watchNumber,
      watchedNumber,
      output: this.props.movieBase,      
    })
  }

  handleSelect= (e) => {    
    this.setState({
      [e.target.name]: e.target.value
    })
  }
 
  render(){
    const {output, watchNumber, watchedNumber, input, category, rate, watched} = this.state   
    const {movieBase} = this.props 
    return(
     
      <div className='wrapp'>
        <div className='boardButtons MB-20' onClick={(e) => this.handleFiltrMovies(e, 'value')}>
          <button value='false'>Movie to watch: <br/> <span>{watchNumber}</span></button>
          <button value='true'>Movie watched: <br/>  <span>{watchedNumber}</span></button>
          <button value='all'> All my movies: <br/>  <span>{movieBase.length}</span></button>
        </div>    

        <div className='header wrapper-list MB-20'>
          <h2>Name</h2>
          <h2>Category</h2>
          <h2>Rate</h2>
          <h2>Watched</h2>
          <h2>Remove</h2>
        </div>
               
        <List
          movie={output}
          changeStatus={this.handleRemoveMovie}
          moveToWatched={this.handleMoveToWatched}
        />  

        <div  className='btnInput'>        
        <input onChange={this.handleInput} value={input} className='MB-20' type="text" placeholder='Type name of the movie' />
        <button className='btnAdd' onClick={this.handleAddMovie}><h1>Add movie</h1></button>
        </div>

        <div className='options MB-20'>
          <div className='option'>
            <h3>Category</h3>
            <select name='category' value={category} onChange={this.handleSelect}>
              <option value="">Select</option>
              <option value="Horror">Horror</option>
              <option value="Si-Fi">Si-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Action">Action</option>
            </select>
          </div>
          <div className='option'>
            <h3>Rate</h3>
            <select name='rate' value={rate} onChange={this.handleSelect}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className='option'>
            <h3>To watch/watched?</h3>
            <select name='watched' value={watched} onChange={this.handleSelect}> 
              <option value="">Select</option>
              <option value='false'>To watch</option>
              <option value='true'>Watched</option>           
            </select>
          </div>
        </div>
        </div>
      
    )
  }
}

