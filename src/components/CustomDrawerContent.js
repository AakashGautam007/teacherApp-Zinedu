
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import React ,{useContext,useEffect, useState} from 'react'
  import {AuthContext} from '../utils/context'

  function CustomDrawerContent(props) {


    const { logout } = useContext(AuthContext);

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
        label="Logout"
        onPress={() => logout()}
      />
      </DrawerContentScrollView>
    );
  }

  export default CustomDrawerContent