// import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';

const CalendarView = () => {
  const handleDateClick = (arg:DateClickArg) => {
    alert(arg.dateStr);
  };
  return (
    <div>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            right: 'dayGridMonth,dayGridWeek',
          }}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default CalendarView;
