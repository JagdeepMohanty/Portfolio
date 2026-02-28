import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../../hooks/useTheme';

describe('Theme Switching Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');
  });

  it('initializes with default dark theme', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles theme and updates DOM', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('persists theme across sessions', () => {
    const { result: result1 } = renderHook(() => useTheme());
    
    act(() => {
      result1.current.toggleTheme();
    });
    
    expect(localStorage.getItem('theme')).toBe('light');
    
    const { result: result2 } = renderHook(() => useTheme());
    expect(result2.current.theme).toBe('light');
  });

  it('toggles theme multiple times', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
    
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
  });

  it('syncs theme with localStorage', () => {
    localStorage.setItem('theme', 'light');
    
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });
});
