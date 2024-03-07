import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/home/Home";
import CustomDrawer from "../screens/drawer/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
