import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { selectImages } from '../slices/memorySlice';


const MemoryGame = () => {
  const [score, setScore] = useState(0);
  const images: string[] = useAppSelector(selectImages);

  return (
    <>
      {images?.map((img, i)=> {
        return <img src={img} key={i}></img>
      })}
    </>
  )
}

export default MemoryGame