import React from 'react';
import { observer } from 'mobx-react-lite';
import ImageViewer from 'react-native-image-zoom-viewer';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DeviceHelper } from '@/helper';
import { goBack, StackParamList } from '@/navigation/AppNavigation';
import { Images } from '@/assets';
import {Box, Image, Pressable, Screen, StatusBarType} from "@/component";

export const ImagesScreen: React.FC = observer(() => {
    const route = useRoute<RouteProp<StackParamList, 'ImagesScreen'>>();
    const {ImageList, index } = route.params;

    const images: { url: string }[] | undefined = [];

    ImageList?.map((value) => {
       images.push({ url: value.uri ?? '' });
    });

    const handelOnBackPress = () => {
        goBack();
    };


    return (
        <Screen statusBarType={StatusBarType.Light} backgroundColor="white">
            <Box
                width={DeviceHelper.width()}
                justifyContent="center"
                flex={1}
                overflow="hidden"
            >
                <ImageViewer
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    imageUrls={images}
                    index={index}
                />
            </Box>

            <Pressable
                onPress={handelOnBackPress}
                height={40}
                marginStart="m"
                marginTop="m"
                alignItems="center"
                justifyContent="center"
                width={40}
                right={16}
                top={4}
                position="absolute"
            >
                <Image source={Images.closeIcon} width={20} height={20} tintColor={'#fff'} />
            </Pressable>
        </Screen>
    );
});
