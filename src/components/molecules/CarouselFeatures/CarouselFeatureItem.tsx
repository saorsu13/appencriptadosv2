import { ThemeCustom } from "@/config/theme2";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';

const { width: windowWidth } = Dimensions.get("window");

export interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface CarouselFeatureItemProps {
  item: FeatureItem;
  index: number;
  selectedIndex: number;
}


const CarouselFeatureItem: React.FC<CarouselFeatureItemProps> = ({ item }) => {
  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  return (
    <>
      <View>
        <View style={styles.container}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={{ width: 340 }}>
          <Text allowFontScaling={false} style={styles.title}>
            {item.title}
          </Text>
        </View>

        <ScrollView style={{ height: 80 }}>
          <View style={{ width: 250 }}>
            <Text
              allowFontScaling={false}
              style={{ color: colors.secondaryText }}
            >
              {item.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.8,
    marginRight: 5,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#101010",
  },

  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    color: "#FFFFFF",
  },
  description: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "300",
    textAlign: "justify",
    color: "#FFFFFF",
  },
});

export default CarouselFeatureItem;
