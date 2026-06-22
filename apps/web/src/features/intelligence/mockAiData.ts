export const mockChatHistory = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Analyze attendance trends for Class 8-A over the last month.',
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'Here is the attendance analysis for Class 8-A for the last 30 days. Overall attendance is slightly down compared to the previous month. Notice the dip on Fridays.',
    timestamp: '10:01 AM',
    richContent: {
      type: 'chart',
      data: [
        { name: 'Week 1', attendance: 95 },
        { name: 'Week 2', attendance: 92 },
        { name: 'Week 3', attendance: 88 },
        { name: 'Week 4', attendance: 85 }
      ]
    }
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'Generate a report card comment for Aanya Sharma. She is doing excellent in Science but needs to speak up more in group discussions.',
    timestamp: '10:15 AM'
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content: 'Here is a suggested report card comment for Aanya Sharma:\n\n"Aanya is an outstanding student who consistently excels in Science, demonstrating a deep understanding of complex concepts. Her analytical skills are commendable. To further enhance her learning experience, I encourage Aanya to actively participate and share her valuable insights more frequently during group discussions. She has great ideas, and her peers would benefit from hearing them!"',
    timestamp: '10:15 AM',
    richContent: {
      type: 'actionable',
      actions: ['Copy to Clipboard', 'Save to Student Profile']
    }
  }
];
