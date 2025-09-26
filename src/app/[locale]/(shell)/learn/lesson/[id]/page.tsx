import type { Exercise } from '@organisms/ExerciseRenderer';
import { setRequestLocale } from 'next-intl/server';
import * as React from 'react';
import LearnTemplate from '@/components/templates/LearnTemplate';
import LessonClient from './LessonClient';

export default async function LessonPage(props: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);
  const exercises: Exercise[] = [
    { id: 'e1', type: 'TypeAnswer', prompt: 'Translate "Hello"', answer: 'こんにちは' },
    { id: 'e2', type: 'SelectChoice', prompt: 'Pick "Cat"', choices: ['犬', '猫', '鳥'], answer: '猫' },
    { id: 'e3', type: 'ListenSpeak', prompt: 'Listen and repeat' },
  ];

  return (
    <LearnTemplate>
      <LessonClient id={id} exercises={exercises} />
    </LearnTemplate>
  );
}
