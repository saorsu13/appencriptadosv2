// src/components/organisms/HomeTab/EncryptedPhonesBanner/EncryptedPhonesBanner.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-reanimated-carousel';

import { getSecureProductsByCategory, ProductSecure } from '@/api/productsSecure';
import CardProductItem from '@/components/molecules/CardProductItem/CardProductItem';
import Pagination from '@/components/molecules/Pagination/Pagination';
import type { Product } from '@/features/product/types';
import type { ThemeCustomType } from '@/config/theme2';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 1;
const ITEM_SPACING = 2;

export default function EncryptedPhonesBanner() {
    const { colors } = useTheme<ThemeCustomType>();
    const { t } = useTranslation();
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);

    const { data: phoneProducts } = useQuery<ProductSecure[]>({
        queryKey: ['productsSimSecure', 35],
        queryFn: () => getSecureProductsByCategory(35),
        staleTime: 0,
    });

    const formattedList: Product[] = phoneProducts?.map(p => ({
        id: p.id,
        title: p.name,
        price: parseFloat(p.price) || 0,
        currency: 'USD',
        image: p.images[0]?.src || '',
        category: p.categories[0]?.name || '',
        description: p.short_description || '',
        banner: '',
        features: [],
        advantages: [],
        generaltitle: '',
        generaldescription: '',
        faqs: [],
        periodOptions: p.attributes.find(attr => attr.name.toLowerCase() === 'licencia')?.options || []
    })) || [];

    // 👇 División en dos mitades
    const midpoint = Math.ceil(formattedList.length / 2);
    const firstHalf = formattedList.slice(0, midpoint);
    const secondHalf = formattedList.slice(midpoint);

    return (
        <LinearGradient colors={[colors.backgroundSecondary, '#000000']} style={styles.container}>
            <LinearGradient
                colors={['#abebfe', '#12b4e7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.badgeWrap}
            >
                <Text style={styles.badge}>Seguridad en inicio a fin</Text>
            </LinearGradient>

            <Text style={[styles.title, { color: colors.primaryText }]}>Sistemas encriptados</Text>

            {formattedList.length > 0 && (
                <>
                    {/* 🔵 Primer carrusel */}
                    <View style={styles.carouselWrap}>
                        <Carousel
                            loop
                            width={CARD_WIDTH}
                            height={400}
                            autoPlay={false}
                            snapEnabled
                            style={{ width }}
                            pagingEnabled
                            mode="parallax"
                            data={firstHalf}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => setActiveIndex1(index)}
                            renderItem={({ item }) => (
                                <CardProductItem
                                    key={item.id.toString()}
                                    product={item}
                                    type="product"
                                    widthImage={70}
                                    heightImage={70}
                                    isFirstItem={false}
                                    showPeriodSelector={Boolean(item.periodOptions?.length)}
                                    periodOptions={item.periodOptions ?? []}
                                />
                            )}
                        />
                        <Pagination
                            activeIndex={activeIndex1}
                            total={firstHalf.length}
                            activeColor={'#ccc'}
                            inactiveColor={'#444'}
                        />
                    </View>

                    {/* 🔴 Segundo carrusel */}
                    <View style={[styles.carouselWrap, { marginTop: 24 }]}>
                        <Carousel
                            loop
                            width={CARD_WIDTH}
                            height={400}
                            autoPlay={false}
                            snapEnabled
                            style={{ width }}
                            pagingEnabled
                            mode="parallax"
                            data={secondHalf}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => setActiveIndex2(index)}
                            renderItem={({ item }) => (
                                <CardProductItem
                                    key={item.id.toString()}
                                    product={item}
                                    type="product"
                                    widthImage={70}
                                    heightImage={70}
                                    isFirstItem={false}
                                    showPeriodSelector={Boolean(item.periodOptions?.length)}
                                    periodOptions={item.periodOptions ?? []}
                                />
                            )}
                        />
                        <Pagination
                            activeIndex={activeIndex2}
                            total={secondHalf.length}
                            activeColor={'#ccc'}
                            inactiveColor={'#444'}
                        />
                    </View>
                </>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        alignItems: 'center',
        width: '100%',
    },
    badgeWrap: {
        marginBottom: 12,
        borderRadius: 25,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    badge: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 25,
        color: '#000',
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
    },
    carouselWrap: {
        width: '100%',
        alignItems: 'center',
    },
});