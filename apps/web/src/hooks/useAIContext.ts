import { useContext, useEffect, useRef } from 'react';
import { AIContext } from '../context/AIContextProvider';
import type { AIContextData } from '../types/ai';

/**
 * Read the current AI context (route, page, filters, visible data, etc.)
 */
export function useAIContext() {
  const { context } = useContext(AIContext);
  return context;
}

/**
 * Push page-level context into the AI context provider.
 * Automatically cleans up when the component unmounts.
 *
 * @example
 * useRegisterAIContext({
 *   filters: { status: 'ACTIVE', class: 'Grade 10' },
 *   searchValue: search,
 *   visibleData: filteredStudents,
 * });
 */
export function useRegisterAIContext(partial: Partial<AIContextData>) {
  const { registerPageContext } = useContext(AIContext);
  const cleanupRef = useRef<() => void>();

  useEffect(() => {
    registerPageContext(partial);
    cleanupRef.current = () =>
      registerPageContext({
        filters: {},
        searchValue: '',
        selectedRows: [],
        visibleData: [],
        dashboardMetrics: {},
      });
    // Only re-register when the stringified value actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(partial), registerPageContext]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);
}
