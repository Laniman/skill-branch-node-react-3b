# skill-branch-node-react-3b
Skill-branch DEV-Intensive "Node.js backend &amp; React frontend" - Task 3b: Punk Pets Hair

## Краткое описание задачи
Сделать API для базы данных сайта “Punk Pets Hair”

## Полное описание задачи
У вас есть объект, который описывает структуру базы данных парикмахерской для животных.

## Необходимо реализовать следующие методы:
| Запрос                    | Описание                                                             |   |   |
|---------------------------|----------------------------------------------------------------------|---|---|
| GET /                     | Получение списка всей исходной базы                                  |   |   |
| GET /users                | Получить список пользователей                                        |   |   |
| GET /users/:id            | Получить данные конкретного пользователя по его ID                   |   |   |
| GET /users/:username      | Получить данные конкретного пользователя по его username             |   |   |
| GET /users/:username/pets | Получить список животных конкретного пользователя по его username/id |   |   |
| GET /users/:id/pets       | Получить список животных конкретного пользователя по его username/id |   |   |
| GET /users?havePet=cat    | Пользователи у которых есть коты                                     |   |   |
| GET /pets                 | Получить список животных                                             |   |   |
| GET /pets/:id             | Получить животного по его ID                                         |   |   |
| GET /pets?type=cat        | Получить список только котов                                         |   |   |
| GET /pets?age_gt=12       | Получить животных возраст которых строго больше 12 месяцев           |   |   |
| GET /pets?age_lt=25       | Получить животных возраст которых строго меньше 25 месяцев           |   |   |

## Реализовать механизм populate
| Запрос                                | Описание                                                                                              |   |   |
|---------------------------------------|-------------------------------------------------------------------------------------------------------|---|---|
| GET /pets/populate                    | Получить список животных с пользовательской структурой, положить пользователя в поле user             |   |   |
| GET /pets/populate?type=cat           | Популяция с возможностью фильтра                                                                      |   |   |
| GET /pets/populate?type=cat&age_gt=12 | Популяция с возможностью фильтра                                                                      |   |   |
| GET /pets/:id/populate                | Популяция user в pet                                                                                  |   |   |
| GET /users/populate                   | Все пользователи вывести с pets                                                                       |   |   |
| GET /users/populate?havePet=cat       | Все пользователи у которых коты, вывести с pets                                                       |   |   |
| GET /users/:usernameOrId/populate     | Получить данные конкретного пользователя по его username/id, внутри объекта должен лежить массив pets |   |   |

## Подробности
- Ответ должен быть всегда валидным JSON, например при отдаче строки, она должна быть в двойных кавычках (смотрите примеры).
- В случае если объект по id/username не найден, необходимо возвращать 404 код ошибки, с телом "Not Found". Пустой массив - это не 404 ошибка.
- Необходимо сортировать массивы по возрастанию ID, если не сказано другое.
- Структуру модели, можно получить [ТУТ](https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json)
- Совет, так как данная структура может быть изменена в процессе, необходимо регулярно обновлять её в программе. Или разработать механизм, автоматического скачивания при старте веб-сервера.
