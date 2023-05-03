import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [{ title: "Meeting", start: new Date() }];

export default () => (
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    weekends={false}
    events={events}
    eventContent={renderEventContent}
  />
);
// a custom render function
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
