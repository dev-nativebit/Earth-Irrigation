import React  from "react";
import {Box} from "@/component/Box";
import Carousel from 'react-native-reanimated-carousel';
import {Dimensions, Image, View} from "react-native";
import {DeviceHelper} from "@/helper";

export interface ImageSliderProps{
    images: string[]
}

export const  ImageSlider:React.FC<ImageSliderProps> = ({
    images
}:ImageSliderProps) => {
    const width = Dimensions.get('window').width;

  console.log(images);
    return(
        <Box>
            <Carousel
                loop
                width={width}
                height={width / 2.2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={4000}
                autoPlayInterval={5000}
                onSnapToItem={(index) => {}}
                renderItem={({ item,index }) =>{
                    return(
                    <View
                        style={{
                            justifyContent: 'center',
                            marginTop:20,
                        }}
                    >
                        <Image
                            source={{uri:item}}
                            style={{
                                height: width/3.39,
                                marginHorizontal:16,
                                borderRadius:10,
                                overflow:'hidden',
                                resizeMode:'contain',// Add background color if local image is used.
                            }}
                        />
                    </View>
                )}}
            />
        </Box>
    )
}
