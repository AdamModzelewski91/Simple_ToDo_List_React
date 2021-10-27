import React from 'react';
import Single from './Single';

const List = (props) => {
  const movie = props.movie.map(single => (
    <Single
      key={single.id}
      id={single.id}
      name={single.name}
      categ={single.categ}
      rating={single.rating}
      watch={single.watch}
      changeStatus={props.changeStatus}
      moveToWatched={props.moveToWatched}
    />
  ))

  return (
    <ul>      
      {movie}
    </ul>
  )
}

export default List