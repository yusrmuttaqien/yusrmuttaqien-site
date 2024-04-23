import type { HowSteps } from '@/types/content';

export function howSteps(props: HowSteps) {
  const { command, options, control } = props;

  return {
    command: { desc: command, image: 'https://source.unsplash.com/random' },
    options: {
      desc: options,
      image:
        'https://images.unsplash.com/photo-1713080045896-0b78f9a6bb55?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    control: {
      desc: control,
      image:
        'https://images.unsplash.com/photo-1711652936849-722cada30356?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  };
}
