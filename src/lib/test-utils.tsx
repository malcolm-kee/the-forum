/* istanbul ignore file */

import { act, render } from '@testing-library/react';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => Promise<void>
): (...args: Arg) => Promise<undefined>;
function wrapAct<Arg extends any[]>(
  action: (...args: Arg) => void
): (...args: Arg) => void;
function wrapAct<Arg extends any[]>(action: (...args: Arg) => any) {
  return function invokeAct(...args: Arg) {
    return act(() => action(...args));
  };
}

export const user = {
  click: wrapAct(userEvent.click),
  dblClick: wrapAct(userEvent.dblClick),
  type: wrapAct(userEvent.type),
  selectOptions: wrapAct(userEvent.selectOptions),
};

export const renderWithRouter = (
  ui: React.ReactElement,
  { currentPath = '/' } = {}
) => {
  const history = createMemoryHistory({
    initialEntries: [currentPath],
  });

  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
    navigate: (url: string, state: any) => {
      act(() => {
        history.push(url, state);
      });
    },
  };
};
