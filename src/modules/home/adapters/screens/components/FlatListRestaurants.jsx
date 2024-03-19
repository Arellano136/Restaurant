import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { AirbnbRating } from 'react-native-elements'
export default function FlatListRestaurants(props) {
    const {image,title,description,rating}=props;
  return ( 
  <View style={styles.row}>
    <Image source={{ url: image }} style={styles.image} />
    <View style={{ flex: 1, flexDirection: "column", marginLeft: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{title}</Text>
            <AirbnbRating
                count={5}
                defaultRating={rating}
                size={12}
                isDisable={true}
                showRating={false}
            ></AirbnbRating>
        </View>
            <Text style={styles.description}>{description}</Text>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    row: {
        elevation: 4,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 8,
        marginBottom:6
    },
    image: {
        width: 124,
        height: 124,
        borderRadius: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold"
    }, description: {
        fontSize: 12
    }
})