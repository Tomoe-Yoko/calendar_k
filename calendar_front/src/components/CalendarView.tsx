// import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import type { EventData } from '../types/event';


interface CalendarViewProps {
  event: EventData[];
}



const CalendarView = ({event}:CalendarViewProps) => {
  const handleDateClick = (arg:DateClickArg) => {
    alert(arg.dateStr);
  };

  // FullCalendar 用にデータ整形
  const calendarEvents=event.map((e)=>({
    id:e.id.toString(),
    title:e.title,
    start:e.start_date,
    end:e.end_date, 
    color:e.color,
  }))



  return (
    <div>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            right: 'dayGridMonth,dayGridWeek',
          }}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        events={calendarEvents}
        
      />
    </div>
  );
};

export default CalendarView;
