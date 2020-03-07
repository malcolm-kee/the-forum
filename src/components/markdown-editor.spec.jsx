import { render } from '@testing-library/react';
import React from 'react';
import { user } from '../lib/test-utils';
import { MarkdownEditor } from './markdown-editor';

describe(`<MarkdownEditor />`, () => {
  const TestBed = () => {
    const [text, setText] = React.useState('');
    const [tab, setTab] = React.useState('edit');

    return (
      <MarkdownEditor
        label="Comment"
        value={text}
        onChangeValue={setText}
        activeTab={tab}
        onTabChange={setTab}
      />
    );
  };

  it(`able to capture text and show preview`, async () => {
    const { getByLabelText, getByText } = render(<TestBed />);

    await user.type(getByLabelText('Comment'), '*Hi*! I am Malcolm.');

    user.click(getByText('Preview'));

    expect(getByText('Hi')).toBeVisible();
    expect(getByLabelText('Comment')).not.toBeVisible();
  });
});
