import type { Meta, StoryObj } from '@storybook/react';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';

const meta: Meta<typeof LoadingWithMessage> = {
  title: 'common/LoadingWithMessage',
  component: LoadingWithMessage,
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
  name: 'ローディング表示',
  args: {
    message: '読み込み中...',
  },
};
