import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

export const renderWithTheme = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { ...options });
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
