// import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarView = ({}) => {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  return (
    <div>
      
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default CalendarView;
