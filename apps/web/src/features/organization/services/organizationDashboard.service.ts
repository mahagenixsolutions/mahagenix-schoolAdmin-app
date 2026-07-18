import { mockAcademic } from '../mock/academic';
import { mockFinancial } from '../mock/financial';
import { mockAIInsights } from '../mock/aiInsights';
import { mockApprovals } from '../mock/approvals';
import { mockCompliance, mockComplianceChecks } from '../mock/compliance';
import { mockTimeline } from '../mock/timeline';
import { mockRankings } from '../mock/rankings';
import { mockHealth } from '../mock/health';
import { mockCalendarEvents } from '../mock/calendar';

export class OrganizationDashboardService {
  static getAcademicData() {
    return mockAcademic;
  }

  static getFinancialData() {
    return mockFinancial;
  }

  static getAIInsights() {
    return mockAIInsights;
  }

  static getPendingApprovals() {
    return mockApprovals;
  }

  static getComplianceData() {
    return {
      metrics: mockCompliance.overall,
      checks: mockComplianceChecks
    };
  }

  static getTimelineLogs() {
    return mockTimeline;
  }

  static getBranchRankings() {
    return mockRankings;
  }

  static getHealthMetrics() {
    return mockHealth;
  }

  static getCalendarEvents() {
    return mockCalendarEvents;
  }

  static searchOrganization(query: string) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();

    // Mock search across multiple domains
    const results: { category: string; title: string; subtitle: string; to: string }[] = [];

    // Search branches
    mockRankings.forEach(b => {
      if (b.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          category: 'Branch',
          title: b.name,
          subtitle: `${b.city} • Health Score: ${b.healthScore}%`,
          to: `/org/branches/branch-${b.name.split(' ')[0].toLowerCase()}`
        });
      }
    });

    // Search announcements
    mockAIInsights.forEach(ins => {
      if (ins.text.toLowerCase().includes(lowerQuery)) {
        results.push({
          category: 'AI Recommendation',
          title: ins.badge,
          subtitle: ins.text,
          to: '/org/announcements'
        });
      }
    });

    return results;
  }
}
