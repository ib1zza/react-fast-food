# План интеграции фронтенда с бэкендом: Auth + Cart

## Контекст

**Стек фронтенда:** React 19, TypeScript, Zustand, React Router v7, Vite  
**Стек бэкенда:** Express + JWT + bcrypt, порт `3001`  
**Текущее состояние фронтенда:**
- Есть `useCatalogStore` (Zustand) — категории и продукты
- Есть `catalogApi.ts` — прямые `fetch`-вызовы к беку
- Есть `ICartItem` в `types.ts` — но нигде не используется
- Нет авторизации, нет хранилища корзины, нет HTTP-клиента с токеном

---

## Часть 1 — Инфраструктура

### 1.1 Базовый HTTP-клиент

**[NEW]** `src/api/httpClient.ts`

Утилита поверх `fetch`, которая:
- Автоматически добавляет `Authorization: Bearer <token>` из `localStorage` (если есть)
- Ставит `Content-Type: application/json`
- Парсит JSON-ответ
- Бросает ошибку с сообщением из `{ error: "..." }` при non-2xx статусах

```ts
// Использование:
httpClient.get('/categories')
httpClient.post('/auth/login', { email, password })
httpClient.post('/cart/items', { productId, quantity }, { auth: true })
```

**[MODIFY]** `src/api/catalogApi.ts`  
Переписать на использование `httpClient` вместо прямых `fetch`-вызовов.

---

### 1.2 Типы

**[MODIFY]** `src/types.ts`  
Добавить новые интерфейсы:

```ts
export interface IUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

// Корзина как она приходит с бека (items без вложенного product)
export interface IBackendCartItem {
  productId: string;
  quantity: number;
}

export interface IBackendCart {
  id: string;
  userId: string;
  items: IBackendCartItem[];
  updatedAt: string;
}
```

---

## Часть 2 — Auth

### 2.1 API-слой

**[NEW]** `src/api/authApi.ts`

```ts
register(email, password) → IAuthResponse
login(email, password)    → IAuthResponse
getMe()                   → { user: IUser }
```

### 2.2 Zustand-хранилище авторизации

**[NEW]** `src/store/useAuthStore.types.ts`

```ts
type AuthState = {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean; // computed: !!token

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
}
```

**[NEW]** `src/store/useAuthStore.ts`

Логика:
- `login` / `register` — вызывают `authApi`, сохраняют токен и юзера в state + `localStorage`
- `logout` — чистят state + `localStorage` + сбрасывают корзину
- `restoreSession` — читает токен из `localStorage`, вызывает `GET /auth/me` для валидации; если токен протух — автоматически разлогинивает
- `restoreSession` вызывается в `App.tsx` при монтировании через `useEffect`

### 2.3 Компоненты

**[NEW]** `src/components/auth/LoginForm/LoginForm.tsx` + `.css`  
Форма с полями email/password, кнопка «Войти», ссылка «Нет аккаунта? Зарегистрироваться»

**[NEW]** `src/components/auth/RegisterForm/RegisterForm.tsx` + `.css`  
Форма с полями email/password/confirm password, кнопка «Создать аккаунт»

**[NEW]** `src/components/auth/AuthModal/AuthModal.tsx` + `.css`  
Модальное окно, которое переключает между `LoginForm` и `RegisterForm`. Закрывается по клику на оверлей или кнопку «×».

### 2.4 Страницы и роутинг

**[MODIFY]** `src/App.tsx`  
- Добавить `useEffect` с вызовом `restoreSession()` при монтировании
- Добавить маршруты `/login` и `/register` (опционально — если хочется отдельных страниц вместо модалки)

**[NEW]** `src/components/common/ProtectedRoute/ProtectedRoute.tsx`  
HOC-компонент: если пользователь не авторизован — редиректит на главную (или показывает `AuthModal`).

---

## Часть 3 — Хедер / Навигация

**[NEW]** `src/components/layout/Header/Header.tsx` + `.css`  
Шапка приложения с:
- Логотипом / названием
- Кнопкой «Войти» (если не авторизован) — открывает `AuthModal`
- Аватаром/email + кнопкой «Выйти» (если авторизован)
- Иконкой корзины с бейджем (количество товаров)

**[MODIFY]** `src/App.tsx`  
Добавить `<Header />` над `<Routes>`.

---

## Часть 4 — Cart

### 4.1 API-слой

**[NEW]** `src/api/cartApi.ts`

```ts
getCart()                               → IBackendCart
addItem(productId, quantity?)           → IBackendCart
updateItem(productId, quantity)         → IBackendCart
removeItem(productId)                   → IBackendCart
clearCart()                             → IBackendCart
```

Все методы передают `Authorization: Bearer <token>` через `httpClient`.

### 4.2 Zustand-хранилище корзины

**[NEW]** `src/store/useCartStore.types.ts`

```ts
type CartState = {
  // Локальное состояние (enriched — с полными данными о продукте)
  items: ICartItem[];  // ICartItem уже есть в types.ts: { product: IProduct, quantity: number }
  isLoading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  addItem: (product: IProduct, quantity?: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  reset: () => void; // вызывается при logout
}
```

**[NEW]** `src/store/useCartStore.ts`

Логика:
- После получения `IBackendCart` (только `productId + quantity`) — enriches данные, находя полный `IProduct` из `useCatalogStore`
- `fetchCart` — вызывается после успешного логина и при монтировании (если авторизован)
- При `logout` вызывается `reset()` — корзина очищается локально

### 4.3 Компоненты

**[NEW]** `src/components/cart/CartDrawer/CartDrawer.tsx` + `.css`  
Боковая панель (drawer справа), которая:
- Открывается по клику на иконку корзины в хедере
- Отображает список товаров с количеством и ценой
- Кнопки `+` / `-` / удалить у каждого товара
- Итоговая сумма внизу
- Кнопка «Очистить корзину»

**[NEW]** `src/components/cart/CartItem/CartItem.tsx` + `.css`  
Отдельный компонент строки товара в корзине.

### 4.4 Добавление в корзину с карточки товара

> Когда будет реализована карточка продукта (ProductCard), добавить кнопку «В корзину».  
> Кнопка должна: если пользователь не авторизован — открыть `AuthModal`; если авторизован — вызвать `addItem`.

---

## Часть 5 — Обработка ошибок и UX

- `401` от бека → автоматический logout (реализовать в `httpClient` interceptor)
- Отображение `error` из `useAuthStore` и `useCartStore` под формами / в тостах
- Состояния `isLoading` во всех формах и кнопках (disabled + spinner)
- Optimistic updates для корзины (опционально — для плавного UX)

---

## Порядок реализации

```
1. src/api/httpClient.ts
2. src/types.ts  (добавить IUser, IAuthResponse, IBackendCart*)
3. src/api/authApi.ts
4. src/store/useAuthStore.ts (+types)
5. src/api/cartApi.ts
6. src/store/useCartStore.ts (+types)
7. src/components/auth/** (LoginForm, RegisterForm, AuthModal)
8. src/components/layout/Header/Header.tsx
9. src/components/cart/** (CartDrawer, CartItem)
10. src/App.tsx  (restoreSession, Header, роутинг)
11. src/api/catalogApi.ts (рефактор на httpClient)
```

---

## Зависимости (новые не нужны)

Весь план реализуется на уже установленном стеке:
- `zustand` — хранилища
- `react-router` — навигация и ProtectedRoute
- нативный `fetch` — HTTP (через httpClient)

Никаких `axios`, `react-query` или дополнительных библиотек не требуется.
