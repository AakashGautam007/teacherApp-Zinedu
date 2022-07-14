import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { STYLES } from '../appStyles';


export const ActivityIndicatorComponent = (props) => {
    const { animating } = props
    return <ActivityIndicator
        // animating={loading}
        // style={[STYLES.loading]}
        style={[STYLES.loading, { zIndex: animating ? 1 : 0 }]}
        size='large'
        color={'#2B3789'}
        {...props}
    />
}