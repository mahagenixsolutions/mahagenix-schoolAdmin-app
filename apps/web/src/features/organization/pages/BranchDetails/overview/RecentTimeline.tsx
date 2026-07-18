import type { ActivityItem } from '../types';

interface Props {
  activities: ActivityItem[];
}

export default function RecentTimeline({ activities }: Props) {
  // Group activities by date
  const todayActivities = activities.filter(a => a.date === 'Today');
  const yesterdayActivities = activities.filter(a => a.date === 'Yesterday');

  const renderActivityGroup = (title: string, groupItems: ActivityItem[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '8px', borderLeft: '2px solid #e2e8f0', marginLeft: '12px', gap: '18px' }}>
        {groupItems.map((item) => (
          <div key={item.id} style={{ position: 'relative', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {/* Timeline Dot Icon */}
            <div style={{
              position: 'absolute',
              left: '-24px',
              top: '2px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: item.iconBg,
              border: '4px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.iconColor,
              fontSize: '11px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}>
              {item.icon}
            </div>

            {/* Content block */}
            <div style={{ paddingLeft: '20px', minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                {item.text}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', fontWeight: 500 }}>
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
        Branch Activity Log
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {todayActivities.length > 0 && renderActivityGroup('Today', todayActivities)}
        {yesterdayActivities.length > 0 && renderActivityGroup('Yesterday', yesterdayActivities)}
      </div>
    </div>
  );
}
