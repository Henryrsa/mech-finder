import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import Button from "../../components/Button";
import Card from "../../components/Card";
import SectionHeader from "../../components/SectionHeader";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Home({ navigation }) {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuIconHolder}
          >
            <Ionicons name="menu" size={28} color={colors.snow} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/logo-primary.png")}
            style={styles.logo}
          />
          <View style={styles.headerAction}>
            <Ionicons name="notifications-outline" size={22} color={colors.fog} />
          </View>
        </View>

        <SectionHeader
          title="Need a mechanic?"
          subtitle="Get help on the road in minutes."
          style={styles.headerBlock}
        />

        <Card style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <View style={styles.ctaIconWrap}>
              <MaterialCommunityIcons
                name="car-wrench"
                size={28}
                color={colors.charcoal}
              />
            </View>
            <View style={styles.ctaTextWrap}>
              <Text style={styles.ctaTitle}>Request Mechanic</Text>
              <Text style={styles.ctaSubtitle}>
                Live dispatch, trusted pros nearby.
              </Text>
            </View>
          </View>
          <Button title="Start Request" onPress={() => {}} />
        </Card>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Services</Text>
          <Text style={styles.sectionHint}>Select a category</Text>
        </View>

        <View style={styles.servicesGrid}>
          {[
            { label: "Towing", icon: "tow-truck" },
            { label: "Tire", icon: "tire" },
            { label: "Battery", icon: "car-battery" },
            { label: "Diagnostics", icon: "car-cog" },
          ].map((service) => (
            <Card key={service.label} style={styles.serviceCard}>
              <MaterialCommunityIcons
                name={service.icon}
                size={26}
                color={colors.amber}
              />
              <Text style={styles.serviceLabel}>{service.label}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.quickRow}>
          <Button
            title="Share Location"
            variant="secondary"
            onPress={() => {}}
            style={styles.quickButton}
          />
          <Button
            title="Call Support"
            variant="secondary"
            onPress={() => {}}
            style={styles.quickButton}
          />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    height: DEVICE_HEIGHT * 0.09,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.sm,
  },
  menuIconHolder: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  headerAction: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
  },
  logo: {
    height: DEVICE_HEIGHT * 0.05,
    width: DEVICE_HEIGHT * 0.05,
    borderRadius: 12,
  },
  headerBlock: {
    marginTop: spacing.sm,
  },
  ctaCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  ctaIconWrap: {
    backgroundColor: colors.amber,
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  ctaTextWrap: {
    flex: 1,
  },
  ctaTitle: {
    color: colors.snow,
    fontFamily: typography.families.bodyBold,
    fontSize: typography.sizes.lg,
  },
  ctaSubtitle: {
    color: colors.mist,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  sectionRow: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.snow,
    fontFamily: typography.families.bodySemiBold,
    fontSize: typography.sizes.md,
  },
  sectionHint: {
    color: colors.fog,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
  },
  servicesGrid: {
    marginTop: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "48%",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  serviceLabel: {
    color: colors.snow,
    fontFamily: typography.families.bodyMedium,
    fontSize: typography.sizes.sm,
    marginTop: spacing.sm,
  },
  quickRow: {
    marginTop: spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickButton: {
    width: "48%",
  },
});
