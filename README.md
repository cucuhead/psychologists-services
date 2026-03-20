🧠 Psychologists.Services - Online Consultation Platform
Psychologists.Services, kullanıcıların profesyonel psikologları keşfetmesini, uzmanlık alanlarına göre filtrelemesini ve anlık randevu oluşturmasını sağlayan kapsamlı bir sağlık teknolojisi platformudur. Modern arayüzü ve güvenli altyapısıyla danışan ve uzman arasındaki köprüyü dijitalleştirir.

🚀 Öne Çıkan Özellikler
Kullanıcı Yetkilendirme: Firebase Auth ile güvenli kayıt olma, giriş yapma ve oturum yönetimi.

Dinamik Uzman Kataloğu: Firebase Realtime Database üzerinden çekilen, anlık güncellenen psikolog listesi.

Gelişmiş Filtreleme: İsim (A-Z, Z-A), saatlik ücret ve popülariteye (Rating) göre dinamik sıralama ve filtreleme seçenekleri.

Favori Sistemi: Sadece yetkili kullanıcıların erişebildiği, sayfa yenilense dahi korunan (LocalStorage) kişisel favori listesi.

Genişletilmiş Detay Kartları: "Read More" desteği ile uzman yorumlarına ve lisans detaylarına hızlı erişim.

Entegre Randevu Sistemi: react-hook-form ile doğrulanan, tarih ve saat seçimli profesyonel rezervasyon formu.

Kesintisiz UX: "Load More" (Daha Fazla Yükle) yapısıyla optimize edilmiş veri gösterimi ve özel "Loader" animasyonları.

🛠️ Kullanılan Teknolojiler
Core: React 18, Vite.

State Management: Redux Toolkit (Asenkron işlemler için createAsyncThunk).

Backend & Auth: Firebase (Realtime Database & Authentication).

Forms & Validation: React Hook Form, Yup.

Routing: React Router 6 (SPA mimarisi).

UI & Styling: CSS Modules (Pixel-perfect tasarım), React Hot Toast (Anlık bildirimler), React Datepicker.

Icons: Figma tasarımına sadık kalınarak optimize edilmiş SVG setleri.

🏗️ Kurulum ve Çalıştırma
Projeyi yerel makinenizde çalıştırmak için şu adımları izleyin:

Depoyu klonlayın:

Bash
git clone https://github.com/cucuhead/PsychologistsServices.git
Bağımlılıkları yükleyin:

Bash
npm install
Uygulamayı başlatın:

Bash
npm run dev
Tarayıcıda açın: http://localhost:5173

🧠 Teknik Kararlar ve Çözümler
Firebase Entegrasyonu: Veri trafiğini minimize etmek amacıyla psikolog koleksiyonu Firebase Realtime Database üzerinde yapılandırılmış; kullanıcı yetkilendirme işlemleri Firebase Auth ile asenkron olarak yönetilmiştir.

Pagination (Load More): Teknik şartnameye uygun olarak başlangıçta 3 kart gösterilmekte, her "Load More" tıklamasında state üzerinden +3 veri eklenerek performans odaklı bir listeleme sunulmaktadır.

Yetki Kontrolü (Auth Guard): Favorilere ekleme ve randevu oluşturma gibi kritik aksiyonlar sadece giriş yapmış kullanıcılara açılmıştır; yetkisiz giriş denemelerinde kullanıcı dostu modal ve bildirimler ile yönlendirme sağlanmıştır.

Data Transformation: Firebase'den gelen veriler, kullanıcıya sunulmadan önce useMemo içinde toFixed(2) gibi metodlarla formatlanarak fiyat ve rating tutarlılığı sağlanmıştır.

Form Validation: Randevu formunda tüm alanların doldurulması zorunlu tutulmuş; e-posta formatı ve telefon numarası doğrulamaları yapılarak veri güvenliği en üst seviyeye çıkarılmıştır.

Figma Sadakati: Tasarımdaki renk paleti, font ağırlıkları ve interaktif öğeler orijinal tasarıma sadık kalınarak, pixel-perfect anlayışıyla geliştirilmiştir.

Responsive Design: Uygulama, mobil cihazlardan (320px) geniş masaüstü ekranlara (1440px) kadar tüm çözünürlüklerde sorunsuz çalışacak şekilde optimize edilmiştir.

👤 Yazar
İsim: Burcu Budak

Rol: Fullstack Developer