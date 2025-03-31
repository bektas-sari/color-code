# Simple Color Picker 🎨  

**Tarayıcınızda kolayca renk seçmenizi ve HEX kodunu kopyalamanızı sağlayan minimalist bir Chrome eklentisi.**  

---

## 📌 Özellikler  
- **Fareyle renk seçme**: Hover yaparak renkleri görüntüleyin.  
- **Tek tıkla kopyalama**: Seçilen HEX kodu otomatik panoya kopyalanır.  
- **ESC ile çıkış**: Renk seçim modundan kolayca çıkın.  
- **Responsive tooltip**: Renk kodu, seçilen rengin kontrastına uygun renkte gösterilir.  

---

## 🛠 Kurulum  
1. **Kodu indirin**:  
   ```bash
   git clone https://github.com/bektas-sari/color-code.git
   ```
2. **Chrome'da yükleyin**:  
   - `chrome://extensions` adresini açın.  
   - **"Geliştirici modu"** aktifleştirin.  
   - **"Paketlenmemiş öğe yükle"** ile bu klasörü seçin.  

---

## 📂 Dosya Yapısı  
```plaintext
simple-color-picker/
├── manifest.json          # Eklenti manifest dosyası
├── background.js          # Ekran görüntüsü almak için arka plan scripti
├── content.js            # Renk seçici ana işlevselliği
├── popup.html            # Eklenti popup arayüzü
├── popup.js              # Popup'tan tetikleme scripti
├── styles.css            # Genel stiller
└── README.md             # Bu dosya
```

---

## 🔧 Teknik Detaylar  
- **Manifest V3** ile uyumlu.  
- `chrome.tabs.captureVisibleTab` API'si ile ekran görüntüsü alır.  
- Canvas üzerinde piksel analizi yaparak renk değerini hesaplar.  
- Dinamik tooltip kontrastı: `getContrastColor()` fonksiyonu ile okunabilirlik sağlanır.  

---

## 🌍 Dil Desteği  
- Popup arayüzü **Türkçe** olarak hazırlanmıştır.  
- `alert()` mesajları Türkçe'dir (Örn: *"İstediğin renge git, tıklayınca otomatik kopyalanır."*).  

---

## ⚠️ Bilinen Sorunlar  
- **Popup'tan tetikleme**: `popup.js` içindeki `startColorPicker` fonksiyonu, `content.js`'de IIFE içinde olduğundan tanımsız hatası verebilir.  
  **Çözüm**: `popup.js`'de `files: ['content.js']` kullanarak doğrudan enjekte edin.  

---

## 📜 Lisans  
MIT Lisansı ile özgürce kullanılabilir.  

--- 

**🛠️ Geliştirici Notu**:  
Eklentiyi test etmek için [ColorHexa](https://www.colorhexa.com/) gibi bir renk sitesini kullanabilirsiniz.  

**🎨 Renklerle oynamaya hazır mısınız?**