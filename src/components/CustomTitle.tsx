import { View, Text, Platform } from 'react-native';
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
        marginTop: (Platform.OS === 'ios' ? top + 60 : top + 60),
        paddingBottom: 10
      }}>
        {title}
      </Text>
    </View>
  );
};
