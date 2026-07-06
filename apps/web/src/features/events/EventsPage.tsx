import { useMemo, useState, type ReactNode } from 'react';
import { Button } from '../../components/ui/Button';
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Lightbulb,
  MapPin,
  Search,
  Sparkles,
  TicketCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { mockClasses } from '../../mock/classes';

const EVENT_TYPES = ['All', 'Academic', 'Sports', 'Cultural', 'Community', 'Holiday'];

const eventPalette: Record<string, { bg: string; text: string; soft: string }> = {
  Academic: { bg: '#4F46E5', text: '#312E81', soft: 'rgba(79, 70, 229, 0.10)' },
  Sports: { bg: '#10B981', text: '#065F46', soft: 'rgba(16, 185, 129, 0.12)' },
  Cultural: { bg: '#F59E0B', text: '#92400E', soft: 'rgba(245, 158, 11, 0.14)' },
  Community: { bg: '#06B6D4', text: '#155E75', soft: 'rgba(6, 182, 212, 0.12)' },
  Holiday: { bg: '#64748B', text: '#334155', soft: 'rgba(100, 116, 139, 0.12)' },
};

const schoolEvents = [
  {
    id: 'evt-science-expo',
    title: 'Science Innovation Expo',
    type: 'Academic',
    date: '2026-06-24',
    time: '09:30 AM',
    venue: 'Auditorium and Labs',
    owner: 'Sana Qureshi',
    classes: ['Class 6 A', 'Class 7 A', 'Class 8 A', 'Class 9 A', 'Class 10 A'],
    status: 'Open',
    capacity: 220,
    registered: 184,
    checkedIn: 0,
    volunteers: 18,
    budget: 76000,
    reportStatus: 'Draft',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop',
    insight: 'Strong cross-grade participation. Class 8 A has fewer project submissions than expected.',
  },
  {
    id: 'evt-sports-day',
    title: 'Annual Sports Day',
    type: 'Sports',
    date: '2026-07-05',
    time: '08:00 AM',
    venue: 'Main Ground',
    owner: 'Neeraj Bhatia',
    classes: ['Class 1 A', 'Class 2 A', 'Class 3 A', 'Class 4 A', 'Class 5 A', 'Class 6 A'],
    status: 'Open',
    capacity: 420,
    registered: 336,
    checkedIn: 0,
    volunteers: 32,
    budget: 132000,
    reportStatus: 'Pending',
    cover: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop',
    insight: 'Volunteer coverage is healthy. Medical desk staffing should be doubled for morning heats.',
  },
  {
    id: 'evt-founders-day',
    title: 'Founders Day Showcase',
    type: 'Cultural',
    date: '2026-07-18',
    time: '05:30 PM',
    venue: 'Open Air Theatre',
    owner: 'Raghav Sethi',
    classes: ['Class 7 A', 'Class 8 A', 'Class 9 A', 'Class 10 A'],
    status: 'Planning',
    capacity: 500,
    registered: 278,
    checkedIn: 0,
    volunteers: 26,
    budget: 185000,
    reportStatus: 'Pending',
    cover: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&auto=format&fit=crop',
    insight: 'Costume approvals are behind schedule for senior performances.',
  },
  {
    id: 'evt-parent-orientation',
    title: 'Parent Orientation Forum',
    type: 'Community',
    date: '2026-06-28',
    time: '10:00 AM',
    venue: 'Seminar Hall',
    owner: 'Aarav Mehta',
    classes: ['Class 1 A', 'Class 2 A', 'Class 3 A'],
    status: 'Open',
    capacity: 180,
    registered: 142,
    checkedIn: 0,
    volunteers: 10,
    budget: 38000,
    reportStatus: 'Ready',
    cover: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop',
    insight: 'Parent registrations are strongest for Class 1 A. Add one Q&A block for admissions queries.',
  },
  {
    id: 'evt-reading-week',
    title: 'Reading Week Finale',
    type: 'Academic',
    date: '2026-06-17',
    time: '11:00 AM',
    venue: 'Library',
    owner: 'Joel Fernandes',
    classes: ['Class 1 A', 'Class 2 A', 'Class 3 A', 'Class 4 A', 'Class 5 A'],
    status: 'Completed',
    capacity: 180,
    registered: 166,
    checkedIn: 158,
    volunteers: 12,
    budget: 24000,
    reportStatus: 'Ready',
    cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&auto=format&fit=crop',
    insight: 'High completion rate. Convert the top reading logs into newsletter highlights.',
  },
  {
    id: 'evt-yoga-day',
    title: 'International Yoga Day',
    type: 'Sports',
    date: '2026-06-21',
    time: '07:30 AM',
    venue: 'Assembly Court',
    owner: 'Neeraj Bhatia',
    classes: ['Class 1 A', 'Class 2 A', 'Class 3 A', 'Class 4 A', 'Class 5 A', 'Class 6 A', 'Class 7 A'],
    status: 'Ready',
    capacity: 300,
    registered: 268,
    checkedIn: 0,
    volunteers: 16,
    budget: 18000,
    reportStatus: 'Pending',
    cover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop',
    insight: 'Attendance is likely to exceed 90%. Keep shaded seating ready for junior classes.',
  },
  {
    id: 'evt-independence',
    title: 'Independence Day Celebration',
    type: 'Cultural',
    date: '2026-08-15',
    time: '08:30 AM',
    venue: 'Main Quadrangle',
    owner: 'Mohan Krishnan',
    classes: mockClasses.map((item) => `${item.name} ${item.section}`),
    status: 'Planning',
    capacity: 650,
    registered: 412,
    checkedIn: 0,
    volunteers: 44,
    budget: 92000,
    reportStatus: 'Pending',
    cover: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop',
    insight: 'Whole-school event. Stage flow needs class-wise arrival slots to avoid congestion.',
  },
  {
    id: 'evt-winter-break',
    title: 'Winter Break',
    type: 'Holiday',
    date: '2026-12-24',
    time: 'All day',
    venue: 'Campus Closed',
    owner: 'Administration',
    classes: mockClasses.map((item) => `${item.name} ${item.section}`),
    status: 'Scheduled',
    capacity: 0,
    registered: 0,
    checkedIn: 0,
    volunteers: 0,
    budget: 0,
    reportStatus: 'Not required',
    cover: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&auto=format&fit=crop',
    insight: 'Publish transport and office-hour reminders one week before closure.',
  },
];

