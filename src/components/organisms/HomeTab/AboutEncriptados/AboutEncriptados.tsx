import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
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
        backgroundColor: "#000",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        marginVertical: 20,
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
