/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertConfig {
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
  onDismiss?: () => void;
}

interface AlertBoxProps extends AlertConfig {
  visible: boolean;
}

const AlertBox: React.FC<AlertBoxProps> = ({
  visible,
  type,
  title,
  message,
  duration = 4000,
  onDismiss,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(-100);
      progressAnim.setValue(0);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: Platform.OS === "ios" ? 50 : 10,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => handleDismiss(), duration);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  // 🟢 Icon names per alert type
  const getIconName = () => {
    switch (type) {
      case "success":
        return "checkmark-circle-outline";
      case "error":
        return "close-circle-outline";
      case "warning":
        return "warning-outline";
      case "info":
        return "information-circle-outline";
      default:
        return "alert-circle-outline";
    }
  };

  // 🎨 Colors + Gradients per type
  const getColors = () => {
    switch (type) {
      case "success":
        return {
          gradient: ["#4B4B4B", "#00C851"],
          iconBg: "#00C851",
          progress: "#00C851",
        };
      case "error":
        return {
          gradient: ["#4B4B4B", "#FF4444"],
          iconBg: "#FF4444",
          progress: "#FF4444",
        };
      case "warning":
        return {
          gradient: ["#4B4B4B", "#FFA84A"],
          iconBg: "#FFA84A",
          progress: "#FFA84A",
        };
      case "info":
        return {
          gradient: ["#4B4B4B", "#3B82F6"],
          iconBg: "#3B82F6",
          progress: "#3B82F6",
        };
      default:
        return {
          gradient: ["#4B4B4B", "#FFA84A"],
          iconBg: "#FFA84A",
          progress: "#FFA84A",
        };
    }
  };

  const { gradient, iconBg, progress } = getColors();
  const iconName = getIconName();

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        { transform: [{ translateY: slideAnim }], opacity: opacityAnim },
      ]}
      className="absolute top-0 right-2.5 left-2.5 z-[9999]"
    >
      <SafeAreaView />
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 12,
          padding: 14,
          borderWidth: 0.5,
          borderColor: "rgba(255,255,255,0.2)",
          shadowColor: "rgba(0,0,0,0.4)",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        {/* Progress Bar */}
        <Animated.View
          style={{
            width: progressWidth,
            backgroundColor: progress,
            height: 3,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}
        />

        {/* Alert Content */}
        <View className="flex-row items-start mt-1">
          {/* Icon Circle */}
          <View
            style={{
              backgroundColor: iconBg,
              borderRadius: 50,
              padding: 6,
              marginRight: 8,
            }}
          >
            <Ionicons name={iconName} size={22} color="#fff" />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: 14,
                marginBottom: 2,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                lineHeight: 18,
              }}
            >
              {message}
            </Text>
          </View>

          {/* Dismiss Button */}
          <TouchableOpacity onPress={handleDismiss} className="p-1">
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default AlertBox;