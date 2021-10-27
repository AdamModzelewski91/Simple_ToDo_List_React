import React from 'react';

const Single = (props) => {
  let watch = '';
  if (props.watch === 'false') {
    watch = <i className="far fa-eye"></i>
     }
  else if ((props.watch === 'true')) {
    watch = <i className="far fa-eye grey"></i>
  } 
  
  return(
    <li className='header MB-20'>  
      <h3>{props.name}</h3>
      <h3>{props.categ}</h3>
      <h3>{props.rating}</h3>
      <h3 onClick={() => props.moveToWatched(props.id)}>{watch}</h3>
      <button onClick={() => props.changeStatus(props.id)}><i className="fas fa-trash-alt"></i></button>
    </li>
    
  )
}

export default Single