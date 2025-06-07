import { describe, expect, it } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe(HomePage.name, () => {
  it('should render HomePage', async () => {
    // given
    render(await HomePage());

    // when

    // then
    expect(await screen.findByText(/UsersList client state/i)).toBeDefined();
    expect(await screen.findByText(/UsersList server data/i)).toBeDefined();
  });
});
