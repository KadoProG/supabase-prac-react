import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@/components/common/Skeleton';

const meta = {
  title: 'common/Skeleton',
  component: Skeleton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const sample: Story = {
  name: '通常のスケルトン表示',
  args: {},
  render: function Comp(args) {
    return (
      <div style={{ width: '200px', display: 'flex', flexFlow: 'column', gap: 8 }}>
        <Skeleton {...args} />
        <Skeleton {...args} />
        <Skeleton {...args} />
        <Skeleton {...args} />
      </div>
    );
  },
};
