#include <AltSoftSerial.h>
#include "HX711.h"

/*
 This example code uses bogde's excellent library: https://github.com/bogde/HX711
 bogde's library is released under a GNU GENERAL PUBLIC LICENSE

 The HX711 does one thing well: read load cells. The breakout board is compatible with any wheat-stone bridge
 based load cell which should allow a user to measure everything from a few grams to tens of tons.
 Arduino pin 
 5V -> VCC
 GND -> GND

*/

// HX711
#define calibration_factor -20570 // 20 KG

#define DT  2 
#define SCK  3

HX711 scale(DT, SCK);

// BLE
AltSoftSerial BTserial; 
char c=' ';

void setup() {
  initScale();
  
    Serial.print("Sketch:   ");   Serial.println(__FILE__);
    Serial.print("Uploaded: ");   Serial.println(__DATE__);
    Serial.println(" ");
    BTserial.begin(9600);  
    Serial.println("BTserial started at 9600");
}

void loop() {
  Serial.print("Reading: ");
  Serial.print(getWeight(), 1);
  sendWeightToViaBLE(getWeight());
  Serial.print(" kg");
  Serial.println();
  delay(200);
}



void initScale() {   
  Serial.println("initScale starts");
  Serial.begin(9600);
  scale.set_scale(calibration_factor); //This value is obtained by using the SparkFun_HX711_Calibration sketch
  scale.tare(); //Assuming there is no weight on the scale at start up, reset the scale to 0
  Serial.println("initScale ends");
}

float getWeight() {
  Serial.println("getWeight starts and returns");
  return  scale.get_units();  
}

void sendWeightToViaBLE(float weight) {
  Serial.println("getWeight starts and returns");   
        c = weight; 
        BTserial.write(c);
}

