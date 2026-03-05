# Mech-Finder 🚗🔧

An emergency mechanic finder mobile application built with React Native and Expo. This app helps travelers find nearby mechanics when they face car problems on the road.

## Problem Statement

When traveling, especially in unfamiliar areas, car breakdowns can be stressful and dangerous. Finding a reliable mechanic quickly is crucial, but often difficult when you're in an emergency situation.

## Solution

Mech-Finder connects travelers with nearby mechanics in real-time. Whether you're on a road trip, commuting, or traveling for business, this app ensures help is just a tap away.

## Features

### For Drivers (Users):
- **Emergency Request**: Quickly request a mechanic when your car breaks down
- **Location-Based Search**: Find mechanics near your current location using GPS
- **Real-Time Assistance**: Get immediate help when you need it most
- **Service Tracking**: Track the status of your service request
- **Contact Information**: Direct call/message to assigned mechanic
- **Service History**: View past service requests and mechanics

### For Mechanics:
- **Job Requests**: Receive nearby service requests in real-time
- **Location Services**: Navigate to customer's location
- **Job Management**: Accept or decline service requests
- **Earnings Tracking**: Track completed jobs and earnings
- **Profile Management**: Showcase skills and services offered

### App Features:
- 🗺️ **GPS Integration**: Precise location tracking
- 🔔 **Push Notifications**: Real-time alerts for new requests
- 📞 **Direct Communication**: Built-in calling and messaging
- ⭐ **Rating System**: Rate mechanics and provide feedback
- 💳 **Payment Integration**: Secure in-app payments
- 🗂️ **Service Categories**: Filter by service type (towing, repair, tire change, etc.)

## Tech Stack

- **Framework**: React Native
- **Platform**: Expo
- **Language**: JavaScript (100%)
- **Navigation**: React Navigation
- **Location Services**: Expo Location API
- **Maps**: React Native Maps
- **State Management**: React Context API / Redux
- **Backend**: Firebase (Auth, Realtime Database)
- **Push Notifications**: Expo Notifications
- **Storage**: AsyncStorage / SecureStore

## Prerequisites

Before running this project, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for emulators)
- Expo Go app on your mobile device (for testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Henryrsa/mech-finder.git
   cd mech-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Phone/Email)
   - Create Firestore database with appropriate rules
   - Enable Cloud Messaging for push notifications
   - Add Firebase configuration to your app

4. **Configure Maps API**
   - Get Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps SDK for Android/iOS
   - Add API key to app configuration

5. **Start the application**
   ```bash
   npx expo start
   ```
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on physical device

## Project Structure

```
mech-finder/
├── App.js                 # Main entry point
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── package.json          # Dependencies
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   │   ├── Auth/         # Authentication screens
│   │   ├── Driver/       # Driver-specific screens
│   │   ├── Mechanic/     # Mechanic-specific screens
│   │   └── Common/       # Shared screens
│   ├── navigation/       # Navigation configuration
│   ├── context/          # State management
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   └── assets/           # Images, fonts, etc.
└── README.md
```

## How It Works

### For Drivers:
1. **Sign Up/Login**: Create an account or login
2. **Request Service**: Select service type and describe the problem
3. **Location Access**: Allow location access for finding nearby mechanics
4. **Match**: App finds and dispatches nearest available mechanic
5. **Track**: Track mechanic's arrival in real-time
6. **Service**: Mechanic arrives and provides service
7. **Payment**: Pay securely through the app
8. **Rate**: Rate the mechanic and service

### For Mechanics:
1. **Register**: Sign up as a mechanic with verification
2. **Go Online**: Set status to available
3. **Receive Requests**: Get notified of nearby service requests
4. **Accept Job**: Review and accept service requests
5. **Navigate**: Use in-app navigation to reach customer
6. **Complete Service**: Provide service and mark as complete
7. **Get Paid**: Receive payment through the app
8. **Build Reputation**: Earn ratings and reviews

## Development Status

🚧 **This project is a functional MVP** 🚧

Current features implemented:
- ✅ User authentication
- ✅ Location services
- ✅ Basic service request flow
- ✅ Mechanic registration
- ✅ Real-time matching (basic)

## Recent Updates

- ✅ Modern premium UI refresh with reusable components and theme tokens
- ✅ Global typography updates and consistent spacing/radius system
- ✅ Firebase auth persistence via AsyncStorage
- ✅ Phone auth split into native/web entrypoints to avoid web bundling issues
- ✅ Metro config updated for Firebase .cjs module resolution

## Contact

**Henry Mukwevho**
- GitHub: [@Henryrsa](https://github.com/Henryrsa)
- Email: Mukwevhohenry@gmail.com
- Location: Thohoyandou, Limpopo, South Africa

---

**Never get stranded again. Help is just a tap away! 🚗🔧**
