import * as React from 'react';
import { InlineMarkdown, InlineMarkdownProps } from 'react-inline-markdown';

export const MarkdownDisplay = (props: InlineMarkdownProps) => (
  <InlineMarkdown renderers={mdRenderers} {...props} />
);

const mdRenderers: InlineMarkdownProps['renderers'] = {
  a: props => (
    <a
      {...props}
      className="text-teal-700"
      target="_BLANK"
      rel="nofollow noopener"
    >
      {props.children}
    </a>
  ),
};
