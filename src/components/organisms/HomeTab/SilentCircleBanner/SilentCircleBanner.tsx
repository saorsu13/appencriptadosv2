// src/components/organisms/HomeTab/SilentCircleBanner/SilentCircleBanner.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from '@tanstack/react-query';
import { useTheme } from "@shopify/restyle";
import { ThemeCustomType } from "@/config/theme2";
import { useNavigation } from "@react-navigation/native";
import { getSecureProductsByCategory, ProductSecure } from '@/api/productsSecure';
import CardProductItem from '@/components/molecules/CardProductItem/CardProductItem';
import { Product } from '@/features/product/types';

const BannerImage = require("@/assets/img/image 321.png");

const SilentCircleBanner = () => {
    const { colors } = useTheme<ThemeCustomType>();
    const navigation = useNavigation();

    const { data: products, isFetching } = useQuery<ProductSecure[]>({
        queryKey: ['productsAppSecure', 38],
        queryFn: () => getSecureProductsByCategory(38),
        staleTime: 0,
    });

    // Filtrar solo el producto Silent Circle (por nombre o ID)
    const silentRaw = products?.find(p => p.name.toLowerCase().includes("silent phone"));

    const silentProduct: Product | null = silentRaw
        ? {
            id: silentRaw.id,
            title: silentRaw.name,
            price: parseFloat(silentRaw.price),
            currency: 'USD',
            image: silentRaw.images[0]?.src || '',
            description: silentRaw.short_description,
            category: silentRaw.categories[0]?.name || '',
            periodOptions:
                silentRaw.attributes.find(a => a.name.toLowerCase() === 'licencia')?.options || [],
        }
        : null;

    return (
        <LinearGradient
            colors={["#000000", "#680000", "#000000"]}
            style={styles.container}
        >
            <View style={styles.badge}>
                <Text style={styles.badgeText}>Silent Circle</Text>
            </View>

            <Text style={[styles.title, { color: colors.white }]}>Silent Phone</Text>

            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                Desarrollada por expertos en tecnología móvil, esta app
                protege tus datos con máxima seguridad en todo{" "}
                momento.
            </Text>

            <Image source={BannerImage} style={styles.image} resizeMode="contain" />

            <Text style={styles.ctaText}>
                Compra aquí tu Silente Phone{"\n"}
                fácil y sin complicaciones
            </Text>
            {silentProduct && (
                <CardProductItem
                    key={silentProduct.id.toString()}
                    widthImage={70}
                    heightImage={70}
                    type="product"
                    showPeriodSelector={true}
                    periodOptions={silentProduct.periodOptions}
                    isFirstItem={true}
                    product={silentProduct}
                />
            )}
        </LinearGradient>
    );
};

export default SilentCircleBanner;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        overflow: "hidden",
        padding: 24,
        alignItems: "center",
        marginBottom: 24,
    },
    badge: {
        backgroundColor: "#CB0808",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 999,
        marginBottom: 16,
        marginTop: 25,
    },
    badgeText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 20,
    },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        marginBottom: 20,
    },
    ctaText: {
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        color: "white",
        marginBottom: 20,
    },
});
