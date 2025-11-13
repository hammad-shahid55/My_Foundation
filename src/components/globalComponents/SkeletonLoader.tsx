// SkeletonLoader.tsx   // It will be different for every screen 
import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface SkeletonLoaderProps {
  variant?: 'dashboard' | 'list' | 'details' | 'default';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'default' }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const SkeletonBox = ({ 
    width: boxWidth, 
    height, 
    style, 
    borderRadius = 8 
  }: { 
    width: number | string; 
    height: number; 
    style?: any; 
    borderRadius?: number;
  }) => (
    <View
      style={[
        {
          width: boxWidth,
          height,
          backgroundColor: '#1a1a1c',
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            width: '100%',
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            opacity: 0.3,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
          }}
        />
      </Animated.View>
    </View>
  );

  const renderDashboardSkeleton = () => (
    <>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <SkeletonBox width={32} height={32} borderRadius={8} />
        <View className="flex-row gap-3">
          <SkeletonBox width={32} height={32} borderRadius={16} />
          <SkeletonBox width={32} height={32} borderRadius={16} />
        </View>
      </View>

      {/* Company Dropdown */}
      <View className="px-4 mb-4">
        <SkeletonBox width={width - 32} height={48} borderRadius={12} />
      </View>

      {/* Live / Completed Cards */}
      <View className="flex-row justify-between px-4 mb-4">
        <SkeletonBox width={(width - 48) / 2} height={90} borderRadius={16} />
        <SkeletonBox width={(width - 48) / 2} height={90} borderRadius={16} />
      </View>

      {/* Performance Section Header */}
      <View className="px-4 mt-6 mb-3">
        <View className="flex-row justify-between items-center mb-3">
          <SkeletonBox width={120} height={20} borderRadius={6} />
          <SkeletonBox width={60} height={20} borderRadius={6} />
        </View>
        {/* Legend */}
        <View className="flex-row justify-between items-center">
          <SkeletonBox width={80} height={12} borderRadius={4} />
          <SkeletonBox width={80} height={12} borderRadius={4} />
          <SkeletonBox width={100} height={12} borderRadius={4} />
        </View>
      </View>

      {/* Performance Chart */}
      <View className="px-4 mb-4">
        <SkeletonBox width={width - 32} height={200} borderRadius={16} />
      </View>

      {/* Bottom Stats */}
      <View className="flex-row justify-between px-4 mb-4">
        <SkeletonBox width={(width - 56) / 3} height={70} borderRadius={12} />
        <SkeletonBox width={(width - 56) / 3} height={70} borderRadius={12} />
        <SkeletonBox width={(width - 56) / 3} height={70} borderRadius={12} />
      </View>

      {/* Agent Table Header */}
      <View className="px-4 mb-3">
        <SkeletonBox width={100} height={18} borderRadius={6} />
      </View>

      {/* Agent Table Rows */}
      <View className="px-4">
        {[...Array(3)].map((_, index) => (
          <View key={index} className="flex-row items-center mb-3">
            <SkeletonBox width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
            <View className="flex-1">
              <SkeletonBox width="70%" height={16} borderRadius={4} style={{ marginBottom: 6 }} />
              <SkeletonBox width="50%" height={12} borderRadius={4} />
            </View>
            <SkeletonBox width={50} height={24} borderRadius={6} />
          </View>
        ))}
      </View>
    </>
  );

  const renderListSkeleton = () => (
    <>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <SkeletonBox width={32} height={32} borderRadius={8} />
        <SkeletonBox width={150} height={24} borderRadius={6} />
        <SkeletonBox width={32} height={32} borderRadius={16} />
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <SkeletonBox width={width - 32} height={48} borderRadius={12} />
      </View>

      {/* List Items */}
      <View className="px-4">
        {[...Array(8)].map((_, index) => (
          <View
            key={index}
            className="mb-3 p-4"
            style={{ backgroundColor: '#1a1a1c', borderRadius: 12 }}
          >
            <View className="flex-row items-center justify-between mb-2">
              <SkeletonBox width="60%" height={18} borderRadius={4} />
              <SkeletonBox width={60} height={20} borderRadius={6} />
            </View>
            <SkeletonBox width="40%" height={14} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonBox width="80%" height={12} borderRadius={4} />
          </View>
        ))}
      </View>
    </>
  );

  const renderDetailsSkeleton = () => (
    <>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <SkeletonBox width={32} height={32} borderRadius={8} />
        <SkeletonBox width={120} height={24} borderRadius={6} />
        <SkeletonBox width={32} height={32} borderRadius={16} />
      </View>

      {/* Hero Section */}
      <View className="px-4 mb-6">
        <View className="items-center mb-4">
          <SkeletonBox width={120} height={120} borderRadius={60} style={{ marginBottom: 16 }} />
          <SkeletonBox width={200} height={24} borderRadius={6} style={{ marginBottom: 8 }} />
          <SkeletonBox width={150} height={16} borderRadius={4} />
        </View>
      </View>

      {/* Info Cards */}
      <View className="px-4 mb-4">
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            className="mb-3 p-4"
            style={{ backgroundColor: '#1a1a1c', borderRadius: 12 }}
          >
            <SkeletonBox width={100} height={14} borderRadius={4} style={{ marginBottom: 8 }} />
            <SkeletonBox width="60%" height={20} borderRadius={6} />
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between px-4 mt-4">
        <SkeletonBox width={(width - 48) / 2} height={48} borderRadius={12} />
        <SkeletonBox width={(width - 48) / 2} height={48} borderRadius={12} />
      </View>
    </>
  );

  const renderDefaultSkeleton = () => (
    <>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <SkeletonBox width={32} height={32} borderRadius={8} />
        <SkeletonBox width={150} height={24} borderRadius={6} />
        <SkeletonBox width={32} height={32} borderRadius={16} />
      </View>

      {/* Content */}
      <View className="px-4">
        <SkeletonBox width={width - 32} height={200} borderRadius={16} style={{ marginBottom: 16 }} />
        
        {[...Array(5)].map((_, index) => (
          <View key={index} className="mb-3">
            <SkeletonBox width="80%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
            <SkeletonBox width="60%" height={12} borderRadius={4} />
          </View>
        ))}
      </View>
    </>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dashboard':
        return renderDashboardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'details':
        return renderDetailsSkeleton();
      default:
        return renderDefaultSkeleton();
    }
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#252628' }}>
      {renderContent()}
    </View>
  );
};

export default SkeletonLoader;