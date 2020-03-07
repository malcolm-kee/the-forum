import * as React from 'react';
import { MarkdownDisplay } from './markdown-display';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from './tabs';
import { TextareaField, TextareaFieldProps } from './textarea-field';

export type EditorTab = 'edit' | 'preview';

export type MarkdownEditorProps = {
  value: string;
  onChangeValue: (value: string) => void;
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
} & Omit<TextareaFieldProps, 'value' | 'onChangeValue'>;

export const MarkdownEditor = ({
  activeTab,
  onTabChange,
  ...props
}: MarkdownEditorProps) => {
  return (
    <Tabs
      index={activeTab === 'edit' ? 0 : 1}
      onChange={newIndex => onTabChange(newIndex === 0 ? 'edit' : 'preview')}
    >
      <TabList>
        <Tab type="button">Edit</Tab>
        <Tab type="button">Preview</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextareaField
            helpText={
              <>
                Supports Whatsapp-like markdown, i.e.{' '}
                <code>[link-text](link-url)</code>, <code>_italic_</code>, and{' '}
                <code>*bold*</code>
              </>
            }
            {...props}
          />
        </TabPanel>
        <TabPanel>
          <div className="py-2">
            <MarkdownDisplay markdown={props.value} />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
