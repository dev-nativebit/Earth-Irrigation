import {fonts, theme} from '@/style';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Text} from '@/component/Text';

interface RadioButtonProps {
	selected: boolean;
	onPress: () => void;
	label:string
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress,label }) => {
	return (
		<TouchableOpacity onPress={onPress} >
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View
					style={{
						width: 20,
						height: 20,
						borderRadius: 10,
						borderWidth: 2,
						borderColor: selected
							? theme.colors.black
							: theme.colors.slateGray,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					{selected && (
						<View
							style={{
								width: 12,
								height: 12,
								borderRadius: 6,
								backgroundColor: theme.colors.primary,
							}}
						/>
					)}
				</View>
				<Text
					color={'black'}
					paddingStart={'s'}
					fontFamily={fonts.medium}
					fontSize={14}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default RadioButton;
