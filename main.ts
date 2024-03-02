OLED.init(128, 64)
OLED.writeStringNewLine("        cekej!")
OLED.newLine()
OLED.writeStringNewLine("    pripojuji WiFi")
esp8266.init(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
esp8266.connectWiFi("papeto_2.4GHz", "Michaela_555555")
if (esp8266.isWifiConnected()) {
    OLED.clear()
    OLED.newLine()
    OLED.writeStringNewLine("        WiFi OK")
    esp8266.initInternetTime(1)
    basic.pause(2000)
    OLED.clear()
    if (esp8266.isInternetTimeInitialized()) {
        OLED.writeStringNewLine(" cas synchronizovan")
        basic.pause(2000)
        OLED.clear()
    }
}
esp8266.updateInternetTime()
let MIN = esp8266.getMinute()
OLED.newLine()
OLED.writeStringNewLine("     !GO FOR IT!")
OLED.newLine()
OLED.writeStringNewLine("      CICMUNDO")
basic.pause(3000)
OLED.clear()
basic.forever(function () {
    esp8266.updateInternetTime()
    RTC_DS1307.DateTime(
    esp8266.getYear(),
    esp8266.getMonth(),
    esp8266.getDay(),
    esp8266.getHour(),
    esp8266.getMinute(),
    esp8266.getSecond()
    )
    if (MIN != esp8266.getMinute()) {
        for (let index = 0; index < esp8266.getMinute(); index++) {
            music.play(music.tonePlayable(131, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            OLED.writeString("BIM BAM ")
            basic.pause(200)
        }
        OLED.clear()
    }
    OLED.writeString("         ")
    OLED.writeNum(esp8266.getYear())
    OLED.newLine()
    OLED.writeNum(esp8266.getMonth())
    OLED.writeString("   MESIC")
    OLED.newLine()
    OLED.writeNum(esp8266.getDay())
    OLED.writeString("   DEN")
    OLED.newLine()
    OLED.writeNum(esp8266.getHour())
    OLED.writeString("  HODIN")
    OLED.newLine()
    OLED.writeNum(esp8266.getMinute())
    OLED.writeString("  MINUT")
    OLED.newLine()
    MIN = esp8266.getMinute()
    OLED.writeNum(esp8266.getSecond())
    OLED.writeString("  SEKUND")
    basic.pause(500)
    OLED.clear()
})