const timeline = [
  { id: 'tl-1', time: 'Today, 09:15 AM', title: 'Science Expo registrations crossed 180', detail: 'Class 9 A submitted four new project teams.', tone: 'success' },
  { id: 'tl-2', time: 'Today, 08:40 AM', title: 'Sports Day volunteer roster updated', detail: 'Medical desk and track marshals assigned.', tone: 'info' },
  { id: 'tl-3', time: 'Yesterday', title: 'Founders Day budget revised', detail: 'Stage lighting estimate added to the planning report.', tone: 'warning' },
  { id: 'tl-4', time: 'Jun 17', title: 'Reading Week report published', detail: '158 check-ins, 42 parent attendees, 24 awardees.', tone: 'success' },
];

const gallery = [
  { id: 'gal-1', title: 'Reading Week Finale', count: 48, tag: 'Published', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&auto=format&fit=crop' },
  { id: 'gal-2', title: 'Science Lab Preview', count: 32, tag: 'Review', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&auto=format&fit=crop' },
  { id: 'gal-3', title: 'Sports Practice', count: 76, tag: 'Published', image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=900&auto=format&fit=crop' },
  { id: 'gal-4', title: 'Cultural Rehearsal', count: 54, tag: 'Draft', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&auto=format&fit=crop' },
];

const participationRows = mockClasses.slice(0, 8).map((cls, index) => ({
  className: `${cls.name} ${cls.section}`,
  registered: 18 + ((index * 7) % 38),
  attended: 14 + ((index * 6) % 32),
  volunteers: 2 + (index % 5),
  awards: index % 3,
}));

const reports = [
  { title: 'Reading Week Finale Report', owner: 'Joel Fernandes', status: 'Ready', metrics: '158 check-ins, 95% attendance' },
  { title: 'Science Expo Planning Sheet', owner: 'Sana Qureshi', status: 'Draft', metrics: '184 registrations, 38 teams' },
  { title: 'Sports Day Risk Checklist', owner: 'Neeraj Bhatia', status: 'Review', metrics: '32 volunteers, 9 stations' },
];

const formatDay = (date: string) => new Date(date).toLocaleDateString(undefined, { day: '2-digit' });
const formatMonth = (date: string) => new Date(date).toLocaleDateString(undefined, { month: 'short' });
const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export default function EventsPage() {
  const [events, setEvents] = useState(schoolEvents);
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(schoolEvents[0].id);

  // Modal and Toast states
  const [showCreate, setShowCreate] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('Academic');
  const [formDate, setFormDate] = useState('2026-06-30');
  const [formTime, setFormTime] = useState('10:00 AM');
  const [formVenue, setFormVenue] = useState('Seminar Hall');
  const [formCapacity, setFormCapacity] = useState('150');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCalendar = () => {
    setIsProcessing(true);
    triggerToast('⏳ Generating iCal calendar feeds...');
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast('📅 iCal feed generated and synced with mail server!');
    }, 1000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      triggerToast('⚠️ Title is required!');
      return;
    }

    setIsProcessing(true);
    triggerToast('⏳ Scheduling event to school calendar registry...');

    setTimeout(() => {
      setIsProcessing(false);
      const newEvent = {
        id: `evt-${Date.now()}`,
        title: formTitle,
        type: formType,
        date: formDate,
        time: formTime,
        venue: formVenue,
        owner: 'Academic Office',
        classes: ['All Classes'],
        status: 'Open',
        capacity: Number(formCapacity) || 100,
        registered: 0,
        checkedIn: 0,
        volunteers: 4,
        budget: 15000,
        reportStatus: 'Pending',
        cover: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop',
        insight: 'New event added. Promote registrations early to monitor capacity limits.',
      };

      setEvents(prev => [newEvent, ...prev]);
      setSelectedEventId(newEvent.id);
      setShowCreate(false);
      triggerToast(`🎉 Event "${formTitle}" successfully scheduled!`);
      
      // Clear form
      setFormTitle('');
    }, 1200);
  };

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesType = selectedType === 'All' || event.type === selectedType;
      const matchesSearch = !term || [event.title, event.venue, event.owner, event.type].some((value) => value.toLowerCase().includes(term));
      return matchesType && matchesSearch;
    });
  }, [events, search, selectedType]);

  const selectedEvent = events.find((event) => event.id === selectedEventId) || events[0];
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date('2026-06-18')).slice(0, 5);
  const completedEvents = events.filter((event) => event.status === 'Completed');
  const totalRegistrations = events.reduce((sum, event) => sum + event.registered, 0);
  const activeEvents = events.filter((event) => event.status !== 'Completed' && event.type !== 'Holiday').length;
  const participationRate = Math.round((completedEvents.reduce((sum, event) => sum + event.checkedIn, 0) / Math.max(1, completedEvents.reduce((sum, event) => sum + event.registered, 0))) * 100);

  return (
    <div className="events-hub" style={{ position: 'relative' }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="hub-hero">
        <div>
          <div className="eyebrow">School Experience Hub</div>
          <h1>Events, participation, stories, and reports in one command center.</h1>
          <p>Plan campus experiences, track class-wise registrations, publish galleries, and keep leadership informed with event intelligence.</p>
        </div>
        <div className="hero-actions">
          <Button variant="secondary" onClick={handleExportCalendar} disabled={isProcessing} loading={isProcessing}>
            {!isProcessing && <Download size={16} />} {isProcessing ? 'Syncing...' : 'Export calendar'}
          </Button>
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            <CalendarDays size={16} /> Create event
          </Button>
        </div>
      </div>

      <div className="kpi-grid">
        <MetricCard icon={<CalendarDays size={20} />} label="Active Events" value={activeEvents} note="Across this term" tone="primary" />
        <MetricCard icon={<TicketCheck size={20} />} label="Registrations" value={totalRegistrations.toLocaleString()} note="Parent and student RSVPs" tone="success" />
        <MetricCard icon={<Users size={20} />} label="Participation" value={`${participationRate}%`} note="Completed event check-ins" tone="warning" />
        <MetricCard icon={<Camera size={20} />} label="Gallery Assets" value="210" note="Photos ready for review" tone="info" />
      </div>

      <div className="control-bar">
        <div className="search-box">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events, venues, owners..." />
        </div>
        <div className="type-pills">
          <Filter size={16} />
          {EVENT_TYPES.map((type) => (
            <Button key={type} variant={selectedType === type ? 'primary' : 'ghost'} onClick={() => setSelectedType(type)}>
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="main-grid">
        <section className="panel calendar-panel">
          <div className="panel-header">
            <div>
              <h2>Event Calendar</h2>
              <span>June - August 2026</span>
            </div>
            <span className="badge-soft">{filteredEvents.length} visible</span>
          </div>
          <div className="calendar-list">
            {filteredEvents.map((event) => {
              const palette = eventPalette[event.type] || eventPalette['Holiday'];
              const isSelected = selectedEvent.id === event.id;
              return (
                <Button key={event.id} variant={isSelected ? 'primary' : 'ghost'} className={`calendar-event ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedEventId(event.id)} style={{ display: 'flex', textAlign: 'left', width: '100%', padding: 12 }}>
                  <div className="date-tile" style={{ background: palette.soft, color: palette.text }}>
                    <span>{formatMonth(event.date)}</span>
                    <strong>{formatDay(event.date)}</strong>
                  </div>
                  <div className="event-summary">
                    <div className="event-title-line">
                      <strong>{event.title}</strong>
                      <span style={{ background: palette.soft, color: palette.text }}>{event.type}</span>
                    </div>
                    <div className="event-meta">
                      <span><Clock size={13} /> {event.time}</span>
                      <span><MapPin size={13} /> {event.venue}</span>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </section>

        <section className="panel spotlight-panel">
          <img src={selectedEvent.cover} alt={selectedEvent.title} />
          <div className="spotlight-content">
            <div className="event-title-line">
              <span className="badge-solid" style={{ background: (eventPalette[selectedEvent.type] || eventPalette['Holiday']).bg }}>{selectedEvent.type}</span>
              <span className="status-chip">{selectedEvent.status}</span>
            </div>
            <h2>{selectedEvent.title}</h2>
            <p>{formatDate(selectedEvent.date)} at {selectedEvent.time} - {selectedEvent.venue}</p>
            <div className="progress-row">
              <div>
                <span>Registration fill</span>
                <strong>{selectedEvent.capacity ? Math.round((selectedEvent.registered / selectedEvent.capacity) * 100) : 0}%</strong>
              </div>
              <div className="progress-track">
                <div style={{ width: `${selectedEvent.capacity ? Math.round((selectedEvent.registered / selectedEvent.capacity) * 100) : 0}%`, background: (eventPalette[selectedEvent.type] || eventPalette['Holiday']).bg }} />
              </div>
            </div>
            <div className="mini-stats">
              <span><Users size={15} /> {selectedEvent.registered} registered</span>
              <span><CheckCircle2 size={15} /> {selectedEvent.checkedIn} checked in</span>
              <span><Trophy size={15} /> {selectedEvent.volunteers} volunteers</span>
            </div>
          </div>
        </section>

        <section className="panel ai-panel">
          <div className="panel-header compact">
            <h2><Sparkles size={18} /> AI Event Insights</h2>
          </div>
          <div className="insight-card featured">
            <Lightbulb size={18} />
            <p>{selectedEvent.insight}</p>
          </div>
          <div className="insight-list">
            <div>Class 8 A is under-indexing in academic event registrations by 18%.</div>
            <div>Sports Day has enough volunteers, but first-aid role coverage is thin.</div>
            <div>Publish gallery previews within 24 hours to improve parent engagement.</div>
          </div>
        </section>
      </div>

      {/* Create Event Modal */}
      {showCreate && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 480, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Schedule Campus Event</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCreate(false)} disabled={isProcessing}>✕</Button>
            </div>
            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Event Title</label>
                <input type="text" required value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="e.g. Science Fair Exhibition" style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Event Type</label>
                  <select value={formType} onChange={e => setFormType(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Community">Community</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Max Capacity</label>
                  <input type="number" required value={formCapacity} onChange={e => setFormCapacity(e.target.value)} placeholder="150" style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Date</label>
                  <input type="date" required value={formDate} onChange={e => setFormDate(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time</label>
                  <input type="text" required value={formTime} onChange={e => setFormTime(e.target.value)} placeholder="10:00 AM" style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Venue / Location</label>
                <input type="text" required value={formVenue} onChange={e => setFormVenue(e.target.value)} placeholder="e.g. Science Auditorium" style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <Button type="submit" variant="primary" disabled={isProcessing} loading={isProcessing} style={{ padding: 12, marginTop: 8 }} fullWidth>
                {isProcessing ? 'Scheduling Event...' : 'Schedule Event'}
              </Button>
            </form>
          </div>
        </div>
      )}


      <div className="two-col">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Upcoming Events</h2>
              <span>Operational readiness by date</span>
            </div>
          </div>
          <div className="upcoming-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="upcoming-row">
                <div>
                  <strong>{event.title}</strong>
                  <span>{formatDate(event.date)} - {event.owner}</span>
                </div>
                <div className="readiness">
                  <span>{event.registered}/{event.capacity || '-'} RSVPs</span>
                  <b>{event.status}</b>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Registrations</h2>
              <span>Class-wise participation pipeline</span>
            </div>
          </div>
          <div className="registration-table">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Registered</th>
                  <th>Attended</th>
                  <th>Volunteers</th>
                  <th>Awards</th>
                </tr>
              </thead>
              <tbody>
                {participationRows.map((row) => (
                  <tr key={row.className}>
                    <td>{row.className}</td>
                    <td>{row.registered}</td>
                    <td>{row.attended}</td>
                    <td>{row.volunteers}</td>
                    <td>{row.awards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="three-col">
        <section className="panel">
          <div className="panel-header compact"><h2>Event Timeline</h2></div>
          <div className="timeline">
            {timeline.map((item) => (
              <div key={item.id} className={`timeline-item ${item.tone}`}>
                <span>{item.time}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel gallery-panel">
          <div className="panel-header compact"><h2>Event Gallery</h2></div>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div key={item.id} className="gallery-card">
                <img src={item.image} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.count} photos - {item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header compact"><h2>Event Reports</h2></div>
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.title} className="report-card">
                <FileText size={18} />
                <div>
                  <strong>{report.title}</strong>
                  <span>{report.owner} - {report.metrics}</span>
                </div>
                <b>{report.status}</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .events-hub { display: flex; flex-direction: column; gap: 20px; padding-bottom: 36px; }
        .hub-hero { min-height: 220px; border-radius: 16px; padding: 28px; color: #fff; background: linear-gradient(120deg, rgba(15,23,42,.82), rgba(37,99,235,.58)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop') center/cover; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; box-shadow: 0 18px 45px rgba(15,23,42,.18); }
        .hub-hero h1 { max-width: 760px; margin: 8px 0 10px; font-size: 34px; line-height: 1.1; letter-spacing: 0; }
        .hub-hero p { max-width: 700px; margin: 0; color: rgba(255,255,255,.84); font-size: 15px; }
        .eyebrow { text-transform: uppercase; letter-spacing: .08em; font-size: 12px; font-weight: 800; color: rgba(255,255,255,.72); }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        .hero-actions .btn { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .metric-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .metric-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; }
        .metric-card span { display: block; color: var(--text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .metric-card strong { display: block; margin-top: 2px; color: var(--text-primary); font-size: 26px; line-height: 1; }
        .metric-card p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }
        .control-bar { display: flex; gap: 14px; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; }
        .search-box { flex: 1; min-width: 240px; display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg-body); border-radius: 10px; border: 1px solid var(--border-color); }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 14px; }
        .type-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .type-pills button { border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-secondary); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 700; }
        .type-pills button.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
        .main-grid { display: grid; grid-template-columns: 1.15fr 1.35fr .9fr; gap: 16px; align-items: stretch; }
        .two-col { display: grid; grid-template-columns: 1fr 1.2fr; gap: 16px; }
        .three-col { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 16px; }
        .panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .panel-header { padding: 16px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .panel-header.compact { border-bottom: 0; padding-bottom: 8px; }
        .panel-header h2 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
        .panel-header span { display: block; margin-top: 3px; color: var(--text-muted); font-size: 12px; }
        .badge-soft, .status-chip { border-radius: 999px; padding: 6px 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 12px; font-weight: 800; }
        .badge-solid { border-radius: 999px; padding: 6px 10px; color: #fff; font-size: 12px; font-weight: 800; }
        .calendar-list { padding: 10px; display: flex; flex-direction: column; gap: 8px; max-height: 530px; overflow: auto; }
        .calendar-event { width: 100%; text-align: left; display: flex; gap: 12px; border: 1px solid transparent; background: transparent; border-radius: 10px; padding: 10px; cursor: pointer; color: inherit; }
        .calendar-event:hover, .calendar-event.selected { background: var(--bg-body); border-color: var(--border-color); }
        .date-tile { width: 54px; min-width: 54px; height: 58px; border-radius: 10px; display: grid; place-items: center; }
        .date-tile span { font-size: 11px; text-transform: uppercase; font-weight: 800; }
        .date-tile strong { font-size: 22px; line-height: 1; }
        .event-summary { flex: 1; min-width: 0; }
        .event-title-line { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .event-title-line strong { color: var(--text-primary); font-size: 14px; }
        .event-title-line span:not(.badge-solid):not(.status-chip) { border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 800; }
        .event-meta { margin-top: 8px; display: flex; gap: 10px; flex-wrap: wrap; color: var(--text-muted); font-size: 12px; }
        .event-meta span, .mini-stats span { display: inline-flex; align-items: center; gap: 5px; }
        .spotlight-panel img { width: 100%; height: 210px; object-fit: cover; display: block; }
        .spotlight-content { padding: 18px; }
        .spotlight-content h2 { margin: 14px 0 8px; font-size: 24px; color: var(--text-primary); }
        .spotlight-content p { margin: 0; color: var(--text-secondary); font-size: 14px; }
        .progress-row { margin-top: 18px; }
        .progress-row > div:first-child { display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 13px; margin-bottom: 8px; }
        .progress-track { height: 9px; border-radius: 999px; background: var(--bg-body); overflow: hidden; }
        .progress-track div { height: 100%; border-radius: inherit; }
        .mini-stats { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; color: var(--text-secondary); font-size: 12px; font-weight: 700; }
        .ai-panel { padding-bottom: 12px; }
        .insight-card { margin: 0 16px 12px; border-radius: 12px; padding: 14px; background: rgba(79,70,229,.10); color: var(--text-primary); display: flex; gap: 10px; }
        .insight-card p { margin: 0; font-size: 13px; line-height: 1.5; }
        .insight-list { padding: 0 16px; display: flex; flex-direction: column; gap: 10px; }
        .insight-list div { padding: 12px; border-radius: 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 13px; }
        .upcoming-list, .reports-list, .timeline { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
        .upcoming-row { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 10px; background: var(--bg-body); }
        .upcoming-row strong, .report-card strong { display: block; color: var(--text-primary); font-size: 14px; }
        .upcoming-row span, .report-card span { display: block; margin-top: 4px; color: var(--text-muted); font-size: 12px; }
        .readiness { text-align: right; min-width: 120px; }
        .readiness b, .report-card b { display: inline-block; margin-top: 4px; color: var(--color-primary); font-size: 12px; }
        .registration-table { padding: 0 16px 16px; overflow-x: auto; }
        .registration-table table { width: 100%; border-collapse: collapse; }
        .registration-table th, .registration-table td { padding: 12px 10px; border-bottom: 1px solid var(--border-color); text-align: left; font-size: 13px; }
        .registration-table th { color: var(--text-muted); font-size: 11px; text-transform: uppercase; }
        .timeline-item { position: relative; padding: 0 0 0 20px; border-left: 2px solid var(--border-color); }
        .timeline-item:before { content: ''; position: absolute; left: -6px; top: 2px; width: 10px; height: 10px; border-radius: 999px; background: var(--color-primary); }
        .timeline-item.success:before { background: #10B981; }
        .timeline-item.warning:before { background: #F59E0B; }
        .timeline-item.info:before { background: #06B6D4; }
        .timeline-item span { display: block; color: var(--text-muted); font-size: 11px; margin-bottom: 4px; }
        .timeline-item strong { display: block; color: var(--text-primary); font-size: 13px; }
        .timeline-item p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; line-height: 1.4; }
        .gallery-grid { padding: 14px 16px 16px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .gallery-card { border-radius: 10px; overflow: hidden; background: var(--bg-body); }
        .gallery-card img { display: block; width: 100%; height: 92px; object-fit: cover; }
        .gallery-card div { padding: 10px; }
        .gallery-card strong { display: block; color: var(--text-primary); font-size: 13px; }
        .gallery-card span { color: var(--text-muted); font-size: 12px; }
        .report-card { display: grid; grid-template-columns: auto 1fr auto; align-items: start; gap: 10px; padding: 12px; border-radius: 10px; background: var(--bg-body); }
        @media (max-width: 1180px) {
          .main-grid, .three-col { grid-template-columns: 1fr; }
          .two-col, .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .hub-hero { align-items: flex-start; flex-direction: column; padding: 22px; }
          .hub-hero h1 { font-size: 26px; }
          .control-bar { align-items: stretch; flex-direction: column; }
          .two-col, .kpi-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          .upcoming-row { flex-direction: column; }
          .readiness { text-align: left; }
        }
      `}</style>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  note: string;
  tone: 'primary' | 'success' | 'warning' | 'info';
}) {
  const colors = {
    primary: 'rgba(79,70,229,.12)',
    success: 'rgba(16,185,129,.12)',
    warning: 'rgba(245,158,11,.14)',
    info: 'rgba(6,182,212,.12)',
  };

  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: colors[tone], color: tone === 'primary' ? '#4F46E5' : tone === 'success' ? '#10B981' : tone === 'warning' ? '#F59E0B' : '#06B6D4' }}>
        {icon}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </div>
  );
}
