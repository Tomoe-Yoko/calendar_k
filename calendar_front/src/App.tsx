import React, { useEffect, useState } from 'react'

interface EventProps{
  id:number
name:string
title:string
start_date:string
end_date:string
start_time:string
end_time:string
memo:string
color:string

}



const Event = () => {
const [event,setEvent]=useState<EventProps[]>([])


useEffect(()=>{
const fetcher =async()=>{
  const res =await fetch('http://localhost:3000/api/v1/events')
  const data:EventProps[]=await res.json()
  setEvent(data)
}
fetcher()
},[])




  return (
    <div>
      <h2>今日のスケジュール</h2>
      <ul>
      {event.map(({id,title})=>(<li key={id}>
{title}

      </li>))}</ul>
    </div>
  )
}

export default Event