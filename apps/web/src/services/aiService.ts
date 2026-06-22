import type { AIContextData, AISuggestion } from '../types/ai';

// ─────────────────────────────────────────────────────────────────────────────
// Suggestion Maps — contextual quick-action chips per page
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTION_MAP: Record<string, AISuggestion[]> = {
  dashboard: [
    { id: 'dash-1', icon: '📊', label: "Today's KPI summary", prompt: "Give me today's KPI summary" },
    { id: 'dash-2', icon: '⚠️', label: 'Classes needing attention', prompt: 'Which classes need attention right now?' },
    { id: 'dash-3', icon: '📅', label: 'Upcoming events', prompt: 'What are the upcoming events?' },
    { id: 'dash-4', icon: '💰', label: 'Fee collection status', prompt: 'What is the current fee collection status?' },
  ],
  students: [
    { id: 'stu-1', icon: '👥', label: 'Active students count', prompt: 'How many active students are there?' },
    { id: 'stu-2', icon: '📉', label: 'Low attendance students', prompt: 'Show students with low attendance' },
    { id: 'stu-3', icon: '🆕', label: 'New admissions', prompt: 'How many new admissions this month?' },
    { id: 'stu-4', icon: '🔍', label: 'Summarize visible data', prompt: 'Summarize the currently visible student data' },
  ],
  attendance: [
    { id: 'att-1', icon: '📋', label: 'Attendance summary', prompt: "What is today's attendance summary?" },
    { id: 'att-2', icon: '🚫', label: 'Absent students today', prompt: 'Who is absent today?' },
    { id: 'att-3', icon: '📈', label: 'Monthly trends', prompt: 'Show monthly attendance trends' },
    { id: 'att-4', icon: '⚡', label: 'Attendance rate', prompt: 'What is the current attendance rate?' },
  ],
  marks: [
    { id: 'mrk-1', icon: '📝', label: 'Subject performance', prompt: 'Show subject-wise performance overview' },
    { id: 'mrk-2', icon: '🏆', label: 'Top performers', prompt: 'Who are the top performing students?' },
    { id: 'mrk-3', icon: '⚠️', label: 'Below passing', prompt: 'Which students are below passing marks?' },
  ],
  classes: [
    { id: 'cls-1', icon: '📊', label: 'Class comparison', prompt: 'Compare classes by performance' },
    { id: 'cls-2', icon: '👨‍🎓', label: 'Largest class', prompt: 'Which class has the most students?' },
    { id: 'cls-3', icon: '⚠️', label: 'At-risk students', prompt: 'Show at-risk students across classes' },
  ],
  analytics: [
    { id: 'anl-1', icon: '🏥', label: 'School health', prompt: 'Give me an overall school health summary' },
    { id: 'anl-2', icon: '📈', label: 'Improvement trends', prompt: 'Show improvement trends over recent months' },
    { id: 'anl-3', icon: '⚠️', label: 'Risk summary', prompt: 'Summarize students at risk' },
  ],
  parent: [
    { id: 'par-1', icon: '📖', label: "My child's progress", prompt: "How is my child doing overall?" },
    { id: 'par-2', icon: '📋', label: 'Attendance record', prompt: "What is my child's attendance record?" },
    { id: 'par-3', icon: '💬', label: 'Teacher messages', prompt: 'Are there any new teacher messages?' },
  ],
};

const DEFAULT_SUGGESTIONS: AISuggestion[] = [
  { id: 'def-1', icon: '💡', label: 'About this page', prompt: 'Tell me about this page' },
  { id: 'def-2', icon: '🔧', label: 'What can I do here?', prompt: 'What actions can I take on this page?' },
  { id: 'def-3', icon: '❓', label: 'Help', prompt: 'How do I use EduTrack?' },
];

