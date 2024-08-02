import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@/components/common/Divider';

const meta: Meta<typeof Divider> = {
  title: 'common/Divider',
  component: Divider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const sample: Story = {
  name: '通常の表示',
  args: {
    label: 'ラベル',
  },
  render: function Comp(args) {
    return (
      <div style={{ width: '200px', display: 'flex', flexFlow: 'column', gap: 8 }}>
        <Divider {...args} />
      </div>
    );
  },
};

export const sample2: Story = {
  name: 'ラベルなし表示',
  args: {},
  render: function Comp(args) {
    return (
      <div style={{ width: '200px', display: 'flex', flexFlow: 'column', gap: 8 }}>
        <Divider {...args} />
      </div>
    );
  },
};
