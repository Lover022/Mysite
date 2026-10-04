const CV = {
  photo: "photo.jpg",
  defaultLang: "uk",

  skills: ["HTML", "CSS/SCSS", "JS", "Git/GitHub", "MS SQL Server", "Docker", "Pterodactyl", "PostgreSQL", "OMV"],
  code: "Sudo apt install opsec",
  socials: [
    { label: "Telegram", icon: "💬", url: "https://t.me/lost_in_wave" },
    { label: "GitHub",   icon: "🐙", url: "https://github.com/Lover022" }
  ],

  langs: {
    uk: {
      btn: "EN",
      name: "Опсековіч Максим",
      role: "Студент",
      ui: { about: "Про мене", skills: "Навички", code: "Приклади коду",
            education: "Освіта", languages: "Мови", projects: "Проєкти" },
      about: "Маю навички в сфері веб-розробки (HTML, CSS/SCSS, JavaScript), адміністрування баз даних (PostgreSQL, MS SQL Server) та версіонування коду за допомогою Git/GitHub. Досвідчений у контейнеризації додатків через Docker, а також у налаштуванні та підтримці серверних рішень і селф-хостингу (OpenMediaVault, Pterodactyl).",
      contacts: [   // icon — любой эмодзи; href — необязательная ссылка; scramble: true — «шифровать» значение
        { icon: "🎂", label: "Дата народження", value: "00 ааааааа 0000 аааа", scramble: true },
        { icon: "📍", label: "Десь у Дармштадті", value: "Німеччина" }
      ],
      education: [
        { icon: "🎓", title: "Коледж", place: "КітуНау" }
      ],
      languages: [
        { name: "Українська", level: "рідна" },
        { name: "Англійська", level: "B2" },
        { name: "Німецька",   level: "B1" },
        { name: "Іспанська",  level: "A1" },
        { name: "Китайська",  level: "HSK 1" }
      ],
      projects: [
        { icon: "🧩", title: "Login Form", text: "Форма входу на HTML, CSS, JS", url: "#" },
        { icon: "🌐", title: "Персональна сторінка", text: "Ця сторінка", url: "#" }
      ]
    },

    en: {
      btn: "UA",
      name: "Opsecovich Maksym",
      role: "Student",
      ui: { about: "About me", skills: "Skills", code: "Code Examples",
            education: "Education", languages: "Languages", projects: "Projects" },
      about: "I specialize in web development using HTML, CSS/SCSS, and JavaScript, alongside managing databases like PostgreSQL and MS SQL Server. I use Git/GitHub for version control and Docker for containerization, while also running my own self-hosted setups with OpenMediaVault and Pterodactyl.",
      contacts: [
        { icon: "🎂", label: "Date of birth", value: "Aaaaaaaa 00, 0000", scramble: true },
        { icon: "📍", label: "Somewhere in kyiv", value: "Ukraine" }
      ],
      education: [
        { icon: "🎓", title: "College", place: "Kitu Nau" }
      ],
      languages: [
        { name: "Ukrainian", level: "Native" },
        { name: "English",   level: "B2" },
        { name: "German",    level: "B1" },
        { name: "Spanish",   level: "A1" },
        { name: "Chinese",   level: "HSK 1" }
      ],
      projects: [
        { icon: "🧩", title: "Login Form", text: "Login form in HTML, CSS, JS", url: "#" },
        { icon: "🌐", title: "Personal page", text: "This page", url: "#" }
      ]
    }
  }
};
