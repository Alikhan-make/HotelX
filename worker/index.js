import { assistantInput, guestDemoReply, hotelDemoTopic, hotelDemoReply } from "./demo-assistant.js";

const STYLES = "__HOTELX_STYLES__";
const APP_JS = "__HOTELX_APP_JS__";
const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#315efb"/><stop offset="1" stop-color="#7657e8"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><text x="32" y="40" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="24" font-weight="700">HX</text></svg>`;

const CORE_HOTELS = [
  {
    id: "aspan-city", name: "Aspan City Hotel", city: "Астана", region: "Астана", demo: true, location: "Есильский район · рядом с Ботаническим садом", address: "ул. Акмешит, 17, Астана",
    distance: 2.1, rating: 4.8, reviews: 624, price: 44000, match: 94, type: "City hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=84"],
    description: "Современный городской отель с тихими номерами, панорамным видом и быстрым доступом к деловому центру Астаны.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Фитнес-зал", "Ресторан", "Трансфер"],
    matchReason: "Лучшее соответствие: укладывается в бюджет, находится близко к центру и включает завтрак, парковку и фитнес-зал.",
    pros: ["8 минут до центра", "Завтрак включён", "Высокая оценка гостей"], cons: ["Нет бассейна"],
    rooms: [
      { id: "aspan-standard", type: "Standard King", guests: 2, bed: "1 кровать King", price: 44000, left: 5, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Рабочая зона", "Кондиционер", "Завтрак"] },
      { id: "aspan-deluxe", type: "Deluxe City View", guests: 2, bed: "1 кровать King", price: 52000, left: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=82", amenities: ["Панорамный вид", "Кофемашина", "Поздний выезд"] }
    ]
  },
  {
    id: "nomad-garden", name: "Nomad Garden Astana", city: "Астана", region: "Астана", demo: true, location: "Левый берег · квартал Expo", address: "пр. Ұлы Дала, 41, Астана",
    distance: 3.4, rating: 4.7, reviews: 418, price: 48000, match: 91, type: "Spa hotel",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=84"],
    description: "Уютный отель в природной стилистике с крытым бассейном, спа-зоной и семейными номерами.",
    amenities: ["Wi-Fi", "Бассейн", "Спа", "Завтрак", "Парковка", "Ресторан"],
    matchReason: "Сильный вариант для спокойного отдыха: соответствует бюджету, имеет бассейн и получает высокие оценки за сервис.",
    pros: ["Бассейн и спа", "Тихий район", "Подходит для семей"], cons: ["Немного дальше от центра"],
    rooms: [
      { id: "nomad-comfort", type: "Comfort Twin", guests: 2, bed: "2 односпальные кровати", price: 48000, left: 4, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Бассейн", "Кондиционер", "Завтрак"] },
      { id: "nomad-family", type: "Family Suite", guests: 4, bed: "King и диван", price: 68000, left: 2, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Мини-кухня", "Спа"] }
    ]
  },
  {
    id: "qala-grand", name: "Qala Grand", city: "Астана", region: "Астана", demo: true, location: "Деловой центр · Мәңгілік Ел", address: "пр. Мәңгілік Ел, 32, Астана",
    distance: 1.3, rating: 4.6, reviews: 792, price: 56000, match: 87, type: "Business hotel",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=84"],
    description: "Премиальный бизнес-отель рядом с ключевыми офисами и городскими достопримечательностями.",
    amenities: ["Wi-Fi", "Завтрак", "Фитнес-зал", "Переговорные", "Ресторан", "Консьерж"],
    matchReason: "Самое удобное расположение и сильная деловая инфраструктура, но цена немного выше указанного бюджета.",
    pros: ["Ближе всего к центру", "Для деловой поездки", "Сервис 24/7"], cons: ["Выше бюджета", "Платная парковка"],
    rooms: [
      { id: "qala-business", type: "Business Queen", guests: 2, bed: "1 кровать Queen", price: 56000, left: 6, image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=82", amenities: ["Рабочее место", "Кофемашина", "Завтрак"] },
      { id: "qala-executive", type: "Executive Suite", guests: 3, bed: "King и диван", price: 82000, left: 1, image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Панорамный вид", "Lounge"] }
    ]
  },
  {
    id: "saryarka-loft", name: "Saryarka Loft Hotel", city: "Астана", region: "Астана", demo: true, location: "Старый центр · набережная Есиля", address: "ул. Сарыарқа, 8, Астана",
    distance: 2.8, rating: 4.5, reviews: 356, price: 36000, match: 82, type: "Boutique hotel",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=84"],
    description: "Небольшой дизайн-отель с локальным характером, кафе и удобным доступом к исторической части города.",
    amenities: ["Wi-Fi", "Кафе", "Парковка", "Коворкинг", "Прачечная"],
    matchReason: "Самый выгодный вариант: заметно дешевле бюджета и рядом с набережной, но набор услуг меньше, чем у лидеров.",
    pros: ["Лучшая цена", "Атмосферный интерьер", "Рядом с набережной"], cons: ["Завтрак отдельно", "Нет фитнес-зала"],
    rooms: [
      { id: "saryarka-loft-room", type: "Loft Double", guests: 2, bed: "1 двуспальная кровать", price: 36000, left: 3, image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Рабочая зона", "Чайная станция"] },
      { id: "saryarka-studio", type: "Corner Studio", guests: 2, bed: "1 кровать Queen", price: 42000, left: 2, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=82", amenities: ["Мини-кухня", "Вид на город", "Поздний выезд"] }
    ]
  }
];

const KAZAKHSTAN_HOTELS = [
  {
    id: "koktobe-terrace", name: "Koktobe Terrace", city: "Алматы", region: "Алматы", demo: true, location: "Медеуский район · у подножия Кок-Тобе", address: "пр. Достык, 128, Алматы",
    distance: 2.6, rating: 4.9, reviews: 538, price: 52000, match: 96, type: "Design hotel",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=84"],
    description: "Камерный дизайн-отель с видом на горы, террасой и быстрым доступом к центру Алматы.",
    amenities: ["Wi-Fi", "Завтрак", "Терраса", "Фитнес-зал", "Ресторан", "Трансфер"],
    matchReason: "Высокий рейтинг, вид на горы и удобное расположение между центром и Медеу.",
    pros: ["Вид на Заилийский Алатау", "Завтрак включён", "Рядом с Кок-Тобе"], cons: ["Ограниченная парковка"],
    rooms: [
      { id: "koktobe-king", type: "Mountain King", guests: 2, bed: "1 кровать King", price: 52000, left: 4, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=82", amenities: ["Вид на горы", "Кофемашина", "Завтрак"] },
      { id: "koktobe-suite", type: "Terrace Suite", guests: 3, bed: "King и диван", price: 76000, left: 2, image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=82", amenities: ["Личная терраса", "Гостиная", "Панорамный вид"] }
    ]
  },
  {
    id: "zailiyskiy-resort", name: "Zailiyskiy Mountain Resort", city: "Алматы", region: "Алматы", demo: true, location: "Медеу · горный маршрут", address: "урочище Медеу, 31, Алматы",
    distance: 12.4, rating: 4.8, reviews: 312, price: 68000, match: 90, type: "Mountain resort",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=84"],
    description: "Горный курорт для спокойного отдыха с бассейном, спа и трансфером до Шымбулака.",
    amenities: ["Wi-Fi", "Бассейн", "Спа", "Завтрак", "Парковка", "Трансфер"],
    matchReason: "Лучший вариант для горного отдыха: бассейн, спа и близость к маршрутам Медеу.",
    pros: ["Горный воздух", "Бассейн и спа", "Трансфер до склонов"], cons: ["Дальше от центра"],
    rooms: [
      { id: "zailiyskiy-chalet", type: "Alpine Chalet", guests: 2, bed: "1 кровать King", price: 68000, left: 3, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=82", amenities: ["Балкон", "Спа", "Завтрак"] },
      { id: "zailiyskiy-family", type: "Family Lodge", guests: 4, bed: "King и 2 кровати", price: 92000, left: 1, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Мини-кухня", "Камин"] }
    ]
  },
  {
    id: "caspian-breeze", name: "Caspian Breeze Hotel", city: "Актау", region: "Мангистауская область", demo: true, location: "1-й микрорайон · набережная Каспия", address: "мкр. 1, 15, Актау",
    distance: 1.1, rating: 4.8, reviews: 446, price: 46000, match: 93, type: "Seaside hotel",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=84"],
    description: "Современный отель у Каспийского моря с открытым бассейном и видом на закат.",
    amenities: ["Wi-Fi", "Бассейн", "Завтрак", "Парковка", "Ресторан", "Пляж"],
    matchReason: "Сильное сочетание цены, расположения у моря и высокого рейтинга гостей.",
    pros: ["Первая линия", "Открытый бассейн", "Закаты над Каспием"], cons: ["Сезонная пляжная зона"],
    rooms: [
      { id: "caspian-sea-view", type: "Sea View King", guests: 2, bed: "1 кровать King", price: 46000, left: 5, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=82", amenities: ["Вид на море", "Балкон", "Завтрак"] },
      { id: "caspian-family", type: "Caspian Family Suite", guests: 4, bed: "King и диван", price: 70000, left: 2, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Балкон", "Мини-кухня"] }
    ]
  },
  {
    id: "atyrau-river", name: "Atyrau River House", city: "Атырау", region: "Атырауская область", demo: true, location: "Европейская сторона · набережная Урала", address: "ул. Сатпаева, 22, Атырау",
    distance: 1.7, rating: 4.6, reviews: 284, price: 49000, match: 89, type: "Business hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=84"],
    description: "Деловой отель на набережной Урала с переговорными и круглосуточным сервисом.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Переговорные", "Фитнес-зал", "Трансфер"],
    matchReason: "Практичный выбор для деловой поездки: центр, рабочая инфраструктура и трансфер.",
    pros: ["На набережной", "Переговорные", "Трансфер из аэропорта"], cons: ["Нет бассейна"],
    rooms: [
      { id: "atyrau-business", type: "Business Queen", guests: 2, bed: "1 кровать Queen", price: 49000, left: 6, image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=82", amenities: ["Рабочая зона", "Завтрак", "Кофемашина"] },
      { id: "atyrau-executive", type: "River Executive", guests: 2, bed: "1 кровать King", price: 69000, left: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=82", amenities: ["Вид на реку", "Lounge", "Поздний выезд"] }
    ]
  },
  {
    id: "turkistan-caravan", name: "Turkistan Caravan", city: "Туркестан", region: "Туркестанская область", demo: true, location: "Исторический центр · рядом с мавзолеем", address: "ул. Байбурт, 5, Туркестан",
    distance: 0.9, rating: 4.7, reviews: 391, price: 38000, match: 92, type: "Heritage hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=84"],
    description: "Отель в современной интерпретации караван-сарая рядом с главными памятниками Туркестана.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Ресторан", "Экскурсии", "Трансфер"],
    matchReason: "Аутентичная атмосфера, пешая доступность к историческому центру и доступная цена.",
    pros: ["Исторический центр", "Локальная кухня", "Организация экскурсий"], cons: ["Небольшие стандартные номера"],
    rooms: [
      { id: "turkistan-standard", type: "Caravan Double", guests: 2, bed: "1 двуспальная кровать", price: 38000, left: 5, image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=82", amenities: ["Завтрак", "Чайная станция", "Кондиционер"] },
      { id: "turkistan-courtyard", type: "Courtyard Suite", guests: 3, bed: "King и диван", price: 56000, left: 2, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=82", amenities: ["Вид во двор", "Гостиная", "Халаты"] }
    ]
  },
  {
    id: "burabay-pine", name: "Burabay Pine Retreat", city: "Бурабай", region: "Акмолинская область", demo: true, location: "Озеро Бурабай · сосновый бор", address: "ул. Кенесары, 19, Бурабай",
    distance: 2.2, rating: 4.9, reviews: 267, price: 61000, match: 95, type: "Nature resort",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=84"],
    description: "Загородный курорт в сосновом бору с озёрными маршрутами, спа и семейными домиками.",
    amenities: ["Wi-Fi", "Бассейн", "Спа", "Завтрак", "Парковка", "Прокат велосипедов"],
    matchReason: "Лучший природный отдых в каталоге: лес, озеро, спа и высокий рейтинг семейных гостей.",
    pros: ["Сосновый бор", "Озеро рядом", "Спа и бассейн"], cons: ["Высокий спрос по выходным"],
    rooms: [
      { id: "burabay-pine-room", type: "Pine View Room", guests: 2, bed: "1 кровать King", price: 61000, left: 3, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=82", amenities: ["Балкон", "Вид на лес", "Завтрак"] },
      { id: "burabay-cabin", type: "Family Cabin", guests: 5, bed: "2 спальни", price: 98000, left: 1, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=82", amenities: ["Терраса", "Мини-кухня", "Гостиная"] }
    ]
  },
  {
    id: "shymkent-sun", name: "Shymkent Sun Hotel", city: "Шымкент", region: "Шымкент", demo: true, location: "Центр · парк Абая", address: "пр. Тауке хана, 47, Шымкент",
    distance: 1.4, rating: 4.6, reviews: 503, price: 33000, match: 88, type: "City hotel",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=84"],
    description: "Светлый городской отель рядом с парками, ресторанами и основными улицами Шымкента.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Бассейн", "Кафе", "Кондиционер"],
    matchReason: "Выгодная цена, центральное расположение и открытый сезонный бассейн.",
    pros: ["Лучшая цена", "Центр города", "Сезонный бассейн"], cons: ["Небольшой фитнес-зал"],
    rooms: [
      { id: "shymkent-comfort", type: "Sunny Comfort", guests: 2, bed: "1 кровать Queen", price: 33000, left: 7, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=82", amenities: ["Завтрак", "Кондиционер", "Рабочая зона"] },
      { id: "shymkent-family", type: "Garden Family", guests: 4, bed: "Queen и диван", price: 49000, left: 3, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=82", amenities: ["Балкон", "Детская кровать", "Мини-холодильник"] }
    ]
  },
  {
    id: "oskemen-altai", name: "Altai View Oskemen", city: "Өскемен", region: "Восточно-Казахстанская область", demo: true, location: "Центр · набережная Иртыша", address: "ул. Казахстан, 66, Өскемен",
    distance: 1.8, rating: 4.7, reviews: 229, price: 41000, match: 90, type: "River hotel",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=84"],
    description: "Городской отель с видом на Иртыш и удобной отправной точкой для поездок по Восточному Казахстану.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Фитнес-зал", "Сауна", "Трансфер"],
    matchReason: "Комфортная база для города и поездок в Алтай: набережная, сауна и парковка.",
    pros: ["Вид на Иртыш", "Сауна", "Удобный выезд из города"], cons: ["Нет бассейна"],
    rooms: [
      { id: "oskemen-river", type: "Irtysh Queen", guests: 2, bed: "1 кровать Queen", price: 41000, left: 5, image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=82", amenities: ["Вид на реку", "Завтрак", "Рабочая зона"] },
      { id: "oskemen-altai-suite", type: "Altai Suite", guests: 3, bed: "King и диван", price: 62000, left: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Сауна", "Кофемашина"] }
    ]
  },
  {
    id: "karaganda-central", name: "Karaganda Central", city: "Караганда", region: "Карагандинская область", demo: true, location: "Новый город · Центральный парк", address: "пр. Бухар жырау, 38, Караганда",
    distance: 1.2, rating: 4.5, reviews: 341, price: 35000, match: 85, type: "Business hotel",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=84"],
    description: "Функциональный отель в центре Караганды для командировок и коротких городских поездок.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Переговорные", "Коворкинг", "Ресторан"],
    matchReason: "Доступный деловой вариант с коворкингом и центральным расположением.",
    pros: ["Центр города", "Коворкинг", "Бесплатная парковка"], cons: ["Базовый набор wellness"],
    rooms: [
      { id: "karaganda-standard", type: "Central Double", guests: 2, bed: "1 двуспальная кровать", price: 35000, left: 8, image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=82", amenities: ["Завтрак", "Рабочая зона", "Чайная станция"] },
      { id: "karaganda-business", type: "Business Studio", guests: 2, bed: "1 кровать King", price: 48000, left: 3, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=82", amenities: ["Мини-кухня", "Кофемашина", "Поздний выезд"] }
    ]
  },
  {
    id: "kostanay-steppe", name: "Kostanay Steppe Hotel", city: "Костанай", region: "Костанайская область", demo: true, location: "Центр · набережная Тобола", address: "ул. Аль-Фараби, 74, Костанай",
    distance: 1.6, rating: 4.5, reviews: 198, price: 32000, match: 84, type: "City hotel",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=84"],
    description: "Спокойный городской отель рядом с набережной Тобола и деловым центром Костаная.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Кафе", "Прачечная", "Трансфер"],
    matchReason: "Доступная цена, удобное расположение и всё необходимое для короткой поездки.",
    pros: ["Рядом с набережной", "Доступная цена", "Трансфер"], cons: ["Нет бассейна"],
    rooms: [
      { id: "kostanay-comfort", type: "Steppe Comfort", guests: 2, bed: "2 односпальные кровати", price: 32000, left: 6, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=82", amenities: ["Завтрак", "Рабочая зона", "Кондиционер"] },
      { id: "kostanay-studio", type: "Tobol Studio", guests: 3, bed: "Queen и диван", price: 45000, left: 2, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=82", amenities: ["Мини-кухня", "Гостиная", "Вид на город"] }
    ]
  }
];

const HOTELS = [...CORE_HOTELS, ...KAZAKHSTAN_HOTELS];

const CITY_ALIASES = [
  { city: "Астана", aliases: ["астан", "нур-султан", "нур султан", "нұр-сұлтан", "нұр сұлтан", "nur-sultan", "nur sultan", "astana"] },
  { city: "Алматы", aliases: ["алматы", "алма-ат", "almaty"] },
  { city: "Шымкент", aliases: ["шымкент", "shymkent"] },
  { city: "Актау", aliases: ["актау", "ақтау", "aktau"] },
  { city: "Атырау", aliases: ["атырау", "atyrau"] },
  { city: "Туркестан", aliases: ["туркестан", "түркістан", "turkistan"] },
  { city: "Бурабай", aliases: ["бурабай", "боровое", "щучинск", "burabay"] },
  { city: "Караганда", aliases: ["караган", "қараған", "karaganda"] },
  { city: "Өскемен", aliases: ["өскемен", "оскемен", "усть-каменогор", "ust-kamenogorsk"] },
  { city: "Костанай", aliases: ["костан", "қостан", "kostanay"] }
];

function canonicalCity(value) {
  const normalized = String(value || "").trim().toLowerCase().replace(/ё/g, "е");
  if (!normalized) return null;
  return CITY_ALIASES.find((item) => item.aliases.some((alias) => normalized.includes(alias)))?.city || null;
}

function amenitiesFromPrompt(prompt) {
  const value = String(prompt || "");
  return [
    ["Бассейн", /бассейн|pool/i, /(?:без|no|without)\s+(?:бассейн\w*|pool)/iu],
    ["Спа", /(?:^|[^\p{L}])(?:спа|spa)(?=$|[^\p{L}])/iu, /(?:без|no|without)\s+(?:спа|spa)/iu],
    ["Завтрак", /завтрак|breakfast/i, /(?:без|no|without)\s+(?:завтрак\w*|breakfast)/iu],
    ["Парковка", /парковк|parking/i, /(?:без|no|without)\s+(?:парковк\w*|parking)/iu],
    ["Фитнес-зал", /фитнес|тренаж[её]р|gym/i, /(?:без|no|without)\s+(?:фитнес\w*|тренаж[её]р\w*|gym)/iu]
  ].filter((item) => item[1].test(value) && !item[2].test(value)).map((item) => item[0]);
}

function budgetFromPrompt(prompt) {
  const match = String(prompt || "").match(/(?:до|budget|max(?:imum)?)[^0-9]{0,12}(\d{1,3}(?:[\s,.]\d{3})+|\d{4,7})(?!\d)/i);
  const value = Number((match?.[1] || "").replace(/\D/g, ""));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

const DASHBOARD = {
  hotel: { id: "aspan-city", name: "Aspan City Hotel" },
  kpis: { occupancy: 78, revenue: 28400000, adr: 42100, revpar: 32838, reservations: 164, forecast: 84 },
  occupancySeries: [62, 66, 64, 71, 73, 76, 78, 82, 81, 86, 88, 84], revenueSeries: [1.6, 1.9, 1.7, 2.2, 2.4, 2.1, 2.8, 3.0, 2.7, 3.3, 3.1, 3.6],
  insight: { title: "Спрос на выходные вырос на 18%", text: "Темп бронирований на 7–8 ноября выше обычного, а доступность Standard King быстро сокращается." },
  recommendation: { id: "price-weekend", room: "Standard King", currentPrice: 40000, recommendedPrice: 44000, change: 10, impact: 200000, demand: "HIGH", from: "7 ноя", to: "8 ноя" }
};

const DEMO_FORECAST = { days7: [78, 81, 88, 92, 86, 74, 71], days30: [68, 71, 73, 70, 76, 78, 82, 79, 84, 86, 81, 77], days90: [65, 69, 72, 74, 78, 81, 83, 79, 76, 80, 84, 87], confidence: 92, expectedRevenue: 31400000, cancellations: 6.2 };
function demoPricing(standardPrice = 40000) {
  return [{ id: "standard", name: "Standard King", current: standardPrice, recommended: 44000, occupancy: 86, demand: "HIGH", impact: 200000 }, { id: "deluxe", name: "Deluxe City View", current: 52000, recommended: 54000, occupancy: 74, demand: "MEDIUM", impact: 96000 }, { id: "suite", name: "Executive Suite", current: 78000, recommended: 76000, occupancy: 51, demand: "LOW", impact: 65000 }];
}

const RESERVATIONS = [
  { id: "HX-260184", guest: "Дана К.", room: "512 · Deluxe City View", checkIn: "7 ноя", checkOut: "10 ноя", price: 156000, status: "CONFIRMED", channel: "HotelX" },
  { id: "HX-260185", guest: "Тимур С.", room: "304 · Standard King", checkIn: "6 ноя", checkOut: "8 ноя", price: 88000, status: "CHECKED_IN", channel: "Direct" },
  { id: "HX-260186", guest: "Алина М.", room: "410 · Standard King", checkIn: "8 ноя", checkOut: "11 ноя", price: 132000, status: "CONFIRMED", channel: "HotelX" },
  { id: "HX-260187", guest: "Ержан А.", room: "218 · Standard King", checkIn: "9 ноя", checkOut: "10 ноя", price: 44000, status: "PENDING", channel: "Corporate" },
  { id: "HX-260188", guest: "Мария Л.", room: "602 · Deluxe City View", checkIn: "12 ноя", checkOut: "15 ноя", price: 156000, status: "CONFIRMED", channel: "Booking Partner" },
  { id: "HX-260179", guest: "Арман Т.", room: "316 · Standard King", checkIn: "5 ноя", checkOut: "7 ноя", price: 80000, status: "CANCELLED", channel: "HotelX" }
];

const ROOMS = [
  { number: "218", type: "Standard King", status: "Available", price: 44000, occupancy: "—" },
  { number: "304", type: "Standard King", status: "Occupied", price: 44000, occupancy: "Тимур С." },
  { number: "316", type: "Standard King", status: "Cleaning", price: 44000, occupancy: "—" },
  { number: "410", type: "Standard King", status: "Available", price: 44000, occupancy: "—" },
  { number: "512", type: "Deluxe City View", status: "Occupied", price: 52000, occupancy: "Дана К." },
  { number: "602", type: "Deluxe City View", status: "Maintenance", price: 52000, occupancy: "—" }
];

const VERIFICATIONS = [
  { id: "VR-1028", applicant: "Айдана Н.", email: "aidana.n@example.com", phone: "+7 700 000 00 01", hotel: "Aurora Park Hotel", address: "Астана, улица Демо, 12", website: "aurora-park.example", rooms: 86, country: "Казахстан", submitted: "5 ноя, 14:24", status: "PENDING", documents: ["Удостоверение личности", "Бизнес-регистрация", "Право управления"] },
  { id: "VR-1027", applicant: "Марат Б.", email: "marat.b@example.com", phone: "+7 700 000 00 02", hotel: "Steppe Residence", address: "Астана, проспект Үлгі, 24", website: "steppe-residence.example", rooms: 54, country: "Казахстан", submitted: "4 ноя, 19:10", status: "IN_REVIEW", documents: ["Удостоверение личности", "Бизнес-регистрация", "Право управления"] },
  { id: "VR-1024", applicant: "София Р.", email: "sofia.r@example.com", phone: "+7 700 000 00 03", hotel: "Northline Boutique", address: "Астана, переулок Макет, 7", website: "northline.example", rooms: 31, country: "Казахстан", submitted: "2 ноя, 16:45", status: "MORE_INFO_REQUIRED", documents: ["Удостоверение личности", "Бизнес-регистрация"], note: "Нужен документ, подтверждающий право управления отелем." }
];

const PLATFORM_CONTEXTS = [
  { id: "personal", label: "Личный", subtitle: "Гость", role: "GUEST", home: "/app/explore" },
  { id: "business", label: "Aspan City Hotel", subtitle: "Владелец", role: "HOTEL_OWNER", hotelId: "aspan-city", permissions: ["ALL"], home: "/hotel/dashboard" },
  { id: "platform", label: "HotelX Platform", subtitle: "Суперадмин", role: "SUPER_ADMIN", home: "/admin/dashboard" }
];

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders } });
}

function safeUser(request, url, env) {
  const siteUserId = request.headers.get("oai-authenticated-user-id");
  const previewUserId = ["localhost", "127.0.0.1"].includes(url.hostname) ? request.headers.get("x-hotelx-preview-user") : null;
  const userId = siteUserId || previewUserId;
  if (!userId) return null;
  const encodedName = request.headers.get("oai-authenticated-user-full-name");
  const isEncoded = request.headers.get("oai-authenticated-user-full-name-encoding") === "percent-encoded-utf-8";
  let name = "Создатель HotelX";
  if (encodedName) { try { name = isEncoded ? decodeURIComponent(encodedName) : encodedName; } catch { name = encodedName; } }
  const email = request.headers.get("oai-authenticated-user-email") || "visitor@hotelx.demo";
  const configuredOwner = String(env?.HOTELX_PLATFORM_OWNER_EMAIL || "").trim().toLowerCase();
  const isPlatformOwner = Boolean(configuredOwner) && email.trim().toLowerCase() === configuredOwner;
  return { id: userId, email, name, isPlatformOwner, contexts: isPlatformOwner ? PLATFORM_CONTEXTS : [PLATFORM_CONTEXTS[0]] };
}

const ROLE_PERMISSIONS = {
  HOTEL_OWNER: ["ALL"],
  HOTEL_MANAGER: ["VIEW_DASHBOARD", "VIEW_ANALYTICS", "VIEW_RESERVATIONS", "EDIT_RESERVATIONS", "VIEW_ROOMS", "EDIT_ROOMS", "VIEW_PRICING", "EDIT_PRICING", "VIEW_REPORTS"],
  HOTEL_STAFF: ["VIEW_RESERVATIONS", "EDIT_RESERVATIONS", "VIEW_ROOMS"]
};

async function hydrateActorAccess(actor, env) {
  if (!env?.DB) return actor;
  await env.DB.prepare("INSERT INTO users (id, email, name, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET email = excluded.email, name = excluded.name, updated_at = CURRENT_TIMESTAMP")
    .bind(actor.id, actor.email, actor.name).run();
  await env.DB.prepare("INSERT OR IGNORE INTO hotels (id, name, verification_status) VALUES ('aspan-city', 'Aspan City Hotel', 'VERIFIED')").run();

  if (actor.isPlatformOwner) {
    await env.DB.batch([
      env.DB.prepare("INSERT OR IGNORE INTO platform_admins (user_id) VALUES (?)").bind(actor.id),
      env.DB.prepare("INSERT INTO hotels (id, owner_user_id, name, verification_status) VALUES ('aspan-city', ?, 'Aspan City Hotel', 'VERIFIED') ON CONFLICT(id) DO UPDATE SET owner_user_id = excluded.owner_user_id, verification_status = 'VERIFIED'").bind(actor.id),
      env.DB.prepare("INSERT INTO hotel_memberships (user_id, hotel_id, role, status) VALUES (?, 'aspan-city', 'HOTEL_OWNER', 'ACTIVE') ON CONFLICT(user_id, hotel_id) DO UPDATE SET role = 'HOTEL_OWNER', status = 'ACTIVE'").bind(actor.id)
    ]);
  }

  const [admin, membership, permissionRows] = await Promise.all([
    env.DB.prepare("SELECT 1 AS allowed FROM platform_admins WHERE user_id = ?").bind(actor.id).first(),
    env.DB.prepare("SELECT hm.hotel_id, hm.role, hm.status, h.name, h.verification_status FROM hotel_memberships hm JOIN hotels h ON h.id = hm.hotel_id WHERE hm.user_id = ? AND hm.status = 'ACTIVE' AND h.verification_status = 'VERIFIED' ORDER BY hm.created_at ASC LIMIT 1").bind(actor.id).first(),
    env.DB.prepare("SELECT permission FROM membership_permissions WHERE user_id = ? AND hotel_id = (SELECT hm.hotel_id FROM hotel_memberships hm JOIN hotels h ON h.id = hm.hotel_id WHERE hm.user_id = ? AND hm.status = 'ACTIVE' AND h.verification_status = 'VERIFIED' ORDER BY hm.created_at ASC LIMIT 1) AND allowed = 1").bind(actor.id, actor.id).all()
  ]);

  actor.contexts = [PLATFORM_CONTEXTS[0]];
  if (membership) {
    const defaults = ROLE_PERMISSIONS[membership.role] || [];
    const custom = (permissionRows.results || []).map((row) => row.permission);
    const permissions = [...new Set([...defaults, ...custom])];
    actor.contexts.push({ id: "business", label: membership.name, subtitle: membership.role === "HOTEL_OWNER" ? "Владелец" : membership.role === "HOTEL_MANAGER" ? "Управляющий" : "Персонал", role: membership.role, hotelId: membership.hotel_id, permissions, home: membership.role === "HOTEL_STAFF" ? "/hotel/reservations" : "/hotel/dashboard" });
  }
  if (admin) actor.contexts.push(PLATFORM_CONTEXTS[2]);
  return actor;
}

function selectedContext(request, actor, required, permission) {
  const selectedId = request.headers.get("x-hotelx-context") || "personal";
  const context = actor.contexts.find((item) => item.id === selectedId);
  if (!context) return { error: json({ error: "CONTEXT_NOT_ALLOWED", message: "Этот контекст не назначен пользователю." }, 403) };
  if (required && context.id !== required) return { error: json({ error: "PERMISSION_DENIED", message: "Недостаточно прав для этого действия." }, 403) };
  if (permission && context.id === "business" && !context.permissions?.includes("ALL") && !context.permissions?.includes(permission)) return { error: json({ error: "PERMISSION_DENIED", message: "Для действия требуется разрешение " + permission + "." }, 403) };
  return { context };
}

function protectMutation(request, url) {
  if (!["POST", "PATCH", "PUT", "DELETE"].includes(request.method)) return null;
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({ error: "ORIGIN_REJECTED", message: "Запрос отклонён политикой безопасности." }, 403);
  return null;
}

function publicHotel(hotel) {
  return { id: hotel.id, name: hotel.name, city: hotel.city, region: hotel.region, demo: hotel.demo === true, location: hotel.location, address: hotel.address, distance: hotel.distance, rating: hotel.rating, reviews: hotel.reviews, price: hotel.price, match: hotel.match, type: hotel.type, image: hotel.image, gallery: hotel.gallery, description: hotel.description, amenities: hotel.amenities, matchReason: hotel.matchReason, pros: hotel.pros, cons: hotel.cons, rooms: hotel.rooms };
}

async function readBody(request) { try { return await request.json(); } catch { return {}; } }
function apiError(status, error, message) { return json({ error, message }, status); }

function generatedId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

function parseCalendarDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
  if (!match) return null;
  const year = Number(match[1]); const month = Number(match[2]); const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return timestamp;
}

function nightlyDates(start, nights) {
  return Array.from({ length: nights }, (_, index) => new Date(start + index * 86400000).toISOString().slice(0, 10));
}

async function seedVerificationRows(env) {
  if (!env?.DB) return;
  const statements = VERIFICATIONS.map((item) => env.DB.prepare("INSERT OR IGNORE INTO verification_requests (id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status, submitted_at, review_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(item.id, item.hotel, item.applicant, item.email, item.phone, item.address, item.website, item.rooms, item.country, item.status, new Date("2026-11-0" + (item.id === "VR-1028" ? "5" : item.id === "VR-1027" ? "4" : "2") + "T09:00:00Z").toISOString(), item.note || null));
  await env.DB.batch(statements);
  if (env.BUCKET) {
    const existing = await env.DB.prepare("SELECT count(*) AS count FROM verification_documents WHERE verification_id LIKE 'VR-10%'").first();
    if (Number(existing?.count || 0) < 8) {
      const labelKinds = { "Удостоверение личности": "identity", "Бизнес-регистрация": "business", "Право управления": "ownership" };
      const documentStatements = [];
      for (const item of VERIFICATIONS) {
        documentStatements.push(env.DB.prepare("INSERT OR IGNORE INTO users (id, email, name) VALUES (?, ?, ?)")
          .bind(actorPlaceholderForSeed(item.id), item.email, item.applicant));
        for (const label of item.documents) {
          const kind = labelKinds[label];
          if (!kind) continue;
          const objectKey = `verification/demo/${item.id}/${kind}.pdf`;
          await env.BUCKET.put(objectKey, new TextEncoder().encode(`HotelX demo document\n${item.id}\n${label}`), { httpMetadata: { contentType: "application/pdf" } });
          documentStatements.push(env.DB.prepare("INSERT OR IGNORE INTO verification_documents (verification_id, kind, object_key, content_type, size_bytes, uploaded_by) VALUES (?, ?, ?, 'application/pdf', ?, ?)")
            .bind(item.id, kind, objectKey, 64, actorPlaceholderForSeed(item.id)));
        }
      }
      if (documentStatements.length) await env.DB.batch(documentStatements);
    }
  }
}

function actorPlaceholderForSeed(id) {
  return `demo-applicant-${id.toLowerCase()}`;
}

async function readVerificationRows(env) {
  if (!env?.DB) return VERIFICATIONS;
  await seedVerificationRows(env);
  const [result, documentResult] = await Promise.all([
    env.DB.prepare("SELECT id, user_id, hotel_id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status, submitted_at, review_note FROM verification_requests ORDER BY submitted_at DESC").all(),
    env.DB.prepare("SELECT verification_id, kind FROM verification_documents ORDER BY uploaded_at ASC").all()
  ]);
  const documentLabels = { identity: "Удостоверение личности", business: "Бизнес-регистрация", ownership: "Право управления" };
  const documentsByRequest = new Map();
  for (const document of documentResult.results || []) {
    const existing = documentsByRequest.get(document.verification_id) || [];
    existing.push(documentLabels[document.kind] || document.kind);
    documentsByRequest.set(document.verification_id, existing);
  }
  return (result.results || []).map((row) => ({
    id: row.id, userId: row.user_id, hotelId: row.hotel_id, applicant: row.applicant_name, email: row.email, phone: row.phone,
    hotel: row.hotel_name, address: row.address, website: row.website, rooms: row.rooms_count, country: row.country,
    submitted: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Almaty" }).format(new Date(row.submitted_at)),
    status: row.status, documents: documentsByRequest.get(row.id) || [],
    note: row.review_note || undefined
  }));
}

async function handleApi(request, url, env) {
  void env;
  let actor = safeUser(request, url, env);
  if (!actor) return apiError(401, "AUTH_REQUIRED", "Войдите через ChatGPT, чтобы продолжить.");
  if (!env?.DB && env?.HOTELX_LOCAL_PREVIEW !== "1") return apiError(503, "STORAGE_UNAVAILABLE", "Хранилище временно недоступно. Изменения не выполнялись.");
  const mutationError = protectMutation(request, url);
  if (mutationError) return mutationError;
  actor = await hydrateActorAccess(actor, env);
  const path = url.pathname;

  if (request.method === "GET" && path === "/api/me") {
    const verification = env?.DB ? await env.DB.prepare("SELECT id, status, hotel_name, review_note FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first() : null;
    return json({ user: { id: actor.id, name: actor.name, email: actor.email }, contexts: actor.contexts, defaultContext: "personal", verification, privatePrototype: true });
  }

  if (request.method === "GET" && path === "/api/guest/hotels") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const requestedBudget = Number(url.searchParams.get("budget") || 0);
    const budget = Number.isFinite(requestedBudget) && requestedBudget > 0 ? requestedBudget : 0;
    const amenity = (url.searchParams.get("amenity") || "").toLowerCase();
    const city = canonicalCity(url.searchParams.get("city"));
    const hotels = HOTELS
      .filter((hotel) => (!city || hotel.city === city) && (!budget || hotel.price <= budget) && (!amenity || hotel.amenities.some((item) => item.toLowerCase().includes(amenity))))
      .sort((left, right) => right.match - left.match || left.price - right.price);
    return json({ hotels: hotels.map(publicHotel), query: { city: city || "Казахстан", checkIn: "2026-11-07", checkOut: "2026-11-10", guests: 2 }, catalogScope: "demo" });
  }

  if (request.method === "POST" && path === "/api/guest/assistant") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const input = assistantInput(await readBody(request));
    if (!input) return apiError(400, "INVALID_ASSISTANT_INPUT", "Введите сообщение до 2000 символов. История — до 40 сообщений.");
    const result = guestDemoReply({ ...input, catalog: HOTELS, parsers: { canonicalCity, budgetFromPrompt, amenitiesFromPrompt } });
    return json({ ...result, hotels: result.hotels.map(publicHotel), cards: result.cards.map(publicHotel) });
  }

  const assistantMatch = path.match(/^\/api\/hotels\/([a-z0-9-]+)\/assistant$/);
  if (request.method === "POST" && assistantMatch) {
    const auth = selectedContext(request, actor, "business", "VIEW_DASHBOARD"); if (auth.error) return auth.error;
    if (assistantMatch[1] !== auth.context.hotelId) return apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
    const input = assistantInput(await readBody(request));
    if (!input) return apiError(400, "INVALID_ASSISTANT_INPUT", "Введите сообщение до 2000 символов. История — до 40 сообщений.");
    const topic = hotelDemoTopic(input.prompt, input.history);
    const permission = { pricing: "VIEW_PRICING", forecast: "VIEW_ANALYTICS", metrics: "VIEW_DASHBOARD", help: "VIEW_DASHBOARD" }[topic];
    const topicAuth = selectedContext(request, actor, "business", permission); if (topicAuth.error) return topicAuth.error;
    let price = 40000;
    if (topic === "pricing" && env?.DB) {
      const override = await env.DB.prepare("SELECT price FROM price_overrides WHERE hotel_id = ? AND room_type = 'Standard King' AND from_date = '2026-11-07' AND to_date = '2026-11-08'").bind(auth.context.hotelId).first();
      if (override) price = override.price;
    }
    return json(hotelDemoReply({ ...input, topic, dashboard: DASHBOARD, forecast: DEMO_FORECAST, pricing: demoPricing(price) }));
  }

  if (request.method === "POST" && path === "/api/guest/ai-search") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const prompt = String(body.prompt || "");
    const budget = budgetFromPrompt(prompt);
    const city = canonicalCity(prompt);
    const amenities = amenitiesFromPrompt(prompt);
    const hotels = HOTELS
      .filter((hotel) => (!city || hotel.city === city) && (!budget || hotel.price <= budget) && amenities.every((item) => hotel.amenities.includes(item)))
      .sort((left, right) => right.match - left.match || left.price - right.price);
    const scope = city || "по всему Казахстану";
    return json({
      parsed: { city: city || "Казахстан", nights: 3, guests: 2, budget: budget || null, location: city ? "в выбранном городе" : "по всей стране", preferences: amenities, amenities },
      hotels: hotels.map(publicHotel),
      catalogScope: "demo",
      summary: `Нашли ${hotels.length} вариантов ${scope}. ${hotels[0] ? `Лучшее совпадение — ${hotels[0].name}.` : "Попробуйте изменить условия."}`
    });
  }

  const guestHotelMatch = path.match(/^\/api\/guest\/hotels\/([a-z0-9-]+)$/);
  if (request.method === "GET" && guestHotelMatch) {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const hotel = HOTELS.find((item) => item.id === guestHotelMatch[1]); return hotel ? json({ hotel: publicHotel(hotel) }) : apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
  }

  if (request.method === "POST" && path === "/api/guest/compare") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const hotels = (Array.isArray(body.ids) ? body.ids : []).map((id) => HOTELS.find((hotel) => hotel.id === id)).filter(Boolean).slice(0, 3);
    if (hotels.length < 2) return apiError(400, "COMPARE_MINIMUM", "Выберите минимум два отеля.");
    const best = [...hotels].sort((a, b) => b.match - a.match)[0]; return json({ hotels: hotels.map(publicHotel), recommendation: `${best.name} — лучший общий выбор: AI Match ${best.match}%, сильное расположение и соответствие вашему бюджету.` });
  }

  if (request.method === "POST" && path === "/api/bookings") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const hotel = HOTELS.find((item) => item.id === body.hotelId); const room = hotel?.rooms.find((item) => item.id === body.roomId);
    if (!hotel || !room) return apiError(404, "ROOM_NOT_FOUND", "Номер больше не доступен.");
    const guests = Math.max(1, Math.min(6, Number(body.guests) || 2));
    if (guests > room.guests) return apiError(400, "ROOM_CAPACITY_EXCEEDED", "Выбранный номер не рассчитан на такое количество гостей.");
    const checkIn = String(body.checkIn || "2026-11-07");
    const checkOut = String(body.checkOut || "2026-11-10");
    const start = parseCalendarDate(checkIn); const end = parseCalendarDate(checkOut);
    if (start === null || end === null) return apiError(400, "INVALID_DATES", "Передайте существующие даты в формате YYYY-MM-DD.");
    const nights = Math.round((end - start) / 86400000);
    if (!Number.isFinite(nights) || nights < 1 || nights > 30) return apiError(400, "INVALID_DATES", "Период должен составлять от 1 до 30 ночей.");
    const total = room.price * nights;
    const dateLabel = (date) => new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
    const booking = { id: generatedId("HX"), hotel: hotel.name, hotelId: hotel.id, room: room.type, roomId: room.id, checkIn: dateLabel(checkIn), checkOut: dateLabel(checkOut), guests, nights, total, status: "CONFIRMED" };
    if (env?.DB) {
      try {
        const inventoryStatements = nightlyDates(start, nights).map((stayDate) => env.DB.prepare("INSERT INTO room_inventory (hotel_id, room_id, stay_date, capacity, booked) VALUES (?, ?, ?, ?, 1) ON CONFLICT(hotel_id, room_id, stay_date) DO UPDATE SET booked = booked + 1")
          .bind(hotel.id, room.id, stayDate, room.left));
        await env.DB.batch([
          env.DB.prepare("INSERT OR IGNORE INTO hotels (id, name, verification_status) VALUES (?, ?, ?)").bind(hotel.id, hotel.name, hotel.demo ? "DEMO" : "VERIFIED"),
          ...inventoryStatements,
          env.DB.prepare("INSERT INTO bookings (id, guest_user_id, hotel_id, room_id, room_type, check_in, check_out, guests, nights, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')")
            .bind(booking.id, actor.id, hotel.id, room.id, room.type, checkIn, checkOut, guests, nights, total),
          env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, 'BOOKING_CREATED', 'booking', ?, ?)")
            .bind(generatedId("AUD"), actor.id, hotel.id, booking.id, JSON.stringify({ roomId: room.id, total, checkIn, checkOut }))
        ]);
      } catch (error) {
        if (String(error?.message || error).includes("ROOM_SOLD_OUT")) return apiError(409, "ROOM_SOLD_OUT", "Все номера этой категории уже забронированы на выбранные даты.");
        throw error;
      }
    }
    return json({ booking }, 201);
  }

  if (request.method === "GET" && path === "/api/trips") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    let persisted = [];
    if (env?.DB) {
      const result = await env.DB.prepare("SELECT b.id, h.name AS hotel, b.check_in, b.check_out, b.room_type, b.status, b.total FROM bookings b JOIN hotels h ON h.id = b.hotel_id WHERE b.guest_user_id = ? ORDER BY b.created_at DESC LIMIT 20").bind(actor.id).all();
      persisted = (result.results || []).map((row) => ({ id: row.id, hotel: row.hotel, checkIn: row.check_in, checkOut: row.check_out, room: row.room_type, status: row.status, total: row.total }));
    }
    return json({ trips: persisted });
  }

  if (request.method === "POST" && path === "/api/applications") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); if (!body.hotelName || !body.phone) return apiError(400, "VALIDATION_ERROR", "Заполните название отеля и телефон.");
    const application = { id: generatedId("VR"), status: "PENDING", hotelName: body.hotelName };
    if (env?.DB) {
      const hotelId = "hotel-" + crypto.randomUUID().slice(0, 12);
      await env.DB.batch([
        env.DB.prepare("INSERT INTO hotels (id, name, verification_status) VALUES (?, ?, 'PENDING')").bind(hotelId, body.hotelName),
        env.DB.prepare("INSERT INTO verification_requests (id, user_id, hotel_id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')")
          .bind(application.id, actor.id, hotelId, body.hotelName, actor.name, actor.email, body.phone, body.address || "", body.website || "", Number(body.rooms) || 0, body.country || "Казахстан"),
        env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id) VALUES (?, ?, ?, 'VERIFICATION_SUBMITTED', 'verification_request', ?)")
          .bind(generatedId("AUD"), actor.id, hotelId, application.id)
      ]);
    }
    return json({ application, message: "Заявка принята. Доступ к управлению появится только после проверки." }, 201);
  }

  if (request.method === "GET" && path === "/api/verifications/me") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const application = await env.DB.prepare("SELECT id, hotel_id, hotel_name, status, submitted_at, review_note FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first();
    if (!application) return json({ application: null, documents: [] });
    const documents = await env.DB.prepare("SELECT kind, content_type, size_bytes, uploaded_at FROM verification_documents WHERE verification_id = ? ORDER BY uploaded_at ASC").bind(application.id).all();
    return json({ application: { id: application.id, hotelId: application.hotel_id, hotelName: application.hotel_name, status: application.status, submittedAt: application.submitted_at, reviewNote: application.review_note }, documents: documents.results || [] });
  }

  if (request.method === "POST" && path === "/api/verifications/me/resubmit") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const application = await env.DB.prepare("SELECT id, status FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first();
    if (!application) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    if (!["REJECTED", "MORE_INFO_REQUIRED"].includes(application.status)) return apiError(409, "INVALID_VERIFICATION_TRANSITION", "Повторная отправка доступна только после отказа или запроса дополнительных данных.");
    const results = await env.DB.batch([
      env.DB.prepare("UPDATE verification_requests SET status = 'PENDING', review_note = NULL, submitted_at = CURRENT_TIMESTAMP WHERE id = ? AND status IN ('REJECTED', 'MORE_INFO_REQUIRED')").bind(application.id),
      env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, action, resource_type, resource_id) VALUES (?, ?, 'VERIFICATION_RESUBMITTED', 'verification_request', ?)").bind(generatedId("AUD"), actor.id, application.id)
    ]);
    if (Number(results[0]?.meta?.changes || 0) !== 1) return apiError(409, "VERIFICATION_CONFLICT", "Статус заявки уже изменился. Обновите страницу.");
    return json({ id: application.id, status: "PENDING" });
  }

  const documentUploadMatch = path.match(/^\/api\/verifications\/([^/]+)\/documents\/(identity|business|ownership)$/);
  if (request.method === "POST" && documentUploadMatch) {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    if (!env?.BUCKET) return apiError(503, "FILE_STORAGE_UNAVAILABLE", "Хранилище документов временно недоступно.");
    const application = await env.DB.prepare("SELECT id FROM verification_requests WHERE id = ? AND user_id = ?").bind(documentUploadMatch[1], actor.id).first();
    if (!application) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    const contentType = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(contentType)) return apiError(415, "UNSUPPORTED_DOCUMENT", "Загрузите PDF, JPG, PNG или WEBP.");
    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (declaredSize > 5 * 1024 * 1024) return apiError(413, "DOCUMENT_TOO_LARGE", "Размер документа не должен превышать 5 МБ.");
    const bytes = await request.arrayBuffer();
    if (!bytes.byteLength || bytes.byteLength > 5 * 1024 * 1024) return apiError(bytes.byteLength ? 413 : 400, bytes.byteLength ? "DOCUMENT_TOO_LARGE" : "EMPTY_DOCUMENT", bytes.byteLength ? "Размер документа не должен превышать 5 МБ." : "Файл пуст.");
    const kind = documentUploadMatch[2];
    const objectKey = `verification/${actor.id}/${application.id}/${kind}-${crypto.randomUUID()}`;
    await env.BUCKET.put(objectKey, bytes, { httpMetadata: { contentType } });
    await env.DB.batch([
      env.DB.prepare("INSERT INTO verification_documents (verification_id, kind, object_key, content_type, size_bytes, uploaded_by, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(verification_id, kind) DO UPDATE SET object_key = excluded.object_key, content_type = excluded.content_type, size_bytes = excluded.size_bytes, uploaded_by = excluded.uploaded_by, uploaded_at = CURRENT_TIMESTAMP")
        .bind(application.id, kind, objectKey, contentType, bytes.byteLength, actor.id),
      env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, 'VERIFICATION_DOCUMENT_UPLOADED', 'verification_document', ?, ?)")
        .bind(generatedId("AUD"), actor.id, application.id + ":" + kind, JSON.stringify({ contentType, size: bytes.byteLength }))
    ]);
    return json({ verificationId: application.id, kind, uploaded: true, size: bytes.byteLength }, 201);
  }

  const adminDocumentMatch = path.match(/^\/api\/admin\/verifications\/([^/]+)\/documents\/(identity|business|ownership)$/);
  if (request.method === "GET" && adminDocumentMatch) {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error;
    if (!env?.BUCKET) return apiError(503, "FILE_STORAGE_UNAVAILABLE", "Хранилище документов временно недоступно.");
    const document = await env.DB.prepare("SELECT object_key, content_type FROM verification_documents WHERE verification_id = ? AND kind = ?").bind(adminDocumentMatch[1], adminDocumentMatch[2]).first();
    if (!document) return apiError(404, "DOCUMENT_NOT_FOUND", "Документ не найден.");
    const object = await env.BUCKET.get(document.object_key);
    if (!object) return apiError(404, "DOCUMENT_NOT_FOUND", "Документ не найден.");
    return new Response(object.body, { headers: { "content-type": document.content_type, "content-disposition": `attachment; filename="${adminDocumentMatch[2]}-document"`, "cache-control": "private, no-store", "x-content-type-options": "nosniff" } });
  }

  const hotelBaseMatch = path.match(/^\/api\/hotels\/([a-z0-9-]+)\/(dashboard|reservations|rooms|pricing|forecast|recommendations)$/);
  if (request.method === "GET" && hotelBaseMatch) {
    const permissionBySection = { dashboard: "VIEW_DASHBOARD", reservations: "VIEW_RESERVATIONS", rooms: "VIEW_ROOMS", pricing: "VIEW_PRICING", forecast: "VIEW_ANALYTICS", recommendations: "VIEW_PRICING" };
    const auth = selectedContext(request, actor, "business", permissionBySection[hotelBaseMatch[2]]); if (auth.error) return auth.error;
    if (hotelBaseMatch[1] !== auth.context.hotelId) return apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
    const section = hotelBaseMatch[2];
    if (section === "dashboard") {
      const dashboard = structuredClone(DASHBOARD);
      if (env?.DB) {
        const override = await env.DB.prepare("SELECT price, updated_at FROM price_overrides WHERE hotel_id = ? AND room_type = 'Standard King' AND from_date = '2026-11-07' AND to_date = '2026-11-08'").bind(auth.context.hotelId).first();
        dashboard.recommendation.applied = Boolean(override);
        if (override) dashboard.recommendation.appliedPrice = override.price;
      }
      return json({ dashboard });
    }
    if (section === "reservations") return json({ reservations: RESERVATIONS });
    if (section === "rooms") return json({ rooms: ROOMS });
    if (section === "pricing") {
      let standardPrice = 40000;
      if (env?.DB) {
        const override = await env.DB.prepare("SELECT price FROM price_overrides WHERE hotel_id = ? AND room_type = 'Standard King' AND from_date = '2026-11-07' AND to_date = '2026-11-08'").bind(auth.context.hotelId).first();
        if (override) standardPrice = override.price;
      }
      return json({ roomTypes: demoPricing(standardPrice) });
    }
    if (section === "forecast") return json({ forecast: DEMO_FORECAST });
    return json({ recommendations: [DASHBOARD.recommendation, { id: "min-stay", room: "Все категории", title: "Минимум 2 ночи", text: "Ограничение на субботу поможет сохранить номера для более доходных бронирований.", impact: 125000, demand: "MEDIUM" }] });
  }

  const applyMatch = path.match(/^\/api\/hotels\/([a-z0-9-]+)\/recommendations\/([a-z0-9-]+)\/apply$/);
  if (request.method === "POST" && applyMatch) {
    const auth = selectedContext(request, actor, "business", "EDIT_PRICING"); if (auth.error) return auth.error;
    if (applyMatch[1] !== auth.context.hotelId) return apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
    if (applyMatch[2] !== DASHBOARD.recommendation.id) return apiError(404, "RECOMMENDATION_NOT_FOUND", "Рекомендация не найдена.");
    const auditId = generatedId("AUD");
    if (env?.DB) {
      await env.DB.batch([
        env.DB.prepare("INSERT INTO price_overrides (hotel_id, room_type, from_date, to_date, price, updated_by, updated_at) VALUES (?, 'Standard King', '2026-11-07', '2026-11-08', ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(hotel_id, room_type, from_date, to_date) DO UPDATE SET price = excluded.price, updated_by = excluded.updated_by, updated_at = CURRENT_TIMESTAMP")
          .bind(auth.context.hotelId, DASHBOARD.recommendation.recommendedPrice, actor.id),
        env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, 'PRICE_RECOMMENDATION_APPLIED', 'recommendation', ?, ?)")
          .bind(auditId, actor.id, auth.context.hotelId, applyMatch[2], JSON.stringify({ from: 40000, to: DASHBOARD.recommendation.recommendedPrice, fromDate: "2026-11-07", toDate: "2026-11-08" }))
      ]);
    }
    return json({ applied: true, auditId, newPrice: DASHBOARD.recommendation.recommendedPrice, message: "Цена обновлена на выбранные даты. Действие записано в журнал." });
  }

  if (request.method === "GET" && path === "/api/admin/verifications") {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error; return json({ verifications: await readVerificationRows(env) });
  }

  const adminActionMatch = path.match(/^\/api\/admin\/verifications\/([^/]+)\/(approve|reject|request-info)$/);
  if (request.method === "POST" && adminActionMatch) {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error;
    const statusByAction = { approve: "APPROVED", reject: "REJECTED", "request-info": "MORE_INFO_REQUIRED" };
    const status = statusByAction[adminActionMatch[2]];
    if (env?.DB) {
      await seedVerificationRows(env);
      const item = await env.DB.prepare("SELECT id, user_id, hotel_id, hotel_name, status FROM verification_requests WHERE id = ?").bind(adminActionMatch[1]).first();
      if (!item) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
      if (!["PENDING", "IN_REVIEW"].includes(item.status)) return apiError(409, "INVALID_VERIFICATION_TRANSITION", "Решение уже принято. Для изменения требуется отдельный процесс отзыва.");
      const body = await readBody(request);
      const reviewNote = String(body.reviewNote || "").trim();
      if (status !== "APPROVED" && reviewNote.length < 5) return apiError(400, "REVIEW_NOTE_REQUIRED", "Укажите причину или список необходимых данных.");
      if (status === "APPROVED") {
        const documents = await env.DB.prepare("SELECT count(DISTINCT kind) AS count FROM verification_documents WHERE verification_id = ? AND kind IN ('identity', 'business', 'ownership')").bind(item.id).first();
        if (Number(documents?.count || 0) !== 3) return apiError(409, "DOCUMENTS_INCOMPLETE", "Для одобрения нужны документы личности, бизнеса и связи с отелем.");
      }
      const statements = [
        env.DB.prepare("UPDATE verification_requests SET status = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ?, review_note = ? WHERE id = ? AND status IN ('PENDING', 'IN_REVIEW')").bind(status, actor.id, status === "APPROVED" ? null : reviewNote, item.id),
        env.DB.prepare("INSERT OR IGNORE INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, ?, 'verification_request', ?, ?)")
          .bind(`AUD-VERIFY-${item.id}-${status}`, actor.id, item.hotel_id, "VERIFICATION_" + status, item.id, JSON.stringify({ hotelName: item.hotel_name, reviewNote: status === "APPROVED" ? null : reviewNote }))
      ];
      if (status === "APPROVED" && item.hotel_id) {
        statements.push(env.DB.prepare("UPDATE hotels SET verification_status = 'VERIFIED', owner_user_id = ? WHERE id = ? AND EXISTS (SELECT 1 FROM verification_requests WHERE id = ? AND status = 'APPROVED')").bind(item.user_id, item.hotel_id, item.id));
        if (item.user_id) statements.push(env.DB.prepare("INSERT INTO hotel_memberships (user_id, hotel_id, role, status) SELECT ?, ?, 'HOTEL_OWNER', 'ACTIVE' WHERE EXISTS (SELECT 1 FROM verification_requests WHERE id = ? AND status = 'APPROVED') ON CONFLICT(user_id, hotel_id) DO UPDATE SET role = 'HOTEL_OWNER', status = 'ACTIVE'").bind(item.user_id, item.hotel_id, item.id));
      }
      const results = await env.DB.batch(statements);
      if (Number(results[0]?.meta?.changes || 0) !== 1) return apiError(409, "VERIFICATION_CONFLICT", "Статус заявки уже изменился. Обновите очередь.");
      return json({ id: item.id, status, audited: true, message: "Решение сохранено в журнале проверки." });
    }
    const item = VERIFICATIONS.find((verification) => verification.id === adminActionMatch[1]); if (!item) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    return json({ id: item.id, status, audited: true, message: "Решение сохранено в журнале проверки." });
  }

  if (request.method === "GET" && path === "/api/security/probe") {
    const auth = selectedContext(request, actor, "business", "VIEW_DASHBOARD"); if (auth.error) return auth.error; return json({ ok: true, permission: "VIEW_DASHBOARD", hotelId: auth.context.hotelId });
  }
  return apiError(404, "NOT_FOUND", "Маршрут API не найден.");
}

const PAGE = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#101828"><meta name="description" content="HotelX — AI-платформа для поиска отелей, бронирования и управления гостиничным бизнесом."><title>HotelX — AI для гостей и отелей</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/styles.css?v=__HOTELX_ASSET_VERSION__"></head>
<body><div id="app"><div class="boot"><div class="brand-mark">HX</div><div><strong>HotelX</strong><span>Загружаем ваш контекст…</span></div></div></div><div id="toast-region" class="toast-region" aria-live="polite"></div><div id="modal-root"></div><div id="scroll-progress" aria-hidden="true"></div><script src="/assets/app.js?v=__HOTELX_ASSET_VERSION__" defer></script></body></html>`;

const SECURITY_HEADERS = {
  "content-security-policy": "default-src 'self'; img-src 'self' https://images.unsplash.com data:; style-src 'self'; style-src-attr 'unsafe-inline'; script-src 'self'; script-src-elem 'self'; script-src-attr 'none'; object-src 'none'; connect-src 'self'; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  "referrer-policy": "strict-origin-when-cross-origin", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "permissions-policy": "camera=(), microphone=(), geolocation=()"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, url, env);
      } catch (error) {
        console.error("HotelX API request failed", { method: request.method, path: url.pathname, name: error?.name || "Error" });
        return apiError(500, "INTERNAL_ERROR", "Сервис временно не смог обработать запрос. Повторите попытку.");
      }
    }
    if (url.pathname === "/assets/styles.css") return new Response(STYLES, { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=31536000, immutable", ...SECURITY_HEADERS } });
    if (url.pathname === "/assets/app.js") return new Response(APP_JS, { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "public, max-age=31536000, immutable", ...SECURITY_HEADERS } });
    if (url.pathname === "/favicon.svg" || url.pathname === "/favicon.ico") return new Response(FAVICON, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400", ...SECURITY_HEADERS } });
    if (url.pathname.includes(".")) return new Response("Not found", { status: 404, headers: SECURITY_HEADERS });
    return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...SECURITY_HEADERS } });
  }
};
