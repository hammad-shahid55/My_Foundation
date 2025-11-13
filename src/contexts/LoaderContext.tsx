// LoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import SkeletonLoader from '../components/globalComponents/SkeletonLoader';

type SkeletonVariant = 'dashboard' | 'list' | 'details' | 'default';

interface LoaderContextType {
  showLoader: (variant?: SkeletonVariant) => void;
  hideLoader: () => void;
  isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within LoaderProvider');
  }
  return context;
};

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<SkeletonVariant>('default');

  const showLoader = (loaderVariant: SkeletonVariant = 'default') => {
    setVariant(loaderVariant);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      {isLoading && (
        <Modal
          transparent={false}
          animationType="fade"
          visible={isLoading}
          statusBarTranslucent={true}
        >
          <View style={styles.loaderContainer}>
            <SkeletonLoader variant={variant} />
          </View>
        </Modal>
      )}
    </LoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#252628',
  },
});