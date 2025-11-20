diff --git a/README.md b/README.md
index 4f30c3290ede3908c51ec2a74e00a0fcdaf3b1ea..adeb9dc3e21ca395f8a356ad13d35a80573ae114 100644
--- a/README.md
+++ b/README.md
@@ -1,21 +1,49 @@
-# Desenyum AI Kılıf Tasarım Asistanı Web Sitesi
+# AI Shop Assistant SaaS
 
-Bu proje, Sen Desenyum Case mağazası için özel olarak tasarlanmış yapay zekâ destekli telefon kılıfı tasarım asistanının tanıtım web sitesidir. Site; hizmetin öne çıkan özelliklerini, çalışma sürecini, örnek tasarım stillerini, paket seçeneklerini ve iletişim formunu içerir.
+Çok mağazalı e-ticaret sitelerine embed kodu ile yapay zekâ satış danışmanı ekleyebileceğiniz SaaS iskeleti.
 
-## Özellikler
-- Anime, cartoon veya karikatür stilinde yüksek çözünürlüklü kılıf tasarımlarını vurgulayan modern bir tanıtım.
-- Duyarlı tasarım: Masaüstü, tablet ve mobil cihazlarda optimize edilmiş görünüm.
-- Form gönderimi sonrasında kullanıcı dostu bilgilendirme penceresi.
-- Navigasyon menüsü için mobil cihazlara uygun açılır menü.
+## Proje Yapısı
 
-## Kurulum
-Statik bir site olduğu için projeyi yerel ortamınızda görüntülemek üzere tek yapmanız gereken dosyaları bir tarayıcıda açmaktır:
+```
+backend/   → Node.js + Express API
+frontend/  → Next.js 14 App Router arayüzü
+embed/     → Mağaza sitelerine eklenen widget scripti
+```
+
+## Başlangıç
 
+### Backend
 ```bash
-# Proje dizinine gidin ve ana dosyayı açın
-cd desktop-tutorial
-xdg-open index.html  # macOS için: open index.html, Windows için: start index.html
+cd backend
+npm install
+npm run dev
 ```
+API varsayılan olarak `http://localhost:4000` adresinde çalışır.
+
+### Frontend
+```bash
+cd frontend
+npm install
+npm run dev
+```
+Next.js uygulaması `http://localhost:3000` adresinden erişilebilir.
+
+### Embed
+`embed/assistant.js` dosyasını bir CDN veya statik sunucuya yükleyin ve mağaza sitenize aşağıdaki gibi ekleyin:
+```html
+<script src="https://platform.com/assistant.js" data-shop="SHOP_ID" data-api="http://localhost:4000"></script>
+```
+
+## API Uç Noktaları
+- `POST /api/register`
+- `POST /api/login`
+- `POST /api/create-shop`
+- `GET /api/shop/:shopId`
+- `POST /api/update-shop`
+- `POST /api/chat`
+- `GET /api/embed-config/:shopId`
 
-## Lisans
-Bu proje örnek bir çalışma olup, Desenyum AI marka kimliği ile birlikte kullanılmak üzere tasarlanmıştır.
+## Sonraki Adımlar
+- Firebase Firestore bağlantısını gerçek verilerle kurma
+- Google AI Studio entegrasyonunu tamamlama
+- Dashboard ve embed widget tasarımını geliştirme
