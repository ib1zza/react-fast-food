/**
 * OpenAPI 3.0 specification for react-fast-food backend
 */
export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Fast Food API',
    version: '1.0.0',
    description: 'REST API для Fast Food приложения. Авторизация через JWT (Bearer token).',
  },
  servers: [{ url: 'http://localhost:3001', description: 'Local dev server' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Вставьте JWT токен, полученный из /auth/login или /auth/register',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
          email: { type: 'string', example: 'user@example.com' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      CartItem: {
        type: 'object',
        required: ['quantity', 'product'],
        properties: {
          productId: { type: 'string', example: '20-364-1' },
          product: { $ref: '#/components/schemas/Product' },
          quantity: { type: 'integer', minimum: 1, example: 2 },
        },
      },
      Cart: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'a1b2c3d4-...' },
          userId: { type: 'string', example: 'f47ac10b-...' },
          items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '23' },
          name: { type: 'string', example: 'Бургеры' },
          slug: { type: 'string', example: 'бургеры' },
          image: { type: 'string', format: 'uri' },
          sourceUrl: { type: 'string', format: 'uri' },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '20-364-1' },
          name: { type: 'string', example: 'Ангус 4 Сыра' },
          price: { type: 'number', example: 609.99 },
          priceText: { type: 'string', example: '609.99 ?' },
          categoryId: { type: 'string', example: '20' },
          categoryName: { type: 'string', example: 'Новинки' },
          image: { type: 'string', format: 'uri' },
          description: { type: 'string' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Invalid credentials' },
        },
      },
    },
  },
  paths: {
    // -- Auth ------------------------------------------------------------------
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Регистрация нового пользователя',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', minLength: 6, example: 'secret123' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Пользователь создан',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
          400: { description: 'Неверный формат email или пароль слишком короткий', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          409: { description: 'Пользователь с таким email уже существует', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Вход по email и паролю',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', example: 'secret123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Успешный вход. Возвращает JWT токен.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
          401: { description: 'Неверный email или пароль', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Получить данные текущего пользователя',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Данные авторизованного пользователя',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { user: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          401: { description: 'Токен не передан или невалиден', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },

    // -- Cart ------------------------------------------------------------------
    '/cart': {
      get: {
        tags: ['Cart'],
        summary: 'Получить корзину текущего пользователя',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Корзина пользователя', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } },
          401: { description: 'Не авторизован', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['Cart'],
        summary: 'Очистить корзину (удалить все товары)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Корзина очищена', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } },
          401: { description: 'Не авторизован', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/cart/items': {
      post: {
        tags: ['Cart'],
        summary: 'Добавить товар в корзину',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productId'],
                properties: {
                  productId: { type: 'string', example: '20-364-1' },
                  quantity: { type: 'integer', minimum: 1, default: 1, example: 2 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Товар добавлен. Возвращает обновлённую корзину.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } },
          400: { description: 'Неверные параметры', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Не авторизован', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Продукт не найден', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/cart/items/{productId}': {
      put: {
        tags: ['Cart'],
        summary: 'Обновить количество товара в корзине',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'productId', in: 'path', required: true, schema: { type: 'string' }, example: '20-364-1' },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['quantity'],
                properties: {
                  quantity: { type: 'integer', description: 'Если <= 0 — товар удаляется из корзины', example: 3 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Корзина обновлена', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } },
          401: { description: 'Не авторизован', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Товар не найден в корзине', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        tags: ['Cart'],
        summary: 'Удалить конкретный товар из корзины',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'productId', in: 'path', required: true, schema: { type: 'string' }, example: '20-364-1' },
        ],
        responses: {
          200: { description: 'Товар удалён. Возвращает обновлённую корзину.', content: { 'application/json': { schema: { $ref: '#/components/schemas/Cart' } } } },
          401: { description: 'Не авторизован', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Товар не найден в корзине', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },

    // -- Catalog (proxied from json-server) ------------------------------------
    '/categories': {
      get: {
        tags: ['Catalog'],
        summary: 'Список всех категорий',
        responses: {
          200: {
            description: 'Массив категорий',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } },
          },
        },
      },
    },
    '/categories/{id}': {
      get: {
        tags: ['Catalog'],
        summary: 'Получить категорию по ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: '23' }],
        responses: {
          200: { description: 'Категория', content: { 'application/json': { schema: { $ref: '#/components/schemas/Category' } } } },
          404: { description: 'Категория не найдена' },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Catalog'],
        summary: 'Список продуктов (поддерживает фильтрацию)',
        parameters: [
          { name: 'categoryId', in: 'query', schema: { type: 'string' }, description: 'Фильтр по ID категории', example: '23' },
          { name: '_page', in: 'query', schema: { type: 'integer' }, description: 'Номер страницы' },
          { name: '_per_page', in: 'query', schema: { type: 'integer' }, description: 'Элементов на странице' },
          { name: '_sort', in: 'query', schema: { type: 'string' }, description: 'Поле сортировки, например price или -price' },
        ],
        responses: {
          200: {
            description: 'Массив продуктов',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } },
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Catalog'],
        summary: 'Получить продукт по ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: '20-364-1' }],
        responses: {
          200: { description: 'Продукт', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
          404: { description: 'Продукт не найден' },
        },
      },
    },
  },
};
