import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Meet Doctors Online",
    description:
      "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
    image: require("../assets/images/doctor1.jpg"),
  },
  {
    id: "2",
    title: "Connect with Specialists",
    description:
      "Consult with experienced doctors across various specialties anytime, anywhere.",
    image: require("../assets/images/doctor2.jpg"),
  },
  {
    id: "3",
    title: "Thousands of Online Specialists",
    description:
      "Explore a vast array of medical experts ready to help you with your healthcare needs.",
    image: require("../assets/images/clinic1.jpg"),
  },
];

const OnboardingScreen: React.FC = () => {
  
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace("SignIn");
    }
  };

  const handleSkip = () => {
    navigation.replace("SignIn");
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageWrapper: {
    height: height * 0.75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  card: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    height: height * 0.45,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F1C2E",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0F1C2E",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 60,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#0F1C2E",
    width: 16,
  },
  skipButton: {
    marginBottom: 10,
  },
  skipText: {
    fontSize: 15,
    color: "#0F1C2E",
    fontWeight: "600",
  },
});
