export const MODULE_REGISTRY = {
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  ADMISSIONS: 'admissions',
  FEES: 'fees',
  LIBRARY: 'library',
  TRANSPORT: 'transport',
  HR: 'hr',
  INVENTORY: 'inventory',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
} as const;

export type ModuleKey = typeof MODULE_REGISTRY[keyof typeof MODULE_REGISTRY];

export interface TenantConfig {
  schoolId: string;
  enabledModules: ModuleKey[];
}

// Global active tenant config flag indicating what modules are active for the school
export const activeTenantConfig: TenantConfig = {
  schoolId: 'demo-school-id',
  enabledModules: [
    MODULE_REGISTRY.STUDENTS,
    MODULE_REGISTRY.TEACHERS,
    MODULE_REGISTRY.FEES,
    MODULE_REGISTRY.LIBRARY,
    MODULE_REGISTRY.TRANSPORT,
    MODULE_REGISTRY.HR,
    MODULE_REGISTRY.ANALYTICS,
    MODULE_REGISTRY.SETTINGS,
  ],
};

export const isModuleEnabled = (module: ModuleKey): boolean => {
  return activeTenantConfig.enabledModules.includes(module);
};
