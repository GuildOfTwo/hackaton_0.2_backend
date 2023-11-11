## Описание проекта
Backend для сервиса Onboardy со следующими возможностями: авторизации и регистрации пользователей, создание создание и изменение курсов, назначение курсов пользователям, контроль за своевременным прохождением назначенных курсов, получение пользователями наград за успешное прохождение курсов.

## Стек технологий:
- Node.js;
- Express;
- Prisma ORM;
- PostgreSQL;
- Сelebrate;
- Winston;
- Docker;
- Grafana+Loki.
## Deploy:
- Docker;
- Docker Compose;
## Установка и запуск приложения:
Наиболее быстрый и удобный способ развернуть и запустить приложение - использование
Docker.

Клонировать репозиторий:

    git clone https://github.com/GuildOfTwo/hackaton_0.2.git

Отредактировать файл конфигурации сервера Nginx в каталоге:

    deploy-configs/onboardy/frontend/.nginx/nginx.conf

при необходимости иcпользовать https-протокол скопировать файлы сертификатов
в каталог

    deploy-configs/onboardy/frontend/.nginx/certs


Если впоследствии в .env или nginx.conf будут вноситься изменения, не забудьте перезапустить приложение командой:

    docker-compose up --build -d

Чтобы остановить запущенное приложение, используйте команду:

    docker-compose down

По умолчанию, Frontend запускается на порту 80 а Backend на порту 3000. Чтобы изменить это поведение, отредактируйте файл:

    docker-compose.yaml

и перезапустите приложение.

## Список переменных окружения, которые необходимы для корректной сборки и работы приложения:
- API_BASE_URL=/* put your api FQDN here */
- SITE_BASE_URL=/* put your site FQDN here */
- JWT_SECRET=/* put your strong secret key here */
- MAX_AUTH_ATTEMPTS=/* max unsuccessfully auth attempts per minute */
- DATABASE_URL=/* database URI like postgresql://user:password@hostname:5432/onboardy?schema=public */

## Сервис логирования GRAFANA+LOKI

По умолчанию приложение использует сервис логирования Grafana+Loki. Для просмотра логов приложения перейдите по адресу:

    https://<site-name>/logs/
    user: admin
    password: admin

При первом входе в Grafana не забудьте изменить пароль по умолчанию на собственный!