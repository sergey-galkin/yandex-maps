import React from 'react'
import { type Point } from '../Types'

interface Props {
  active: boolean;
  index: number;
  point: Point;
  handleClick: (index: number) => void;
}

const Item = React.memo<Props>(({ active, index, point, handleClick }) => {
  const activeClass = active ? 'active' : '';
  
  return (
    <li className={`item ${activeClass}`} onClick={() => handleClick(index)}>
      <p className='address'>{point.address}</p>
      <ul className='budgets-list'>
        {point.budgets.map(b => <li key={b} className='budgets-list-item'>{b}</li>)}
      </ul>
    </li>
  )
})

export default Item