
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'
import Swiper from 'react-native-swiper/src';
import { getBannersAutoApi } from '../../api/home-bannersAuto';
import { API_URL } from '../../Utils/constants'

const width = Dimensions.get('window').width
const height = 160

export default function Banner() {

    const [banners, setBanners] = useState(null)
    const [bannerActive, setBannerActive] = useState(0)
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const response = await getBannersAutoApi();
            setBanners(response)

        })()
    }, [])

    if (!banners) return null;

    const renderItem = ({ item }) => {
        
        return (
            <TouchableWithoutFeedback onPress={() => { goToProduct(item.product._id) }}>
                <Image style={styles.carousel} source={{ uri: `${item.banner.url}` }} />
            </TouchableWithoutFeedback>
        )

    }

    const goToProduct = (id) => {
        navigation.push('product', { idProduct: id })
    }

    return (

        <View style={styles.container}>

            <Carousel
                layout={"tinder"}
                data={banners}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => { setBannerActive(index) }}

            />

            <Pagination
                dotsLength={size(banners)}
                layoutCardOffset={9}
                activeDotIndex={bannerActive}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.6}
                containerStyle={styles.dotsContainer}
                dotStyle={styles.dot}


            />

        </View>

    )
}

const styles = StyleSheet.create({


    container: {
        position: 'relative'
    },
    carousel: {
        width,
        height
    },
    dotsContainer: {
        position: 'absolute',
        bottom: -20,
        width: '100%',
    },
    dot: {
        backgroundColor: '#fff',
    }

})