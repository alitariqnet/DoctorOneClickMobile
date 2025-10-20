// screens/NotificationsScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  Notifications: undefined;
};

type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
}

interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'system';
  title: string;
  message: string;
  time: string;
  date: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Success',
      message: 'You have successfully booked your appointment with Dr. Emily Walker.',
      time: '10:30 AM',
      date: 'TODAY',
      isRead: false,
      icon: 'checkmark-circle',
      iconColor: '#4CAF50'
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'You have successfully cancelled your appointment with Dr. David Patel.',
      time: '09:15 AM',
      date: 'TODAY',
      isRead: false,
      icon: 'close-circle',
      iconColor: '#FF6B6B'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Schedule Changed',
      message: 'You have successfully changed your appointment time with Dr. Michael Johnson.',
      time: 'Yesterday',
      date: 'YESTERDAY',
      isRead: true,
      icon: 'time',
      iconColor: '#FFA500'
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Sarah Wilson is tomorrow at 2:00 PM.',
      time: 'Yesterday',
      date: 'YESTERDAY',
      isRead: true,
      icon: 'notifications',
      iconColor: '#2A7DE1'
    },
    {
      id: '5',
      type: 'system',
      title: 'New Feature Available',
      message: 'Check out our new telemedicine feature for virtual consultations.',
      time: '2 days ago',
      date: 'DEC 10',
      isRead: true,
      icon: 'sparkles',
      iconColor: '#9C27B0'
    }
  ];

  const groupNotificationsByDate = () => {
    const grouped: { [key: string]: Notification[] } = {};
    notifications.forEach(notification => {
      if (!grouped[notification.date]) {
        grouped[notification.date] = [];
      }
      grouped[notification.date].push(notification);
    });
    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
      <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  const renderDateSection = (date: string, notifications: Notification[]) => (
    <View key={date} style={styles.dateSection}>
      <Text style={styles.dateHeader}>{date}</Text>
      {notifications.map(notification => (
        <View key={notification.id}>
          {renderNotificationItem({ item: notification })}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.screenTitle}>Notification</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.entries(groupedNotifications)}
        renderItem={({ item: [date, notifications] }) => renderDateSection(date, notifications)}
        keyExtractor={([date]) => date}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Mark All as Read Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    padding: 20,
    paddingBottom: 80,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    paddingLeft: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#f8f9fa',
    borderColor: '#2A7DE1',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A7DE1',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  markAllButton: {
    backgroundColor: '#2A7DE1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  markAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationsScreen;