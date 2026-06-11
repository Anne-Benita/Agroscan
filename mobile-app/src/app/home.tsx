import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Search,
  Home as HomeIcon,
  Camera as CameraIcon,
  User as UserIcon,
  BookOpen,
  Sprout,
  Compass,
  X,
} from "lucide-react-native";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/* =========================
   DISEASE DATA
   ========================= */
export const diseases = [
  {
    key: "apple_scab",
    title: "Apple Scab",
    image: require("../../assets/images/apple_scab.jpg"),
    cause: "Caused by Venturia inaequalis fungus in humid conditions.",
    prevention: [
      "Remove infected leaves and rake under trees.",
      "Apply fungicide early in the spring season.",
      "Prune branches regularly to improve air circulation.",
      "Avoid overhead watering; use drip systems instead.",
    ],
  },
  {
    key: "corn_common_rust",
    title: "Corn Common Rust",
    image: require("../../assets/images/corn_common_rust.jpg"),
    cause: "Caused by Puccinia sorghi fungus spread by wind.",
    prevention: [
      "Plant rust-resistant corn hybrid varieties.",
      "Use appropriate fungicide sprays if lesions appear.",
      "Quickly remove and destroy infected foliage.",
      "Avoid dense planting to facilitate faster leaf drying.",
    ],
  },
  {
    key: "grape_black_rot",
    title: "Grape Black Rot",
    image: require("../../assets/images/grape_black_rot.jpg"),
    cause: "Fungal disease caused by warm, wet conditions.",
    prevention: [
      "Prune grapevines regularly and keep them off the ground.",
      "Meticulously remove and discard infected fruits.",
      "Apply copper-based or organic protective spray.",
      "Clear fallen debris from the vine rows.",
    ],
  },
  {
    key: "pepper_bacterial_spot",
    title: "Pepper Bacterial Spot",
    image: require("../../assets/images/pepper_bacterial_spot.jpg"),
    cause: "Bacterial infection spread by water splash.",
    prevention: [
      "Only buy pathogen-free certified seeds.",
      "Avoid overhead irrigation to keep leaves dry.",
      "Apply protective copper-containing bactericides.",
      "Rotate crops out of nightshades for two years.",
    ],
  },
  {
    key: "potato_early_blight",
    title: "Potato Early Blight",
    image: require("../../assets/images/potato_early_blight.jpg"),
    cause: "Caused by Alternaria solani fungus.",
    prevention: [
      "Regularly remove and discard infected lower leaves.",
      "Use preventive organic or copper-based fungicide.",
      "Rotate potato crops with non-solanaceous species.",
      "Maintain adequate nitrogen and phosphorus levels.",
    ],
  },
  {
    key: "tomato_late_blight",
    title: "Tomato Late Blight",
    image: require("../../assets/images/tomato_late_blight.jpg"),
    cause: "Caused by Phytophthora infestans in wet weather.",
    prevention: [
      "Ensure foliage remains dry via drop-irrigation.",
      "Apply preventive fungicide spray during wet seasons.",
      "Uproot and destroy heavily infected tomato plants.",
      "Establish wide spacing between rows to enhance airflow.",
    ],
  },
];

/* =========================
   AGRICULTURAL TIPS DATA
   ========================= */
const weeklyTips = [
  {
    id: 1,
    title: "Understanding Soil pH",
    desc: "Learn how to use Agricultural Lime or Elemental Sulfur to fix sour or bitter soil.",
    icon: Sprout,
    tag: "Soil Health",
  },
  {
    id: 2,
    title: "Early Blight Prevention",
    desc: "Fungus spreads from mud splashes. Use straw mulch and lower pruning to prevent it.",
    icon: BookOpen,
    tag: "Disease Prevention",
  },
  {
    id: 3,
    title: "Crop Rotation Guide",
    desc: "Balance soil nutrients like a bank account. Rotate nitrogen spenders with legumes.",
    icon: Compass,
    tag: "Best Practices",
  },
  {
    id: 4,
    title: "Cameroon Planting Seasons",
    desc: "Learn which crops to plant during the Rainy (March-Oct) and Dry (Nov-Feb) seasons.",
    icon: Sprout,
    tag: "Seasonal Guide",
  },
];

