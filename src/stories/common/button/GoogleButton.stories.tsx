import type { Meta, StoryObj } from '@storybook/react';
import { GoogleButton } from '@/components/common/button/GoogleButton';

const meta: Meta<typeof GoogleButton> = {
  title: 'common/button/GoogleButton',
  component: GoogleButton,
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
  args: {},
};

export const sample2: Story = {
  name: 'disabled',
  args: {
    disabled: true,
  },
};
