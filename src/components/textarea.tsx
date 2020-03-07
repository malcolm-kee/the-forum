import cx from 'classnames';
import * as React from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { callAll } from '../lib/fp';

export type TextareaProps = Omit<TextareaAutosizeProps, 'ref' | 'inputRef'> & {
  /**
   * callback to be invoked when value change. The parameter will
   * be the value instead of the event object
   */
  onChangeValue?: (value: string) => void;
  rounded?: boolean;
};

/**
 * `Textarea` is a wrapper around `textarea` element.
 *
 * It accepts all props an `textarea` element in addition of the stated props.
 *
 * `ref` will be forwarded to the underlying `textarea` element.
 *
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      minRows = 3,
      onChangeValue,
      onChange,
      rounded,
      ...textareaProps
    },
    forwardedRef
  ) {
    return (
      <TextareaAutosize
        className={cx(
          'text-base block m-0 w-full border border-gray-300 px-3 py-1 shadow-inner text-gray-900',
          rounded && 'rounded-lg',
          className
        )}
        minRows={minRows}
        onChange={callAll(
          onChange,
          onChangeValue && (ev => onChangeValue(ev.target.value))
        )}
        {...textareaProps}
        inputRef={ref => {
          if (typeof forwardedRef === 'function') {
            forwardedRef(ref);
          } else {
            if (forwardedRef) {
              (forwardedRef as React.MutableRefObject<
                HTMLTextAreaElement
              >).current = ref;
            }
          }
        }}
      />
    );
  }
);
