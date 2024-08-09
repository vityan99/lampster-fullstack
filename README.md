# lampster - магазин светильников (JavaScript, Express.js, MongoDB)

lampster - это full-stack проект интернет-магазина, специализирующегося на продаже светильников различных видов, форм и дизайнов.
Клиентская часть данного проекта реализована на чистом JavaScript, а серверная часть — на Express.js, взаимодействуя с базой данных MongoDB.

Данный проект также был реализован с использованием библиотеки React. С ним можно ознакомиться по [ссылке](https://github.com/vityan99/lampster-react?tab=readme-ov-file)

## Содержание

- [Возможности клиентской части](#возможности-клиентской-части)
- [Карта клиентских компонентов](#карта-клиентских-компонентов)
- [Вид со стороны клиента](#вид-со-стороны-клиента)
- [Возможности административной части](#возможности-административной-части)
- [Карта административных компонентов](#карта-административных-компонентов)
- [Вид CRM-панели](#вид-crm-панели)
- [Возможности серверной части](#возможности-серверной-части)
- [Карта серверных компонентов](#карта-серверных-компонентов)
- [Структура базы данных](#структура-базы-данных)
- [Уведомления телеграм-бота](#уведомления-телеграм-бота)
- [Технологии](#технологии)
- [Использование](#использование)
- [Команда проекта](#команда-проекта)

## Возможности клиентской части

- Поиск товара по наименованию/фильтрам
- Общее количество товаров в корзине и их сумма
- Добавление товара в избранное
- Выбор количества Ватт/цвета для каждого из товара и изменение дизайна на основе этих данных
- Popup с характеристиками/фото товара
- Добавление/удаление товара в корзину

## Карта клиентских компонентов

![lampster component-instruction-client](https://github.com/vityan99/lampster-fullstack/blob/main/preview/client/client-components.jpg)

## Вид со стороны клиента

![lampster client-preview-1](https://github.com/vityan99/lampster-fullstack/blob/main/preview/client/client-preview-1.png)
![lampster client-preview-2](https://github.com/vityan99/lampster-fullstack/blob/main/preview/client/client-preview-2.png)
![lampster client-preview-3](https://github.com/vityan99/lampster-fullstack/blob/main/preview/client/client-preview-3.png)
![lampster client-preview-4](https://github.com/vityan99/lampster-fullstack/blob/main/preview/client/client-preview-4.png)

## Возможности административной части

- Просмотр оформленных заказов
- Изменение статуса заказа
- Просмотр информации о том, кто последним изменил статус заказа
- Разделение статусов - менеджер и администратор
- Пользователи со статусом менеджера могут изменить пароль своей учетной записи
- Пользователи со статусом администратора могут добавлять новых пользователей и назначать им необходимый статус

## Карта административных компонентов

![lampster component-instruction-admin](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-components.jpg)

## Вид CRM-панели

![lampster admin-preview-1](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-1.png)
![lampster admin-preview-2](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-2.png)
![lampster admin-preview-3](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-3.png)
![lampster admin-preview-4](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-4.png)
![lampster admin-preview-5](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-5.png)
![lampster admin-preview-6](https://github.com/vityan99/lampster-fullstack/blob/main/preview/admin/admin-preview-6.png)

## Возможности серверной части

- Соединение с базой данных MongoDB при запуске сервера
- Соединение с телеграм ботом
- Разрыв соединения с базой данных при остановке сервера
- Прием данных со стороны клиента и их добавление/редактирование на стороне базы данных
- Выдача информации клиенту по запросу из базы данных
- Отправка сообщений о созданом заказе в телеграм бота, который в свою очередь перенаправляет эти данные в телеграм группу
- Редирект на страницу 404, при вводе несуществующего адреса

## Карта серверных компонентов

![lampster component-instruction-server](https://github.com/vityan99/lampster-fullstack/blob/main/preview/server/server-components.jpg)

## Структура базы данных

![lampster db-structure](https://github.com/vityan99/lampster-fullstack/blob/main/preview/database/db-structure.jpg)

## Уведомления телеграм-бота

![telegram-bot-notifications](https://github.com/vityan99/lampster-fullstack/blob/main/preview/telegram/telegram-bot-preview.png)

## Технологии

- [HTML5](https://html.com/html5/)
- [CSS3](https://www.w3schools.com/W3CSS/)
- [JavaScript](https://learn.javascript.ru/)
- [Express.js](https://expressjs.com/ru/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [MVC](https://habr.com/ru/articles/192256/)
- [MongoDB](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/)
- [Axios](https://axios-http.com/)
- [gitignore](https://docs.gitignore.io/)

## Использование

Для просмотра и запуска проекта - Вам необходимо:

- Скачать архив и разархивировать содержимое в удобное для Вас место
- Открыть папку с содержимым в редакторе кода
- Установить все необходимые зависимости с помощью команды `npm i`
- Добавьте адрес Вашей базы данных в файл `src/utils/database.js`
- Добавьте токен и id Вашего телеграм-бота в файл `src/utils/telegramConfig.js`
- Добавьте все необходимые коллекции и значения в Вашу базу данных из предоставленного файла `DBConfig/DBConfig.js`
- Запуск проекта осуществляется командой: `npm run dev`
- Клиентская часть будет доступна по адресу: `http://localhost:3000/`
- Административная часть будет доступна по адресу: `http://localhost:3000/admin`
- Для остановки проекта Вам необходимо использовать сочетание клавиш: `CTRL + C` или `CONTROL + C`

## Команда проекта

- [Виктор Тян](https://t.me/vityan00) — Front-End Developer
