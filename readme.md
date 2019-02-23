# Honigraumwaage - honey supper scale
The pourpose of this project is to messure the weight of a honey supper(Honigraum) with an browser device( e.g. chrome on android ) through **Bluetooth Low Energy**. Thus it should be possible to easily collect data for breeding.

Technologies used in this project are:
 - For the scale:
    - a bathroom scale
    - HX711
    - Arduino
    - HM-10
 - For the 'UI-Device':
    - Chrome-Browser
    - BLE-device, e.g. an usb-stick for the desktop computer or just a smartphone
 - For the infrastructure:
    - Docker
    - nginx
    - chouchDB
 - programming frameworks:
    - Angular
    - Arduino 
 
## Structure of the project
This project consist of three parts:
### device
contains code the android device
### frontend
contains code for the web app
### deployment
contains code to run the webapp and couchdb