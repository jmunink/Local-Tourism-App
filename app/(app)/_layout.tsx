import { Platform } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Tabs } from 'expo-router/tabs';
import { useColorScheme } from 'react-native';
import { Chrome as Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '@/constants/Colors';
import { wp, hp } from '@/utils/responsive';

const AnimatedIcon = ({ focused, children }) => {
  const animation = focused ? 'bounceIn' : undefined;
  return (
    <Animatable.View animation={animation} duration={500} useNativeDriver>
      {children}
    </Animatable.View>
  );
};

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const commonScreenOptions = {
    headerShown: false,
  };

  const commonRoutes = {
    home: {
      title: 'Home',
      icon: ({ color, focused }) => (
        <AnimatedIcon focused={focused}>
          <Home size={24} color={color} />
        </AnimatedIcon>
      ),
    },
    discover: {
      title: 'Discover',
      icon: ({ color, focused }) => (
        <AnimatedIcon focused={focused}>
          <Compass size={24} color={color} />
        </AnimatedIcon>
      ),
    },
    map: {
      title: 'Map',
      icon: ({ color, focused }) => (
        <AnimatedIcon focused={focused}>
          <Map size={24} color={color} />
        </AnimatedIcon>
      ),
    },
    favorites: {
      title: 'Favorites',
      icon: ({ color, focused }) => (
        <AnimatedIcon focused={focused}>
          <Bookmark size={24} color={color} />
        </AnimatedIcon>
      ),
    },
    profile: {
      title: 'Profile',
      icon: ({ color, focused }) => (
        <AnimatedIcon focused={focused}>
          <User size={24} color={color} />
        </AnimatedIcon>
      ),
    },
  };

  if (Platform.OS === 'ios') {
    return (
      <Tabs
        screenOptions={{
          ...commonScreenOptions,
          tabBarActiveTintColor: theme.tint,
          tabBarInactiveTintColor: theme.tabIconDefault,
          tabBarStyle: {
            position: 'absolute',
            left: wp(4),
            right: wp(4),
            bottom: hp(4),
            height: hp(8),
            paddingBottom: hp(1),
            paddingTop: hp(1),
            backgroundColor: theme.tabBarBackground,
            borderRadius: 20,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: -4 },
          },
          tabBarItemStyle: {
            paddingVertical: hp(0.5),
            height: hp(6),
          },
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: wp(3),
          },
        }}
      >
        {Object.entries(commonRoutes).map(([name, config]) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title: config.title,
              tabBarIcon: config.icon,
            }}
          />
        ))}
      </Tabs>
    );
  }

  return (
    <Drawer
      screenOptions={{
        ...commonScreenOptions,
        drawerActiveTintColor: theme.tint,
        drawerInactiveTintColor: theme.tabIconDefault,
        drawerStyle: {
          backgroundColor: theme.background,
          width: wp(70),
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp(4),
          marginLeft: -wp(4),
        },
      }}
    >
      {Object.entries(commonRoutes).map(([name, config]) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title: config.title,
            drawerIcon: config.icon,
          }}
        />
      ))}
    </Drawer>
  );
}