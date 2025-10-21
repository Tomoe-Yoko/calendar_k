import  { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {  } from "./App.css";
import EventModal from './components/Modal/EventModal';
import CalendarView from './components/CalendarView';



interface EventProps {
  id: number;
  name: string;
  title: string;
  start_date: string;
  end_date: string;
  // start_time: string;
  // end_time: string;
  memo: string;
  color: string;
}

const Event = () => {
  const [event, setEvent] = useState<EventProps[]>([]);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [startDay,setStartDay]=useState<string>('')
  const [endDay,setEndDay]=useState<string>('')
  // const [time,setTime]=useState<string>('')
  const [memo, setMemo] = useState<string>('');
  const [color, setColor] = useState<string>('');
 const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('http://localhost:3000/api/v1/events');
      const data: EventProps[] = await res.json();
      setEvent(data);
    };
    fetcher();
  }, []);

  const handleNewEvent = () => {
    const newEvent: EventProps = {
      id: event.length + 1,
      name,
      title,
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      // start_time: '',
      // end_time: '',
      memo,
      color: '#FF5733',
    };
    setEvent([...event, newEvent]);
  };

  return (
    <div>
      <h2>今日のスケジュール</h2>
     <CalendarView/>
      <ul>
        {event.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <button type='button' onClick={() => setModalIsOpen(true)}>新しい予定を追加</button>
      <EventModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} title="新しい予定を追加">
        <div>
          <label htmlFor='event-start-day'>開始日</label>
          <input
            type='date'
            id='event-start-day'
            name='event-start-day'
            value={startDay}
            onChange={(e) => setStartDay(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='event-end-day'>終了日</label>
          <input
            type='date'
            id='event-end-day'
            name='event-end-day'
            value={endDay}
            onChange={(e) => setEndDay(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='event-name'>名前</label>
          <input
            type='text'
            id='event-name'
            name='event-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='event-title'>予定</label>
          <input
            type='text'
            id='event-title'
            name='event-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='event-memo'>memo</label>
          <input
            type='text'
            id='event-memo'
            name='event-memo'
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='event-memo'>色</label>
          <input
            type='color'
            id='event-color'
            name='event-color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button className='submit' type='button' onClick={handleNewEvent}>
          予定追加！
        </button>
      </EventModal>
    </div>
  );
};

export default Event;