const tipDetails: Record<number, {
  id: number;
  title: string;
  tag: string;
  gradient: string[];
  icon: any;
  overview: string;
  sections: { title: string; points: string[] }[];
  botanistTip: string;
}> = {
  1: {
    id: 1,
    title: "Understanding Soil pH",
    tag: "Soil Health",
    gradient: ["#0284C7", "#0369A1"],
    icon: Sprout,
    overview: "Soil pH measures how acidic (sour) or alkaline (bitter) your soil is, on a scale of 0 to 14 (pH 7.0 is neutral). If pH is outside a crop's preferred range, nutrient lockout occurs: the roots cannot absorb fertilizer even if you apply it.",
    sections: [
      {
        title: "Crop pH Preferences in this Project",
        points: [
          "Highly Acidic (pH 4.5 - 5.5): Blueberries require this soil. They turn yellow and die in neutral or alkaline soil.",
          "Slightly Acidic (pH 5.0 - 6.0): Potatoes, Strawberries, Apples, and Peaches grow best here. This acidity also prevents Potato Scab.",
          "Neutral (pH 6.0 - 7.0): Tomatoes, Peppers, Corn, Grapes, and Squash thrive in this range.",
          "Alkaline-Tolerant (pH 7.0 - 7.5): Oranges and Cherries can tolerate slightly alkaline soils."
        ]
      },
      {
        title: "How to Correct Your Soil pH",
        points: [
          "To Raise pH (if soil is too acidic/sour): Apply Agricultural Lime (Calcium Carbonate), a white limestone powder sold in agro-stores, to reduce acidity.",
          "To Lower pH (if soil is too alkaline/bitter): Apply Elemental Sulfur, a yellow powder sold in agro-stores, to safely increase acidity."
        ]
      }
    ],
    botanistTip: "Always run a proper soil test before amending. Adding too much Agricultural Lime or Elemental Sulfur can cause severe nutrient imbalances that take years to resolve."
  },
  2: {
    id: 2,
    title: "Early Blight Prevention",
    tag: "Disease Prevention",
    gradient: ["#EA580C", "#C2410C"],
    icon: BookOpen,
    overview: "Early Blight is a fungal disease (Alternaria solani) that makes dark, brown spots with concentric target-like rings on leaves. It attacks nightshade crops: Tomatoes, Potatoes, Eggplants (Garden Eggs), and Peppers.",
    sections: [
      {
        title: "How It Spreads",
        points: [
          "Fungal spores live in the dirt. When rain drops hit the ground, they splash mud containing these spores up onto the lower leaves of your crops."
        ]
      },
      {
        title: "Field Prevention Checklist",
        points: [
          "Mulching: Cover the soil around plants with straw or dry grass. This blocks rain from hitting the dirt, preventing mud splashes.",
          "Lower Pruning: Cut off all leaves closest to the ground (up to 12 inches high) to keep foliage out of the splash zone.",
          "Drip Irrigation: Water the soil directly at the roots. Avoid overhead watering, which wets leaves and spreads the fungus."
        ]
      }
    ],
    botanistTip: "Rake up and destroy (do not compost) all infected nightshade foliage at the end of the season. Composting does not always get hot enough to kill Alternaria spores."
  },
  3: {
    id: 3,
    title: "Crop Rotation Guide",
    tag: "Best Practices",
    gradient: ["#16A34A", "#15803D"],
    icon: Compass,
    overview: "Think of soil nutrients (like Nitrogen) as money in a bank account. Crop rotation balances these nutrients naturally and prevents pest build-ups.",
    sections: [
      {
        title: "Heavy Feeders (The Big Spenders)",
        points: [
          "Tomatoes, Peppers, Corn, Potatoes, and Squash need huge amounts of Nitrogen. Planting them in the same spot year after year drains the soil until it is barren."
        ]
      },
      {
        title: "Soil Replenishers (The Depositors)",
        points: [
          "Beans and Soybeans (legumes) draw Nitrogen from the air and store it in the soil through their roots. When they rot, they release this Nitrogen back for free."
        ]
      },
      {
        title: "The Rotation Sequence",
        points: [
          "Year 1: Plant Tomatoes or Corn (Big Spenders) to use the soil's Nitrogen.",
          "Year 2: Plant Beans or Soybeans (Depositors) to put the Nitrogen back.",
          "Year 3: Plant Squash (Moderate Spender) to utilize the refilled Nitrogen.",
          "Year 4: Restart the cycle with a new group."
        ]
      }
    ],
    botanistTip: "Keep a simple garden log. It is easy to forget where you planted heavy feeders last year, but rotation is key to avoiding pests and diseases."
  },
  4: {
    id: 4,
    title: "Cameroon Planting Seasons",
    tag: "Seasonal Guide",
    gradient: ["#EAB308", "#CA8A04"],
    icon: Sprout,
    overview: "Cameroon has two main seasons: the Rainy Season (typically March to October) and the Dry Season (typically November to February). Grow crops in their correct season for the best yields.",
    sections: [
      {
        title: "Rainy Season (March - October)",
        points: [
          "Crops to Plant: Corn (Maize), Soybeans, Squash (on raised mounds), Peppers, Orange & Peach seedlings, and Raspberries & Blueberries (in cool highland regions like Northwest/Southwest).",
          "Farming Tip: Moisture spreads fungal diseases like Early Blight and Powdery Mildew. Use straw mulch to cover soil and prevent rain-splash spores."
        ]
      },
      {
        title: "Dry Season (November - February)",
        points: [
          "Crops to Plant (Requires Irrigation): Tomatoes, Potatoes (in cool highlands like Santa/West), Strawberries (rain rots fruit easily), Grapes, Apples, and Cherries.",
          "Farming Tip: Dry, dusty weather encourages Spider Mites. Apply mulch around roots to keep soil damp and reduce irrigation water evaporation."
        ]
      }
    ],
    botanistTip: "Dry season cultivation requires watering/irrigation, but it has the major benefit of much lower fungal disease infection rates since there is no rain to splash spores."
  }
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedTip, setSelectedTip] = useState<any | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const scheme = (colorScheme === "dark" ? "dark" : "light") as keyof typeof Colors;
  const theme = Colors[scheme];

  // Filter diseases based on search query
  const filteredDiseases = diseases.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.backgroundElement }]}>
        <Text style={styles.appName}>AgroScan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* WELCOME BANNER */}
        <Text style={[styles.title, { color: theme.text }]}>
          Secure Crop Health,{"\n"}Diagnose Instantly
        </Text>

        {/* SEARCH BAR */}
        <View style={[styles.searchBox, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
          <Search size={20} color={theme.textSecondary} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search plant diseases..."
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>

        {/* WEEKLY TIPS SLIDER */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Weekly Advice</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsSlider}
        >
          {weeklyTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <Pressable 
                key={tip.id} 
                style={[styles.tipCard, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}
                onPress={() => setSelectedTip(tipDetails[tip.id])}
              >
                <View style={styles.tipHeader}>
                  <View style={styles.tipIconWrapper}>
                    <Icon size={18} color="#16A34A" />
                  </View>
                  <Text style={styles.tipTag}>{tip.tag}</Text>
                </View>
                <Text style={[styles.tipTitle, { color: theme.text }]}>{tip.title}</Text>
                <Text style={[styles.tipDesc, { color: theme.textSecondary }]}>{tip.desc}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* COMMON DISEASES */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 15 }]}>
          Common Diseases ({filteredDiseases.length})
        </Text>

        {filteredDiseases.length > 0 ? (
          <View style={styles.grid}>
            {filteredDiseases.map((d) => (
              <Pressable
                key={d.key}
                onPress={() =>
                  router.push({
                    pathname: "/result",
                    params: { diseaseKey: d.key },
                  })
                }
                style={[styles.diseaseCard, { backgroundColor: theme.backgroundElement }]}
              >
                <Image source={d.image} style={styles.image} />
                <View style={styles.diseaseContent}>
                  <Text style={[styles.diseaseText, { color: theme.text }]}>{d.title}</Text>
                  <Text style={styles.viewDetailsText}>View Guide →</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={[styles.noResultCard, { backgroundColor: theme.backgroundElement }]}>
            <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>
              No diseases found matching "{search}"
            </Text>
          </View>
        )}

      </ScrollView>

      {/* BOTTOM TAB NAV */}
      <View style={[styles.bottomNav, { backgroundColor: theme.backgroundElement, borderTopColor: theme.backgroundSelected }]}>
        
        <Pressable style={styles.navItem} onPress={() => router.push("/home")}>
          <HomeIcon color="#16A34A" size={24} />
          <Text style={[styles.navText, { color: "#16A34A", fontWeight: "bold" }]}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => router.push("/scan")}>
          <View style={styles.cameraNavBtn}>
            <CameraIcon color="#FFFFFF" size={24} />
          </View>
          <Text style={styles.navText}>Scan</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => router.push("/profile")}>
          <UserIcon color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Profile</Text>
        </Pressable>

      </View>

      {/* DETAILED ADVICE OVERLAY MODAL */}
      {selectedTip ? (
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.65)" }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundElement }]}>
            
            {/* Modal Header */}
            <View style={[styles.modalHeader, { backgroundColor: selectedTip.gradient[0] }]}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIconBg}>
                  {React.createElement(selectedTip.icon, { size: 22, color: "#FFFFFF" })}
                </View>
                <View>
                  <Text style={styles.modalHeaderTag}>{selectedTip.tag}</Text>
                  <Text style={styles.modalHeaderTitle}>{selectedTip.title}</Text>
                </View>
              </View>
              <Pressable style={styles.modalCloseIcon} onPress={() => setSelectedTip(null)}>
                <X color="#FFFFFF" size={20} />
              </Pressable>
            </View>

            {/* Modal Body */}
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalOverviewText, { color: theme.text }]}>
                {selectedTip.overview}
              </Text>

              {selectedTip.sections.map((section: any, sIdx: number) => (
                <View key={sIdx} style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: theme.text }]}>{section.title}</Text>
                  {section.points.map((point: string, pIdx: number) => (
                    <View key={pIdx} style={styles.modalPointRow}>
                      <View style={styles.modalPointBullet} />
                      <Text style={[styles.modalPointText, { color: theme.textSecondary }]}>{point}</Text>
                    </View>
                  ))}
                </View>
              ))}

              {/* Botanist Tip */}
              <View style={styles.botanistTipCard}>
                <Text style={styles.botanistTipLabel}>🌿 BOTANIST ADVICE</Text>
                <Text style={styles.botanistTipText}>{selectedTip.botanistTip}</Text>
              </View>
            </ScrollView>

            {/* Close Button */}
            <Pressable style={styles.modalCloseButton} onPress={() => setSelectedTip(null)}>
              <Text style={styles.modalCloseButtonText}>Close Guide</Text>
            </Pressable>

          </View>
        </View>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#16A34A", // Premium Green
    letterSpacing: 0.5,
  },
  growerBadge: {
    backgroundColor: "rgba(22, 163, 74, 0.1)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  growerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#16A34A",
  },
  scroll: {
    padding: 20,
    paddingBottom: 130,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
    borderRadius: 16,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.02)",
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  tipsSlider: {
    paddingRight: 20,
    paddingBottom: 5,
  },
  tipCard: {
    width: 260,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 16,
    marginRight: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.02)",
      },
    }),
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tipIconWrapper: {
    padding: 6,
    backgroundColor: "rgba(22, 163, 74, 0.1)",
    borderRadius: 8,
    marginRight: 8,
  },
  tipTag: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
    textTransform: "uppercase",
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  diseaseCard: {
    width: "48%",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.03)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  image: {
    width: "100%",
    height: 110,
  },
  diseaseContent: {
    padding: 12,
  },
  diseaseText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 6,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#16A34A",
  },
  noResultCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 95,
    paddingBottom: 25,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: "0px -3px 16px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraNavBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    ...Platform.select({
      ios: {
        shadowColor: "#16A34A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0px 4px 16px rgba(22, 163, 74, 0.3)",
      },
    }),
  },
  navText: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
    color: "#000000",
    fontWeight: "600",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 1000,
  },
  modalContent: {
    width: "100%",
    maxHeight: "85%",
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalHeaderIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderTag: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  modalHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 2,
  },
  modalCloseIcon: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  modalBody: {
    padding: 20,
  },
  modalOverviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalPointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingRight: 10,
  },
  modalPointBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
    marginTop: 7,
    marginRight: 10,
  },
  modalPointText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  botanistTipCard: {
    backgroundColor: "rgba(22, 163, 74, 0.06)",
    borderColor: "rgba(22, 163, 74, 0.15)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  botanistTipLabel: {
    color: "#16A34A",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  botanistTipText: {
    color: "#15803D",
    fontSize: 13,
    lineHeight: 18,
  },
  modalCloseButton: {
    backgroundColor: "#16A34A",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});