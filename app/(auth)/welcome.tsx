import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  console.log("Image source:", onboarding[0].image); // Debug log

  return (
    <SafeAreaView className="flex-1 h-full items-center justify-center">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <View className="w-full h-[300px] bg-gray-100">
              <Image
                source={item.image}
                className="w-full h-[350px]"
                contentFit="contain"
                transition={0}
              />
            </View>
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
