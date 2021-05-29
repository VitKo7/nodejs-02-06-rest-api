//! --- Настройка Passport перед роутингом ---
app.use(
  session({
    secret: 'secret-word',
    key: 'session-key',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null,
    },
    saveUninitialized: false,
    resave: false,
  }),
);

require('./config/config-passport');

app.use(passport.initialize());
app.use(passport.session());
