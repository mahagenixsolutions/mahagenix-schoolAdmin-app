import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { type AIContextData, PAGE_MAP } from '../types/ai';

// ─────────────────────────────────────────────────────────────────────────────
// Context shape
// ─────────────────────────────────────────────────────────────────────────────

interface AIContextValue {
  context: AIContextData;
  registerPageContext: (partial: Partial<AIContextData>) => void;
}

const DEFAULT_CONTEXT: AIContextData = {
  route: '/',
  page: 'Dashboard',
  module: 'dashboard',
  filters: {},
  searchValue: '',
  selectedRows: [],
  visibleData: [],
  dashboardMetrics: {},
  userInfo: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AIContext = createContext<AIContextValue>({
  context: DEFAULT_CONTEXT,
  registerPageContext: () => {},
});

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export default function AIContextProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const user = useSelector((s: RootState) => s.auth.user);

  // Page-level partial context pushed by individual pages
  const [pageContext, setPageContext] = useState<Partial<AIContextData>>({});
  const prevJsonRef = useRef('');

  // Resolve route → page + module
  const routeInfo = useMemo(() => {
    const path = location.pathname;
    // Try exact match first, then prefix match
    const entry =
      PAGE_MAP[path] ??
      Object.entries(PAGE_MAP).find(([prefix]) => path.startsWith(prefix))?.[1];
    return entry ?? { page: 'Unknown', module: 'unknown' };
  }, [location.pathname]);

  // Build user info from Redux
  const userInfo = useMemo(
    () =>
      user
        ? {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
          }
        : null,
    [user],
  );

  // Reset page-level context when the route changes
  useEffect(() => {
    setPageContext({});
    prevJsonRef.current = '';
  }, [location.pathname]);

  // Stable registration function — pages call this to push context
  const registerPageContext = useCallback((partial: Partial<AIContextData>) => {
    const json = JSON.stringify(partial);
    if (json === prevJsonRef.current) return; // deduplicate
    prevJsonRef.current = json;
    setPageContext(partial);
  }, []);

  // Assemble the full context
  const context = useMemo<AIContextData>(
    () => ({
      ...DEFAULT_CONTEXT,
      route: location.pathname,
      page: routeInfo.page,
      module: routeInfo.module,
      userInfo,
      ...pageContext,
    }),
    [location.pathname, routeInfo, userInfo, pageContext],
  );

  const value = useMemo(() => ({ context, registerPageContext }), [context, registerPageContext]);

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}
