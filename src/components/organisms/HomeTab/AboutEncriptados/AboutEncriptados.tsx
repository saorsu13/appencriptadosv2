import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import { ThemeCustomType } from "@/config/theme2";
import GradientText from "@/components/atoms/GradientText/GradientText";
import CheckIcon from "@/assets/icons/CheckIcon";

const Logo = require("@/assets/img/encriptados_logo_b.png");

const AboutEncriptados = () => {
    const { colors } = useTheme<ThemeCustomType>();

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.subtitle, { color: colors.primaryText }]}>
                Somos especialistas en soluciones de{"\n"}comunicación segura:
            </Text>
            <View style={styles.gradientSeparatorWrap}>
                <Svg height="1" width="100">
                    <Defs>
                        <LinearGradient id="separatorGradient" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="#12b4e7" />
                            <Stop offset="1" stopColor="#abebfe" />
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100" height="2" fill="url(#separatorGradient)" />
                </Svg>
            </View>
            <View style={styles.list}>
                {[
                    "Celulares Seguros",
                    "SIM Cards Encriptadas",
                    "Protección de Nivel Empresarial",
                    "Sistemas de Seguridad Probados",
                ].map((item, index) => (
                    <View key={index} style={styles.item}>
                        <CheckIcon width={16} height={16} color={colors.primaryColor} />
                        <View style={{ marginLeft: 12 }}>
                            <GradientText text={item} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default AboutEncriptados;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#101010",
        padding: 24,
        alignItems: "center",
    },
    logo: {
        width: 160,
        height: 40,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "400",
    },
    gradientSeparatorWrap: {
        marginTop: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    list: {
        width: "100%",
        alignItems: "center",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    itemText: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 12,
    },
});
