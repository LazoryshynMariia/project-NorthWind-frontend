# Природні мандри

Frontend командного вебзастосунку для публікації історій про подорожі, перегляду
профілів мандрівників і збереження цікавих матеріалів.

## Технології

- Next.js 15
- React 19
- TypeScript
- Axios
- Formik
- Yup
- React Hot Toast
- CSS Modules
- ESLint
- Prettier

## Корисні посилання

- [Дизайн у Figma](https://www.figma.com/design/ZNoVlvEK6RQ2aJpAwL26yL/%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%BD%D1%96-%D0%BC%D0%B0%D0%BD%D0%B4%D1%80%D0%B8--Copy-)
- [Swagger API](https://fs-124-3.onrender.com/api-docs/#/)
- [Backend API](https://fs-124-3.onrender.com)

## Вимоги

- Node.js 20 або новіша версія
- npm

## Встановлення

Клонувати репозиторій:

```bash
git clone git@github.com:LazoryshynMariia/project-NorthWind-frontend.git
```

Перейти до директорії проєкту:

```bash
cd project-NorthWind-frontend
```

Встановити залежності:

```bash
npm install
```

Створити локальний файл `.env` за прикладом `.env.example`:

```env
NEXT_PUBLIC_API_URL=https://fs-124-3.onrender.com
```

Запустити development server:

```bash
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000).

## Доступні команди

```bash
npm run dev
```

Запускає локальний сервер розробки.

```bash
npm run build
```

Створює production-збірку.

```bash
npm run start
```

Запускає попередньо створену production-збірку.

```bash
npm run lint
```

Перевіряє код за правилами ESLint.

## Основні маршрути

- `/` — головна сторінка
- `/login` — вхід
- `/register` — реєстрація
- `/stories` — список історій
- `/stories/[storyId]` — детальна сторінка історії
- `/travellers` — список мандрівників
- `/travellers/[travellerId]` — профіль мандрівника
- `/profile` — особистий профіль
- `/new-story` — створення історії

## Структура API

Базовий Axios instance знаходиться в:

```text
lib/api/api.ts
```

API-функції розподіляються за backend-доменами:

```text
lib/api/
├── api.ts
├── authApi.ts
├── usersApi.ts
├── storiesApi.ts
├── travellersApi.ts
├── savedStoriesApi.ts
└── categoriesApi.ts
```

Файли створюються під час реалізації відповідного модуля. Порожні API-файли
наперед не додаються.

Спільні й доменні типи зберігаються окремо:

```text
types/
├── api.ts
├── auth.ts
├── user.ts
├── story.ts
├── traveller.ts
└── category.ts
```

## Правила роботи з API

- Не дублювати базову адресу backend у компонентах.
- Використовувати Axios instance із `lib/api/api.ts`.
- Зберігати запити кожного домену в окремому `*Api.ts`.
- Зберігати повторно використовувані типи в директорії `types`.
- Звіряти endpoint і request body зі Swagger.
- Не додавати секретні значення до Git.

## Git workflow

Оновити локальну `main`:

```bash
git switch main
git pull --ff-only origin main
```

Створити робочу гілку:

```bash
git switch -c type/task-name
```

Перед комітом виконати:

```bash
npm run lint
npm run build
git diff --check
git status
```

Зміни додаються до `main` тільки через Pull Request після успішної перевірки
Vercel Preview.

## Deployment

Frontend розгортається на Vercel. Pull Request створює Preview deployment, а
зміни з `main` використовуються для production deployment.
