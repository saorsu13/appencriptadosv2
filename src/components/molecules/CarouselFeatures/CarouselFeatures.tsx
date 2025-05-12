import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ViewToken,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CarouselFeatureItem from "./CarouselFeatureItem";
import { FeatureItem } from "./CarouselFeatureItem";

const { width: windowWidth } = Dimensions.get("window");

interface CarouselFeaturesProps {
  features: FeatureItem[];
}

const CarouselFeatures: React.FC<CarouselFeaturesProps> = ({ features }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList<FeatureItem>>(null);

const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setSelectedIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true, viewPosition: 0.5 });
    }
  };

  const handleNext = () => {
    if (selectedIndex < features.length - 1) {
      const newIndex = selectedIndex + 1;
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true, viewPosition: 0.5 });
    }
  };

  const renderItem = ({ item, index }: { item: FeatureItem; index: number }) => (
    <CarouselFeatureItem item={item} index={index} selectedIndex={selectedIndex} />
  );

  return (
    <>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.headerTitle}>
          Características
        </Text>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={handlePrev} disabled={selectedIndex === 0} style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={25} color={selectedIndex === 0 ? "gray" : "white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={selectedIndex === features.length - 1} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={25} color={selectedIndex === features.length - 1 ? "gray" : "white"} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={features}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
  container: {
    marginBottom: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: (windowWidth - 220) / 10,
  },

  arrowContainer: {
    flexDirection: "row",
  },
  arrowButton: {
    marginHorizontal: 10,
  },
});

export default CarouselFeatures;
