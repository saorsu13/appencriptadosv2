import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CarouselMock from "../Carousel/CarouselMock";
import { t } from "i18next";

interface OrderDetailsProps {
  image?: string;
  title?: string;
  price?: number | string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ image, title, price }) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.row}>
        <View style={styles.carouselContainer}>
          <View style={styles.carouselBackground}>
            {image ? (
              <ImageBackground
                source={{ uri: image }}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            ) : null}
          </View>
          <Text allowFontScaling={false} style={styles.productText}>
            {title}
          </Text>
        </View>
        <Text allowFontScaling={false} style={styles.priceText}>
          {price} USD
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#202020",
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  carouselBackground: {
    backgroundColor: "#3A3A3A",
    borderRadius: 7,
  },
  productText: {
    color: "white",
    width: 150,
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
  },
});

export default OrderDetails;
