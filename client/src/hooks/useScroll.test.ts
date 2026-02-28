import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScroll } from './useScroll';

describe('useScroll', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with showBackToTop as false', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.showBackToTop).toBe(false);
  });

  it('shows back to top button when scrolled past threshold', () => {
    const { result } = renderHook(() => useScroll(300));
    
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.showBackToTop).toBe(true);
  });

  it('hides back to top button when scrolled below threshold', () => {
    const { result } = renderHook(() => useScroll(300));
    
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.showBackToTop).toBe(false);
  });

  it('scrolls to top when scrollToTop is called', () => {
    const { result } = renderHook(() => useScroll());
    
    act(() => {
      result.current.scrollToTop();
    });
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('uses custom threshold', () => {
    const { result } = renderHook(() => useScroll(500));
    
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    expect(result.current.showBackToTop).toBe(true);
  });
});
