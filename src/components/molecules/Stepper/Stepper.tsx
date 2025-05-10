// src/components/molecules/Stepper/Stepper.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import IconSvg from '../IconSvg/IconSvg';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { styles } from './StepperStyles';

export interface Step {
  vectorcomponent: React.ReactNode;
  cardinfo: React.ReactNode;
  stepNumber: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
}

export default function Stepper({ steps }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { colors } = useTheme<ThemeCustomType>();
  const icons = ['money', 'shopstepper', 'checkstepper'];

  const goToStep = (index: number) => setCurrentStep(index);

  return (
    <View style={styles.container}>
      {/* Tarjeta principal */}
      {steps[currentStep] && (
        <View style={styles.cardWrapper}>
          {steps[currentStep].vectorcomponent}
          {steps[currentStep].cardinfo}
        </View>
      )}

      {/* Dots y líneas */}
      <View style={styles.dotsContainer}>
        {steps.map((_, idx) => {
          const selected = idx === currentStep;
          return (
            <View key={idx} style={styles.dotItem}>
              <TouchableOpacity onPress={() => goToStep(idx)}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: selected ? colors.blueLight   : 'transparent',
                      borderColor:    selected ? colors.primaryColor : colors.blueLight,
                    },
                  ]}
                >
                  <IconSvg
                    //@ts-ignore
                    type={icons[idx % icons.length]}
                    color={selected ? colors.primaryColor : colors.blueLight}
                    height={24}
                    width={24}
                  />
                </View>
              </TouchableOpacity>

              {idx < steps.length - 1 && (
                <View
                  style={[
                    styles.separator,
                    {
                      backgroundColor: selected ? colors.primaryColor : colors.blueLight,
                    },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>

      {/* Título dinámico */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          {steps[currentStep]?.title}
        </Text>
      </View>
    </View>
  );
}
