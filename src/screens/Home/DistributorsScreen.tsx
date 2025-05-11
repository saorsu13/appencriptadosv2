// src/screens/Home/DistributorsScreen.tsx
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { useTheme } from "@shopify/restyle";

import HeaderEncrypted from "@/components/molecules/HeaderEncrypted/HeaderEncrypted";
import { ThemeCustom } from "@/config/theme2";
import Section from "@/components/molecules/SectionDistributors/Section";
import ContactButton from "@/components/molecules/SectionDistributors/ContactButton";
import { styles } from "@/styles/Home/DistributorsScreenStyles";
import { useDarkModeTheme, ThemeMode } from '@/context/theme';
import { t } from "i18next";

export default function DistributorsScreen() {
    const { themeMode } = useDarkModeTheme();
    const isDark = themeMode === ThemeMode.Dark;
    const theme = ThemeCustom[themeMode];
    const { colors } = theme;

    const HandCellphone = require("@/assets/img/hand-cellphone.png");
    const EncriptadosBanner = require("@/assets/img/encriptadosbanner.jpg");
    const Distributors = require("@/assets/img/distributors.jpg");
    const DistributorsBanner = require("@/assets/img/distributorsbanner.jpg");
    const EncriptadosBannerApps = require("@/assets/img/encriptadosappsbanner.jpg");
    const EncriptadosBannerPhone = require("@/assets/img/encriptadosphonebanner.jpg");
    const EncriptadosBannerSim = require("@/assets/img/encriptadossimbanner.png");

    return (
    <ScrollView style={{ backgroundColor: colors.background }}>
        <HeaderEncrypted iconBack="HomeMain" />

        <View style={styles.container}>
        <Text allowFontScaling={false} style={[styles.title, { color: colors.primaryText }]}>
            {t("pages.home-tab.distributors-title")}
        </Text>

        <View style={styles.textContainer}>
            <Text allowFontScaling={false} style={[styles.text, { color: colors.secondaryText }]}>
            {t("pages.home-tab.distributors-description")}
            </Text>
        </View>
        </View>

        <View>
        <Text
            allowFontScaling={false}
            style={[styles.text, { color: colors.secondaryText, alignSelf: "center" }]}
        >
            ¡Contáctanos!
        </Text>
        </View>

        <ContactButton />

        <Image source={HandCellphone} resizeMode="contain" style={styles.image} />

        <Section
        title="¿Qué es ser un distribuidor de Encriptados?"
        text="Si eres una persona u organización que cuenta con un público interesado en herramientas de comunicaciones cifradas, puedes aliarte con nosotros para distribuirles nuestros productos"
        imageSource={EncriptadosBanner}
        />
        <Section
        title="¿Por qué sistemas de comunicación cifrada?"
        text="Personas del común, compañías y hasta gobiernos llevan mucho tiempo siendo víctimas de ataques digitales. Según datos, los costos de daños por delitos cibernéticos alcanzaron los $6 billones anuales para 2021. Las amenazas son cada vez más avanzadas y se hace necesario contar con tecnología de encriptación para proteger la información."
        imageSource={Distributors}
        />
        <Section
        title="¿Qué implica ser un distribuidor de Encriptados?"
        text="Para ser un distribuidor de Encriptados se requiere mucha precaución, reserva y responsabilidad en el uso de los datos, esto con el fin de brindarle la mayor seguridad posible a nuestros usuarios"
        imageSource={DistributorsBanner}
        />
        <Section
        title="¡La seguridad móvil, un negocio en crecimiento!"
        text="Cada día es más necesaria la privacidad y más difícil conseguirla. Por eso, este es un mercado que está en continuo crecimiento y cuya demanda abarca cada vez más sectores."
        />
        <Section title="¡Nuestros productos!" />
        <Section
        title="Sistemas de seguridad completos"
        text="Sistemas de seguridad que modifican políticas TI e incluyen herramientas de comunicación cifrada."
        imageSource={EncriptadosBannerPhone}
        />
        <Section
        title="Aplicaciones para Mensajería Segura"
        text="A diferencia de los celulares encriptados, las aplicaciones no requieren modificar el funcionamiento del teléfono y se pueden adaptar fácilmente a un celular personal aportando gran seguridad y privacidad."
        imageSource={EncriptadosBannerApps}
        />
        <Section
        title="Sim Card Encriptados"
        text="La Sim Card Encriptados, es una Sim Card Cifrada ultra segura compatible con cualquier marca de celular o tablet funcionando en más de 200 países. Se integra muy bien con los productos anteriormente mostrados. Al usarla en conjunto, funciona como un complemento que se encarga de brindar seguridad en la conexión a la red de estos sistemas o aplicativos."
        imageSource={EncriptadosBannerSim}
        />
    </ScrollView>
    );
    }
