# FocusFlow – AI Destekli Görev ve Odaklanma Asistanı

Modern, karanlık tema odaklı bir üretkenlik uygulaması.  
**Kanban Board** + **Pomodoro Timer** + **Ambient Sesler** + **AI Performans Koçu**

## Özellikler

### Akıllı Görev Yönetimi (Kanban)
- Sürükle-bırak destekli 3 sütun: Yapılacaklar → Yapılıyor → Tamamlandı
- Öncelik etiketleri: Düşük / Orta / Yüksek
- Görev ekleme, düzenleme, silme ve tek tıkla tamamla
- Tüm veriler localStorage üzerinde kalıcı

### Gelişmiş Pomodoro Sayacı
- 25 dk odak + 5 dk mola
- Dairesel progress göstergesi
- Süre bitince tarayıcı bildirimi + hoş sesli uyarı
- Günlük / toplam oturum istatistikleri

### Ambient Player
- Lo-Fi müzik ve Yağmur sesi
- Ses seviyesi kontrolü

### AI Performans Koçu (Mock)
- Gün içindeki görev ve Pomodoro verilerine göre akıllı geri bildirimler
- Gerçek AI API’sine kolayca bağlanabilecek modüler yapı

## Teknoloji

- React 19 + TypeScript + Vite
- Tailwind CSS 4 + Glassmorphism
- Lucide React
- @dnd-kit (Drag & Drop)
- localStorage

## Kurulum

```bash
git clone https://github.com/yusufgunbay53-ux/FocusFlow-August-2026.git
cd FocusFlow-August-2026
npm install
npm run dev
```

Tarayıcıda http://localhost:5173 adresini aç.

## Proje Yapısı

```
src/
├── components/
│   ├── KanbanBoard.tsx
│   ├── TaskCard.tsx
│   ├── PomodoroTimer.tsx
│   ├── AmbientPlayer.tsx
│   └── AICoach.tsx
├── hooks/
│   └── useLocalStorage.ts
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

Tema renkleri: Neon Mavi #00d2ff • Gece Mavisi #0b111e
