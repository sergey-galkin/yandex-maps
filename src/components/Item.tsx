import React, { useRef } from 'react'
import { type Point } from '../Types'

interface Props {
  active: boolean;
  index: number;
  point: Point;
  handleClick: (index: number) => void;
}

const Item = React.memo<Props>(({ active, index, point, handleClick }) => {
  const itemRef = useRef<null | HTMLLIElement>(null);
  const activeClass = active ? 'active' : '';

  if (itemRef.current && active) itemRef.current.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  
  return (
    <li ref={itemRef} className={`item ${activeClass}`} onClick={() => handleClick(index)}>
      <p className='address'>{point.address}</p>
      <ul className='budgets-list'>
        {point.budgets.map(b => <li key={b} className='budgets-list-item'>{b}</li>)}
      </ul>
    </li>
  )
})

export default Item