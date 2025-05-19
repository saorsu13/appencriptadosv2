// src/components/organisms/LoginSteps.tsx
import React from 'react';
import { View } from 'react-native';
import StepList from '@/components/molecules/StepList/StepList';
import { useTranslation } from 'react-i18next';
import { LoginStyles } from '@/styles/LoginStyles/LoginStyles';

type Props = {
  simNumber: string;
};

export default function LoginSteps({ simNumber }: Props) {
  const { t } = useTranslation();
  const base = 'pages.login.form.stepsList';

  const isLongSim = simNumber.length === 19;
  
  const title = isLongSim
    ? t(`${base}.title_tim`)
    : t(`${base}.title_tottoli`);

  const items = isLongSim
  ? [
      t(`${base}.step1_tim`),
      t(`${base}.step2_tim`),
    ]
  : [
      t(`${base}.step1_tottoli`),
      t(`${base}.step2_tottoli`),
    ];


 return (
    <View style={LoginStyles.stepsContainer}>
      <StepList title={title} items={items} />
    </View>
  );
}