import * as React from 'react';
import '@reach/tabs/styles.css';
import { Tab as ReachTab } from '@reach/tabs';
export { TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';

type TabProps = React.ComponentPropsWithoutRef<typeof ReachTab>;

export const Tab = (props: TabProps) => (
  <ReachTab
    type="button"
    className={
      props.isSelected ? 'bg-teal-700 font-bold text-gray-100' : undefined
    }
    {...props}
  />
);
