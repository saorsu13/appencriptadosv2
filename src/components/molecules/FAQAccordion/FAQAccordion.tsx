// src/components/molecules/FAQAccordion/FAQAccordion.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import IconSvg from '@/components/molecules/IconSvg/IconSvg';
import { useTheme } from '@shopify/restyle';
import { ThemeCustomType } from '@/config/theme2';
import { styles } from './FAQAccordionStyles';
import { t } from 'i18next';

export interface FAQItem {
  title: string;
  content: string;
}

export interface FAQAccordionProps {
  data: FAQItem[];
}

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme<ThemeCustomType>();

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={[
          styles.accordionHeader,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: colors.strokeBorder,
          },
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[styles.accordionTitle, { color: colors.primaryText }]}
        >
          {item.title}
        </Text>
        <Animated.View
          style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
        >
          <IconSvg type="arrowupicon" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View
          style={[
            styles.accordionContent,
            { backgroundColor: colors.backgroundSecondary },
          ]}
        >
          <Text allowFontScaling={false} style={{ color: colors.primaryText }}>
            {item.content}
          </Text>
        </View>
      )}
    </View>
  );
};

const FAQAccordion: React.FC<FAQAccordionProps> = ({ data }) => {
  const { colors } = useTheme<ThemeCustomType>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text
        allowFontScaling={false}
        style={[styles.header, { color: colors.primaryText }]}
      >
        {t('pages.home-tab.frequentQuestions')}
      </Text>

      {data.map((item, idx) => (
        <AccordionItem key={idx} item={item} />
      ))}
    </View>
  );
};

export default FAQAccordion;
