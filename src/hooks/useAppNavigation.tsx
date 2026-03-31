import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from 'src/types/navigation';

const useAppNavigation = (): AppNavigationProp => {
  return useNavigation<AppNavigationProp>();
};

export default useAppNavigation;
