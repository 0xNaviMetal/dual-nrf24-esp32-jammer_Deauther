#include "RF24.h"
#include <SPI.h>
#include "esp_bt.h"
#include "esp_wifi.h"

SPIClass *sp = nullptr;
SPIClass *hp = nullptr;
RF24 radio(16, 15, 16000000);   // HSPI — CE=16, CS=15, SPI speed 16MHz
RF24 radio1(22, 21, 16000000);  // VSPI — CE=22, CS=21, SPI speed 16MHz

// HSPI = SCK=14, MISO=12, MOSI=13, CS=15, CE=16
// VSPI = SCK=18, MISO=19, MOSI=23, CS=21, CE=22

int ch = 45;
int ch1 = 45;

void setup() {
  Serial.begin(115200);
  esp_bt_controller_deinit();
  esp_wifi_stop();
  esp_wifi_deinit();
  esp_wifi_disconnect();
  initHP();
  initSP();
}

void initHP() {
  hp = new SPIClass(HSPI);
  hp->begin();
  if (radio.begin(hp)) {
    Serial.println("HP Started !!!");
    radio.setAutoAck(false);
    radio.stopListening();
    radio.setRetries(0, 0);
    radio.setPALevel(RF24_PA_MAX, true);
    radio.setDataRate(RF24_2MBPS);
    radio.setCRCLength(RF24_CRC_DISABLED);
    radio.printPrettyDetails();
    radio.startConstCarrier(RF24_PA_MAX, ch);
  } else {
    Serial.println("HP couldn't start !!!");
  }
}

void initSP() {
  sp = new SPIClass(VSPI);
  sp->begin();
  if (radio1.begin(sp)) {
    Serial.println("SP Started !!!");
    radio1.setAutoAck(false);
    radio1.stopListening();
    radio1.setRetries(0, 0);
    radio1.setPALevel(RF24_PA_MAX, true);
    radio1.setDataRate(RF24_2MBPS);
    radio1.setCRCLength(RF24_CRC_DISABLED);
    radio1.printPrettyDetails();
    radio1.startConstCarrier(RF24_PA_MAX, ch1);
  } else {
    Serial.println("SP couldn't start !!!");
  }
}

void loop() {
  radio.setChannel(random(80));
  radio1.setChannel(random(80));
  delayMicroseconds(random(60));
}
