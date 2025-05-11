// src/screens/Home/BlogDetailScreen.tsx
import React, { useEffect } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@shopify/restyle";

import { getPostById, getPostImage } from "@/api/posts";
import { setLoading } from "@/features/loading/loadingSlice";
import HeaderEncrypted from "@/components/molecules/HeaderEncrypted/HeaderEncrypted";
import RenderHTML from "@/components/molecules/RenderHTML/RenderHTML";
import { ThemeCustom } from "@/config/theme2";
import { HomeTabParamList } from "@/navigation/types";
import { useAppSelector } from "@/hooks/hooksStoreRedux";
import { styles } from "@/styles/Home/BlogDetailScreenStyles";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';

export default function BlogDetailScreen() {
    const route = useRoute<RouteProp<HomeTabParamList, "BlogDetailScreen">>();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

    const { postId } = route.params;

    const { data, isFetching } = useQuery({
    queryKey: ["postById", postId],
    staleTime: 0,
    queryFn: () => getPostById(postId),
    });

    const { data: image, isFetching: imageFetching } = useQuery({
    queryKey: ["getPostImage", postId],
    staleTime: 0,
    queryFn: () => getPostImage(data?.featured_media ?? ""),
    enabled: !!data, 
    });

    const imageSource = image?.guid?.rendered
    ? { uri: image.guid.rendered }
    : undefined;


    useEffect(() => {
    if (isFetching || imageFetching) {
        dispatch(setLoading(true));
    } else {
        dispatch(setLoading(false));
    }
    }, [isFetching, imageFetching, dispatch]);


  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
    <HeaderEncrypted iconBack="HomeMain" />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={imageSource}
          />
        </View>

        <RenderHTML
          h2Color={colors.primaryText}
          pColor={colors.secondaryText}
          aTextDecorationColor={colors.primaryText}
          showFigures
          htmlContent={data?.content?.rendered}
          aColor={colors.primaryText}
        />
      </View>
    </ScrollView>
  );
}
