#include <AltSoftSerial.h>
#include "HX711.h"

// HX711
#define calibration_factor -20570 // 20 KG Kettlebell
#define DT 2 
#define SCK 3
HX711 scale(DT, SCK);

// BLE
// AltSoftSerial uses 
// TX:D8 
// RX:D9
AltSoftSerial BTserial; 

// MISC
char result[8]; // Buffer big enough for 7-character float

void setup() {
  Serial.print("Sketch:   ");   Serial.println(__FILE__);
  Serial.print("Uploaded: ");   Serial.println(__DATE__);
  initScale();
  initBLE();
}

void loop() {
  sendWeightToViaBLE(getWeight());
  delay(300);
}


// Scale stuff
void initScale() {   
  Serial.println("initScale starts");
  Serial.begin(9600);
  scale.set_scale(calibration_factor); //This value is obtained by using the SparkFun_HX711_Calibration sketch
  scale.tare(); //Assuming there is no weight on the scale at start up, reset the scale to 0
  Serial.println("initScale ends");
}

float getWeight() {
  Serial.println("getWeight starts and returns");
  return scale.get_units();  
}

// BLE stuff
void initBLE() {
  Serial.println("initBLE starts");
  BTserial.begin(9600);  
  Serial.println("initBLE ends");
}

void sendWeightToViaBLE(float weight) {
  Serial.println("getWeight starts and returns");   
  dtostrf(weight, 6, 2, result); // Leave room for too large numbers!
  BTserial.write(result);
}


