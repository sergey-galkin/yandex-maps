import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useYMaps } from '@pbe/react-yandex-maps'
import Item from './components/Item'
import './index.sass'
import { pickPoints } from '../state.json'
import { type Points } from './Types'

const points: Points = pickPoints;

const pointerHref = {
  active: 'images/pointer_blue.svg',
  passive: 'images/pointer_red.svg'
}

const App: React.FC = () => {
  const [marks, setMarks] = useState<ymaps.Placemark[]>();
  const [activePointIndex, setActivePointIndex] = useState<number>(0);
  const mapElemRef = useRef(null);
  const mapRef = useRef<ymaps.Map>();
  const ymaps = useYMaps(['Map', 'Placemark'])

  useEffect(() => {
    if (!ymaps || !mapElemRef.current) return;

    mapRef.current = new ymaps.Map(mapElemRef.current, {
      center: [points[0].latitude, points[0].longitude],
      zoom: 12,
    }, {
      maxAnimationZoomDifference: 20
    });

    // creating map marks
    const marks = points.map(({latitude, longitude}, i) => {
      const mark = new ymaps.Placemark([latitude, longitude], {}, {
        iconLayout: 'default#image',
        iconImageHref: i === 0 ? 'images/pointer_blue.svg' : 'images/pointer_red.svg'
      });
      
      return mark;
    })

    // adding marks on the map
    marks.forEach((mark, i) => {
      if (mapRef.current === undefined) return;
      mapRef.current.geoObjects.add(mark);

      // adding mark click handler
      const {latitude, longitude} = points[i];
      mark.events.add(['click'], (e) => {
        if (mapRef.current === undefined) return;
        
        // moving map
        setActivePointIndex(i);
        mapRef.current.panTo([latitude, longitude], {
          duration: 1000
        });
  
        // setting passive marks images
        marks.forEach(mark => {
          mark.options.set('iconImageHref', pointerHref.passive);
        });

        // setting active mark image
        e.get('target').options.set('iconImageHref', pointerHref.active);
      })
    });
    
    setMarks(marks);

  }, [ymaps]);

  const changeLocation = useCallback<(index: number) => void>(
    (index) => {
      if (!mapRef.current || !marks) return;

      const { latitude, longitude } = points[index];
      setActivePointIndex(index);

      // moving map
      mapRef.current.panTo([latitude, longitude ], {
        duration: 1000
      });

      // setting passive marks images
      marks.forEach(mark => {
        mark.options.set('iconImageHref', pointerHref.passive);
      });

      // setting active mark image
      marks[index].options.set('iconImageHref', pointerHref.active)
    }
  , [marks]);

  return (
    <div className='container'>
      <main className='main'>
        <ul className='items'>
          {points.map((p, i) => (
            <Item 
              key={p.address} 
              active={i === activePointIndex ? true : false}
              index={i} 
              point={p} 
              handleClick={changeLocation} 
            />
          ))}
        </ul>
        <div ref={mapElemRef} className='map'/>
      </main>
    </div>
  )
}

export default App