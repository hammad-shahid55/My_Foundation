/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { Check, X, AlertTriangle, Info } from "lucide-react-native";

// Simple className concatenation utility
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface SnackbarProps {
  visible: boolean;
  message: string;
  type?: "error" | "success" | "warning" | "info";
  duration?: number;
  onDismiss: () => void;
}

export default function Snackbar({ visible, message, type = "error", duration = 3000, onDismiss }: SnackbarProps) {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(50);

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-red-500";
    }
  };

  const getIcon = () => {
    const iconSize = 20;
    const iconColor = "#FFFFFF";

    switch (type) {
      case "error":
        return <X size={iconSize} color={iconColor} />;
      case "success":
        return <Check size={iconSize} color={iconColor} />;
      case "warning":
        return <AlertTriangle size={iconSize} color={iconColor} />;
      case "info":
        return <Info size={iconSize} color={iconColor} />;
      default:
        return <X size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View className="absolute bottom-20 left-4 right-4 z-50">
      <Animated.View
        style={{
          opacity,
          transform: [{ translateY }],
        }}
        className={cn("rounded-lg px-4 py-3 shadow-lg flex-row items-center", getBackgroundColor())}
      >
        <View className="mr-3">{getIcon()}</View>
        <Text className="text-white font-medium flex-1">{message}</Text>
      </Animated.View>
    </View>
  );
}