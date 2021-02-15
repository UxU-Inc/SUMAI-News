import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function useSkeletonHandler(newsData, colsCount, itemRef) {
    const [skelOffsetTop, setSkelOffsetTop] = useState(0)
    const [hideSkel, setHideSkel] = useState([])
    const [height, setHeight] = useState(0)
    const fontSize = useSelector(store => store.contentSetting.fontSize)
  
    const handleSkeleton = useCallback(() => {
      let arr = [], temp = []
      let sum = 0, min = 0
      for (let i = 0; i < colsCount; i++) {
        arr[i] = itemRef.current[i].offsetTop
        sum += arr[i]
      }
      sum /= colsCount
      arr.forEach((el, i) => {
        if(i === 0) min = arr[i]
        else if(min > arr[i]) min = arr[i]
  
        if (arr[i] - sum > 150) temp[i] = true
      })
      setSkelOffsetTop(min)
      setHideSkel(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colsCount, newsData, fontSize, height]);
  
    const handleSize = useCallback(() => {
      if(height !== window.innerHeight) {
        setHeight(window.innerHeight)
      }
    }, [height]);

    useEffect(() => {
      window.addEventListener("resize", handleSize)
      return () => window.removeEventListener("resize", handleSize);
    }, [handleSize]);
    
    useEffect(() => {
      handleSkeleton()
    }, [handleSkeleton]);
  
    return [skelOffsetTop, hideSkel]
  }