import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { List, ListBullets, Wrench } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { LogoutModal } from '../components/LogoutModal';
import { useAuth } from '../contexts/auth';
import { OMContextProvider } from '../contexts/om-context';
import { Home } from '../screens/manutencao/screens/Home';
import { OpenedRequests } from '../screens/manutencao/screens/OpenedRequests';
import { RegisteredActivities } from '../screens/manutencao/screens/RegisteredActivities';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const OpenDrawerIcon = ({ navigation }: DrawerHeaderProps) => {
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={openDrawer} activeOpacity={0.7}>
      <List size={24} color="#FFFFFF" weight="bold" />
    </TouchableOpacity>
  );
};

function DrawerNavigator() {
  const { user } = useAuth();
  return (
    <Drawer.Navigator
      initialRouteName="OpenedRequests"
      screenOptions={{
        header(props) {
          return (
            <View className="items- flex h-28 w-full flex-row items-end justify-between bg-primary-500 px-5 pb-5">
              <View className="flex-row items-end space-x-4">
                <OpenDrawerIcon {...props} />
                <Text className="h-6 font-poppinsBold text-lg text-white">{`Olá, ${user?.user}`}</Text>
              </View>
              <LogoutModal />
            </View>
          );
        },
        drawerInactiveTintColor: '#fff',
        drawerActiveTintColor: '#1D2F99',
        drawerActiveBackgroundColor: '#ffffff',
        drawerStyle: {
          backgroundColor: '#1D2F99',
          width: '90%',
          padding: 12,
          paddingTop: 36,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins_700Bold',
          fontSize: 14,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingLeft: 12,
          paddingVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="OpenedRequests"
        component={OpenedRequests}
        options={{
          title: 'Solicitações Abertas',
          drawerIcon: ({ focused }) => (
            <Wrench
              size={24}
              color={focused ? '#1D2F99' : '#ffffff'}
              weight="bold"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="HomeManutencao"
        component={Home}
        options={{
          title: 'Ordens de Manutenção',
          drawerIcon: ({ focused }) => (
            <ListBullets
              size={24}
              color={focused ? '#1D2F99' : '#ffffff'}
              weight="bold"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export const ManutencaoRoutes: React.FC = () => (
  <OMContextProvider>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="HomeManutencao" component={Home} />
      <Stack.Screen name="OpenedRequests" component={OpenedRequests} />
      <Stack.Screen
        name="RegisteredActivities"
        component={RegisteredActivities}
      />
    </Stack.Navigator>
  </OMContextProvider>
);