export function getSuggestionsForPage(module: string): AISuggestion[] {
  return SUGGESTION_MAP[module] ?? DEFAULT_SUGGESTIONS;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock AI Response Engine
// ─────────────────────────────────────────────────────────────────────────────

function matchKeywords(message: string, ...keywords: string[]): boolean {
  const lower = message.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-IN');
}

function buildStudentsResponse(msg: string, ctx: AIContextData): string | null {
  const data = ctx.visibleData as Array<Record<string, unknown>>;
  const filters = ctx.filters;

  if (matchKeywords(msg, 'how many', 'count', 'total', 'active student')) {
    const activeCount = data.filter((s) => s.status === 'ACTIVE').length;
    const totalCount = data.length;
    const filterDesc = Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    return `Based on the currently visible data${filterDesc ? ` (filters: ${filterDesc})` : ''}:\n\n📊 **${formatNumber(activeCount)}** active students out of **${formatNumber(totalCount)}** total visible.\n\nThis reflects the records currently loaded on your Students page.`;
  }

  if (matchKeywords(msg, 'low attendance', 'poor attendance', 'attendance issue')) {
    const lowAttendance = data.filter(
      (s) => typeof s.attendance_rate === 'number' && s.attendance_rate < 88,
    );
    if (lowAttendance.length === 0) {
      return '✅ Great news! All currently visible students have attendance rates above 88%. No immediate concerns.';
    }
    const list = lowAttendance
      .slice(0, 5)
      .map(
        (s) =>
          `• **${s.first_name} ${s.last_name}** — ${s.attendance_rate}% attendance`,
      )
      .join('\n');
    return `⚠️ Found **${lowAttendance.length}** student(s) with attendance below 88%:\n\n${list}${lowAttendance.length > 5 ? `\n\n_...and ${lowAttendance.length - 5} more_` : ''}\n\nConsider sending parent reminders for follow-up.`;
  }

  if (matchKeywords(msg, 'admission', 'new student', 'new admission')) {
    return `📋 Based on current mock data:\n\n🆕 **6** new admissions this month\n📈 **18** open admission slots remaining\n\nThe admissions pipeline is healthy. Use the "Add Student" button to register new profiles.`;
  }

  if (matchKeywords(msg, 'summarize', 'summary', 'overview', 'visible')) {
    const maleCount = data.filter((s) => s.gender === 'MALE').length;
    const femaleCount = data.filter((s) => s.gender === 'FEMALE').length;
    const avgAttendance = data.length
      ? Math.round(
          data.reduce(
            (sum, s) => sum + (typeof s.attendance_rate === 'number' ? s.attendance_rate : 0),
            0,
          ) / data.length,
        )
      : 0;
    return `📊 **Visible Students Summary**\n\n• Total: **${formatNumber(data.length)}** students\n• Male: **${maleCount}** | Female: **${femaleCount}**\n• Average attendance: **${avgAttendance}%**\n• Status filter: ${filters.statusFilter || 'All'}\n• Class filter: ${filters.classFilter || 'All Classes'}`;
  }

  return null;
}

function buildAttendanceResponse(msg: string, ctx: AIContextData): string | null {
  const metrics = ctx.dashboardMetrics as Record<string, number>;
  const filters = ctx.filters;

  if (matchKeywords(msg, 'summary', 'today', 'overview')) {
    return `📋 **Attendance Summary** — ${filters.dateFilter || 'Today'}\n\n✅ Present: **${metrics.present ?? 0}**\n❌ Absent: **${metrics.absent ?? 0}**\n⏰ Late: **${metrics.late ?? 0}**\n📝 Leave: **${metrics.leave ?? 0}**\n👥 Total enrolled: **${metrics.total ?? 0}**\n\n📈 Attendance rate: **${metrics.total ? Math.round(((metrics.present ?? 0) / metrics.total) * 100) : 0}%**`;
  }

  if (matchKeywords(msg, 'absent', 'who is absent', 'missing')) {
    const data = ctx.visibleData as Array<Record<string, unknown>>;
    const absent = data.filter((s) => s.status === 'ABSENT');
    if (absent.length === 0) {
      return '🎉 No students marked absent in the currently selected class! Everyone is present.';
    }
    const list = absent
      .slice(0, 8)
      .map((s) => `• **${s.name}** (${s.student_code})`)
      .join('\n');
    return `🚫 **${absent.length}** student(s) absent:\n\n${list}\n\nConsider reaching out to their parents.`;
  }

  if (matchKeywords(msg, 'trend', 'monthly', 'pattern')) {
    return `📈 **Monthly Attendance Trends**\n\n• Jan: 91% → Feb: 93% → Mar: 92%\n• Apr: 94% → May: 90% → Jun: 95%\n\n📊 Overall trend is **positive** with a slight dip in May. June shows strong recovery.\n\n💡 Tip: Friday attendance tends to dip — consider scheduling engaging activities.`;
  }

  if (matchKeywords(msg, 'rate', 'percentage')) {
    const rate = metrics.total
      ? Math.round(((metrics.present ?? 0) / metrics.total) * 100)
      : 0;
    return `📊 Current attendance rate: **${rate}%**\n\nPresent: ${metrics.present ?? 0} / ${metrics.total ?? 0} enrolled students.`;
  }

  return null;
}

function buildDashboardResponse(msg: string, ctx: AIContextData): string | null {
  const metrics = ctx.dashboardMetrics as Record<string, unknown>;

  if (matchKeywords(msg, 'kpi', 'summary', 'overview', 'today')) {
    return `📊 **Dashboard KPI Summary**\n\n👥 Total Students: **${formatNumber(Number(metrics.totalStudents ?? metrics.total_students ?? 0))}**\n👨‍🏫 Total Teachers: **${formatNumber(Number(metrics.totalTeachers ?? metrics.total_teachers ?? 0))}**\n📋 Attendance Rate: **${metrics.attendanceRateToday ?? metrics.attendance_rate ?? 0}%**\n📚 Avg Performance: **${metrics.average_performance ?? 0}%**\n💰 Fee Collection: **${metrics.feeCollectionRate ?? metrics.fee_collection_rate ?? 0}%**\n📖 Syllabus Completion: **${metrics.syllabusCompletion ?? 0}%**\n\n✨ School operations are running smoothly.`;
  }

  if (matchKeywords(msg, 'attention', 'concern', 'warning', 'alert')) {
    return `⚠️ **Areas Needing Attention**\n\n• Class 8 A attendance has dipped below 90% — needs follow-up\n• ${metrics.teachersOnLeaveToday ?? 1} teacher(s) on leave today\n• ₹${formatNumber(Number(metrics.pendingFeesAmount ?? 306000))} in pending fee collections\n\n💡 Recommendation: Send parent reminders for classes below 90% attendance.`;
  }

  if (matchKeywords(msg, 'event', 'upcoming', 'schedule')) {
    return `📅 **Upcoming Events**\n\n• 🎓 Unit Test 1 — June 24, 2026\n• 🇮🇳 Independence Day Celebration — August 15\n• 🏃 Annual Sports Meet — December 12\n• 🎄 Winter Break — December 24\n\nThe next exam is just around the corner!`;
  }

  if (matchKeywords(msg, 'fee', 'collection', 'payment', 'pending')) {
    return `💰 **Fee Collection Status**\n\n• Collection Rate: **${metrics.feeCollectionRate ?? 86}%**\n• Amount Collected: **₹${formatNumber(Number(metrics.amountCollected ?? 1854000))}**\n• Amount Due: **₹${formatNumber(Number(metrics.amountDue ?? 2160000))}**\n• Pending: **₹${formatNumber(Number(metrics.pendingFeesAmount ?? 306000))}**\n\n📈 Collection trend is positive across the last 6 months.`;
  }

  return null;
}

function buildGenericResponse(msg: string, ctx: AIContextData): string {
  if (matchKeywords(msg, 'hello', 'hi', 'hey', 'good morning', 'good afternoon')) {
    return `👋 Hello${ctx.userInfo ? `, ${ctx.userInfo.name}` : ''}! I'm your EduTrack AI assistant.\n\nYou're currently on the **${ctx.page}** page. How can I help you today?\n\nTry asking me about the data visible on this page, or click one of the suggestion chips below.`;
  }

  if (matchKeywords(msg, 'help', 'what can you do', 'how do i', 'capabilities')) {
    return `🤖 **I can help you with:**\n\n• 📊 Analyzing data on your current page\n• 📋 Summarizing filters and visible records\n• 📈 Attendance trends and patterns\n• 👥 Student information queries\n• 💰 Fee and collection insights\n• 🏫 Class comparisons\n\nI'm context-aware — I know you're on the **${ctx.page}** page${Object.keys(ctx.filters).length > 0 ? ` with active filters` : ''}. Just ask naturally!`;
  }

  if (matchKeywords(msg, 'about this page', 'tell me about', 'what is this')) {
    const filterEntries = Object.entries(ctx.filters).filter(([, v]) => v);
    const filterText =
      filterEntries.length > 0
        ? `\n\n**Active filters:** ${filterEntries.map(([k, v]) => `${k}: ${v}`).join(', ')}`
        : '\n\nNo active filters applied.';
    return `📄 You are on the **${ctx.page}** page (route: \`${ctx.route}\`, module: \`${ctx.module}\`).${filterText}\n\n📊 Visible records: **${ctx.visibleData.length}**\n👤 Logged in as: **${ctx.userInfo?.name ?? 'Unknown'}** (${ctx.userInfo?.role ?? 'Unknown role'})`;
  }

  if (matchKeywords(msg, 'thank', 'thanks')) {
    return `You're welcome! 😊 Let me know if there's anything else I can help with on the **${ctx.page}** page.`;
  }

  // Fallback
  return `I understand you're asking about "${msg.slice(0, 60)}${msg.length > 60 ? '...' : ''}" on the **${ctx.page}** page.\n\nI can best help with queries related to the data visible on your screen. Try asking:\n• "How many active students?"\n• "Today's attendance summary"\n• "Show KPI overview"\n\nOr click one of the suggestion chips for quick insights!`;
}

/**
 * Generates a simulated AI response based on the user's message and the
 * current page context. Returns a promise that resolves after a realistic delay.
 */
export async function generateAIResponse(
  userMessage: string,
  context: AIContextData,
): Promise<string> {
  // Simulate network/AI processing delay (800–1500ms)
  const delay = 800 + Math.random() * 700;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const module = context.module;
  let response: string | null = null;

  switch (module) {
    case 'students':
      response = buildStudentsResponse(userMessage, context);
      break;
    case 'attendance':
      response = buildAttendanceResponse(userMessage, context);
      break;
    case 'dashboard':
      response = buildDashboardResponse(userMessage, context);
      break;
    default:
      break;
  }

  return response ?? buildGenericResponse(userMessage, context);
}
