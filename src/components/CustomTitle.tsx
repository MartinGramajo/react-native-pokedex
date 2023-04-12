import { View, Text } from 'react-native';
import { styles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
}

export const CustomTitle = ({ title }: Props) => {

  const { top } = useSafeAreaInsets();


  return (
    <View>
      <Text style={{
        ...styles.title,
        ...styles.globalMargin,
        top: top + 20,
      }}>
        {title}
      </Text>
    </View>
  );
};
