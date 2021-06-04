## Node.js Course

Для каждой работы создавайте свою ветку.

- task-02 +
- task-03 +
- task-04 +
- task-05
- task-06

Каждая новая ветка для работы должна делаться с master

После того как вы закончили выполнять задание в своей ветке, необходимо сделать
пулл-реквест (PR). Потом добавить ментора для ревью кода. Только после того как
ментор заапрувит PR, вы можете выполнить мердж ветки с заданием в мастер.

Внимательно читайте комментарии ментора. Исправьте замечания и сделайте коммит в
ветке с заданием. Изменения подтянуться в PR автоматически после того как вы
отправите коммит с исправлениями на github. После исправления снова добавьте
ментора на ревью кода.

- При сдаче работы есть ссылка на PR
- JS-код чистый и понятный, для форматирования используется Prettier

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок

### task-04:

вкратце вопросы следующие:

1. как связать user и его contacts? = через агригате
2. Чтобы каждый пользователь работал и видел только свои контакты в схеме
   контактов добавьте свойство owner owner: { type: SchemaTypes.ObjectId, ref:
   'user', }

### task-05:

вопросы :

1.
