export interface Section {
  id: string;
  title: string;
  subtitle: string;
  placeholder: string;
}

export const sections: Section[] = [
  {
    id: 'beginning',
    title: 'Beginning',
    subtitle: 'Every story starts quietly.',
    placeholder: 'Write if you want to…'
  },
  {
    id: 'first-met',
    title: 'First Met',
    subtitle: 'Some moments don\'t announce themselves.',
    placeholder: 'A normal day that didn\'t feel normal afterward…'
  },
  {
    id: 'first-laugh',
    title: 'First Laugh',
    subtitle: 'Laughter makes things real.',
    placeholder: 'What made it real…'
  },
  {
    id: 'first-memory',
    title: 'First Memory',
    subtitle: 'The ones you revisit without trying.',
    placeholder: 'The one you return to…'
  },
  {
    id: 'today',
    title: 'Today',
    subtitle: 'Still here. Still choosing.',
    placeholder: 'Where you are now…'
  }
];
