import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import { useQuery } from "@tanstack/react-query";
import { ThemeCustom } from "@/config/theme2";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { useNavigation } from '@react-navigation/native';
import { HomeTabParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getPostImage } from "@/api/posts";
import RenderHTML from "@/components/molecules/RenderHTML/RenderHTML";
import { styles } from "./CarouselBlogItemStyles";
import { Post } from "./BlogEncriptados";

const CardBlog = require("@/assets/img/card-blog.png");

interface CarouselBlogItemProps {
  post: Post;
}


export const CarouselBlogItem: React.FC<CarouselBlogItemProps> = ({ post }) => {

  const { themeMode } = useDarkModeTheme();
  const isDark = themeMode === ThemeMode.Dark;
  const theme = ThemeCustom[themeMode];
  const { colors } = theme;
  
  const navigation = useNavigation<NativeStackNavigationProp<HomeTabParamList>>();

  const { data, isFetching } = useQuery({
    queryKey: ["getPostImage", post.featured_media],
    gcTime: 0,
    queryFn: () => getPostImage(post.featured_media),
  });

  const imageSource = data?.guid?.rendered ? { uri: data.guid.rendered } : undefined;

  if (isFetching) {
    null;
  }
  return (
    <View
      style={{ ...styles.card, backgroundColor: colors.backgroundSecondary }}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          resizeMode="contain"
          source={imageSource}
        />
      </View>
      <Text
        allowFontScaling={false}
        style={{ ...styles.title, color: colors.primaryText }}
      >
        {post.title.rendered}
      </Text>

      <RenderHTML
        aColor="blue"
        pColor={colors.secondaryText}
        aTextDecorationColor="blue"
        htmlContent={post.content.rendered.substring(0, 200) + "..."}
      />

      <TouchableOpacity onPress={() => navigation.navigate('BlogDetailScreen', { postId: post.id })}>
        <Text>Leer más</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarouselBlogItem;
