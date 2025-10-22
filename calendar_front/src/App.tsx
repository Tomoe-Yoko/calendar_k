import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {} from './App.css';
import EventModal from './components/Modal/EventModal';
import CalendarView from './components/CalendarView';
import type { EventData, EventRequestBody } from './types/event';


const getColorByCategory = (color: string): string => {
  switch (color) {
    case '営業':
      return '#81beffff'; // 青
    case 'マーケティング':
      return '#bfa6ffff'; // 紫
    case '業務':
      return '#c3ff87ff'; // 黄緑
    case '出荷':
      return '#ffda96ff'; // オレンジ
    case '国内':
      return '#ffb3d9ff'; // ピンク
    default:
      return '#808080'; // グレー
  }
};

const Event = () => {
  const [event, setEvent] = useState<EventData[]>([]);
  // const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [startDay, setStartDay] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');
  // const [time,setTime]=useState<string>('')
  // const [memo, setMemo] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('http://localhost:3000/api/v1/events');
      const data: EventData[] = await res.json();
      setEvent(data);
    };
    fetcher();
  }, []);

  const handleNewEvent = async () => {
    const colorCode = getColorByCategory(color);
    const newEvent: EventRequestBody = {
      title,
      start_date: dayjs().format('YYYY-MM-DD'),
      end_date: dayjs().format('YYYY-MM-DD'),
      color: colorCode,
    };
    try {
      const res = await fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) {
        throw new Error('Failed to create event');
      }
      const data: EventData = await res.json();
      setEvent((prev) => [...prev, data]);
      setModalIsOpen(false);
      // フォームリセット
      setTitle('');
      setColor('');
      setStartDay('');
      setEndDay('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>今日のスケジュール</h2>
      <button type='button' onClick={() => setModalIsOpen(true)}>
        新しい予定を追加
      </button>
      <CalendarView event={event}/>
  
      <div className='event-modal'>
        <EventModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title='新しい予定を追加'
        >
          <div className='modal-div'>
            <label htmlFor='event-start-day' className='modal-label'>
              開始日
            </label>
            <input
              type='date'
              id='event-start-day'
              name='event-start-day'
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              className='modal-input'
            />

            <label htmlFor='event-end-day' className='modal-label'>
              終了日
            </label>
            <input
              type='date'
              id='event-end-day'
              name='event-end-day'
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              className='modal-input'
            />
          </div>
          {/* <div className='modal-div'>
            <label htmlFor='event-name' className='modal-label'>
              名前
            </label>
            <input
              type='text'
              id='event-name'
              name='event-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='modal-input'
            />
          </div> */}
          <div className='modal-div'>
            <label htmlFor='event-title' className='modal-label'>
              予定
            </label>
            <input
              type='text'
              id='event-title'
              name='event-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='modal-input'
            />
          </div>
          {/* <div className='modal-div'>
            <label htmlFor='event-memo' className='modal-label'>
              memo
            </label>
            <input
              type='text'
              id='event-memo'
              name='event-memo'
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className='modal-input'
            />
          </div> */}
          <div className='modal-div'>
            <label htmlFor='event-color' className='modal-label'>
              カラー
            </label>
            {/* <input
              type='color'
              id='event-color'
              name='event-color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="modal-color"
            /> */}
            <select
              id='event-color'
              name='event-color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='modal-input'
            >
              <option value='営業'>営業</option>
              <option value='マーケティング'>マーケティング</option>
              <option value='業務'>業務</option>
              <option value='出荷'>出荷</option>
              <option value='国内'>国内</option>
            </select>
          </div>
          <div className='submit-wrap'>
            <button
              className='submit-btn'
              type='button'
              onClick={handleNewEvent}
            >
              予定追加！
            </button>
          </div>
        </EventModal>
      </div>
    </div>
  );
};

export default Event;
