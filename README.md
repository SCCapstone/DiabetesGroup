# DiabetesGroup
DiabetesGroup is working on an app for Diabetes patients as well as their doctors and nutritionists.

### Testing Accounts
#### Patient
 Username/Email: jane@email.com
 Password: password
#### Nutritionist
 Username/Email: joe@email.com
 Password: password
#### Clinician
 Username/Email: doe@email.com
 Password: password

### Downloading the APK
The quickest way to run our app is downloading the most recent APK from https://github.com/SCCapstone/DiabetesGroup/releases and installing it on your android device. However, in order to view our progress in between APK releases, the following steps can be used to set up your environment and run the app. 

### Environment setup to run the app:
The following steps can also be found at https://facebook.github.io/react-native/docs/getting-started.html under the "Building Projects with Native Code" tab.

#### Download Node, Python2, JDK via Chocolately: 
 1. Open Administrator Command Prompt (right click Command Prompt icon and select "Run as Administrator").
 2. Run the command:
 ``` 
 @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin" 
 ```
 3. Close the command window.
 4. Open a new Administrator Command Prompt.
 5. Run the command:
 ```
 choco install -y nodejs.install python2 jdk8 
 ```
 6. Close the command window.

#### Download React Native CLI:
 1. Open a new Administrator Command Prompt.
 2. Run the command:
 ```
 npm install -g react-native-cli
 ```
 3. Close the command window.

#### Downloading Android Studio:
 1. Download Android Studio from https://developer.android.com/studio/index.html. 
 2. Follow the install wizard until prompted to select an installation type. Here choose "Custom" setup.
 3. Make sure the following boxes are selected when prompted:
  - Android SDK
  - Android SDK Platform 
  - Performance (Intel @ HAXM)
  - Android Virtual Device  
 4. Once the installation is finished, the "Welcome to Android Studio" screen will open. 
      Here click on "Configure" and select "SDK Manager".
 5. Under tab "SDK Platforms", make sure the following are checked under "Android 6.0 (Marshmallow)":
  - Google APIs
  - Android SDK Platform 23
  - Intel x86 Atom_64 System Image
  - Google APIs Intel x86 Atom_64 System Image
 6. Under the tab "SDK Tools" make sure "23.0.1" is checked under the "Android SDK Build-Tools". 
 7. Click "Apply" and continue through the installation wizard until pressing "Finish". 
 
 #### Android Studio Path Variables:
  1. Open your "Environment Variables" settings. Under "Edit User Variable" create a "New" user variable:
   - Variable Name: "ANDROID_HOME"
   - Variable Value: "c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk"
  2. Click "Okay" and close the window. 
  
  #### Setting Up Android Emulator in Android Studio (If you prefer to use USB debugging then skip this section.):
  1. From the "Welcome to Android Studio" screen, click "Start a New Android Studio Project" (Necessary for using the Android         emulators). 
  2. Follow the "Create New Project" wizard leaving everything default until finally pressing "Finish". 
  3. Once the project is finished building, go to "Tools" --> "Android" --> "AVD Manager."
  4. Click "Create New Virtual Device".
  5. Select the "x86 Images" tab and select "Marshmallow" with attributes:
   - API Level: 23
   - ABI: x86_64
   - Target: Android 6.0 (Google APIs) 
  6. Click "Next" and "Finish". 
  7. The "Android Virtual Device Manager" screen should appear with a green triangle button on the right. Click this button to start the emulator. 
  
  #### USB Debugging Setup
   1. On your android phone, go to "Settings" --> "About Phone" and then tap the "Build Number" at the bottom seven times. 
   2. By going back to "Settings", "Developer Options" should now be an option. 
   3. Enable "USB Debugging". 
   4. Plug your device into your computer via USB. 
   
   ### Running the App
  1. Clone the project from https://github.com/SCCapstone/DiabetesGroup
  2. Open the cloned directory using the node.js CLI 
  3. Open an Android emulator or connect an Android device via USB 
  4. In node.js run the following command:
  ```
  npm install
  ```
  5. After the previous command is done, run the following command:
  ```
  react-native run-android
  ```
  6. The app should now be open running on your emulator or USB device.
 
 
### To run Unit-Testing with Jest:
 Check Wiki Page for Dependencies on Unit-Testing
 1. Open the project directory using node.js CLI
 2. Navigate to the test directory using the following command:
 ```
 cd __tests__\test
 ```
 3. Now run the test using: 
 ```
 npm test jest.js
 ```
 
 

