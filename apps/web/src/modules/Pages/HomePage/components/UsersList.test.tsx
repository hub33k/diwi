import { describe, expect, it } from 'bun:test';
import { render, screen, waitFor } from '@testing-library/react';
import { UsersList } from './UsersList';

describe(UsersList.name, () => {
  it('should render empty list of users', async () => {
    // given
    render(<UsersList data={[]} />);

    // when

    // then
    const usersCountClient = screen.getByTestId('users-count-client');
    expect(usersCountClient).toHaveTextContent('0');

    const usersCountServer = screen.getByTestId('users-count-server');
    expect(usersCountServer).toHaveTextContent('0');

    // wait for useEffect to finish
    await waitFor(async () => {
      const myComponent = screen.getByTestId('users');
      expect(myComponent).toBeInTheDocument();

      expect(await screen.findByText(/UsersList client state/i)).toBeDefined();
      expect(await screen.findByText(/UsersList server data/i)).toBeDefined();

      // In component we fetch users, so it should be 1
      expect(usersCountClient).toHaveTextContent('1');
      expect(usersCountServer).toHaveTextContent('0');
    });
  });
});
