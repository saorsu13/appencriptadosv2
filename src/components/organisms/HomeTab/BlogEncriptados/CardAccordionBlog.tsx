import React, { useState, useRef } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { ThemeCustom } from '@/config/theme2';
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { CarouselBlogItem } from "./CarouselBlogItem";
import { styles } from "./CardAccordionBlogStyles";
import { ViewToken } from 'react-native';

interface CardAccordionBlogProps {
  posts: any[];
}

export const CardAccordionBlog: React.FC<CardAccordionBlogProps> = ({ posts }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setSelectedIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 0 });

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true, viewPosition: 0.5 });
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < posts.length - 1) {
      const newIndex = selectedIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true, viewPosition: 0.5 });
      setSelectedIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={({ item }) => <CarouselBlogItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* En el futuro puedes descomentar la navegación de flechas aquí */}
      {/* <View style={[styles.buttonContainer, { backgroundColor: colors.backgroundAlternate2 }]}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={handlePrev} style={styles.arrowButton} disabled={selectedIndex === 0}>
            <Icon name="chevron-back" size={30} color={selectedIndex === 0 ? colors.strokeBorder : colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.arrowButton} disabled={selectedIndex === posts.length - 1}>
            <Icon name="chevron-forward" size={30} color={selectedIndex === posts.length - 1 ? colors.strokeBorder : colors.white} />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default CardAccordionBlog;
