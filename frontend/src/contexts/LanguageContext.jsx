import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translation data
const translations = {
  en: {
    // Header & Navigation
    header: {
      portfolio: 'My Portfolio',
      language: 'Language'
    },
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },

    // About Section
    about: {
      welcome: 'Welcome',
      title: "I'm a",
      roles: ['Computer Science Graduate', 'Aspiring Developer', 'Tech Enthusiast', 'Problem Solver'],
      description: 'Recent computer science graduate passionate about building web applications and learning new technologies. I enjoy creating projects that combine creativity with programming.',
      badges: {
        learning: 'Always Learning',
        creative: 'Creative Thinker',
        motivated: 'Self Motivated'
      },
      buttons: {
        viewWork: 'View My Work',
        getInTouch: 'Get In Touch'
      }
    },

    // Projects Section
    projects: {
      label: 'Portfolio',
      title: 'Featured Projects',
      description: 'A collection of projects that showcase my skills and passion for development',
      refreshButton: 'Refresh GitHub Data',
      refreshing: 'Refreshing...',
      clickDetails: 'Click for details',
      status: {
        production: 'Production',
        development: 'Active Development',
        completed: 'Completed',
        archived: 'Archived'
      },
      category: {
        'full-stack': 'Full-Stack',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'mobile': 'Mobile',
        'data-viz': 'Data Visualization',
        'ai-ml': 'AI/ML',
        'other': 'Other'
      },
      modal: {
        overview: 'Project Overview',
        features: 'Key Features',
        challenges: 'Challenges & Learning',
        mainChallenges: 'Main Challenges:',
        whatLearned: 'What I Learned:',
        techStack: 'Tech Stack',
        repoLanguages: 'Repository Languages:',
        repoStats: 'Repository Stats',
        projectDetails: 'Project Details',
        category: 'Category',
        created: 'Created',
        size: 'Size',
        license: 'License',
        topics: 'Topics',
        liveDemo: 'Live Demo',
        viewCode: 'View Code'
      },
      stats: {
        stars: 'Stars',
        forks: 'Forks',
        watchers: 'Watchers',
        primaryLanguage: 'Primary Language',
        lastCommit: 'Last Commit',
        openIssues: 'Open Issues'
      },
      actions: {
        code: 'Code',
        demo: 'Demo'
      }
    },

    // Skills Section
    skills: {
      label: 'Skills',
      title: 'Technical Expertise',
      description: 'Technologies and tools I use to bring ideas to life',
      programmingLanguages: 'Programming Languages',
      technicalExpertise: 'Technical Expertise',
      levels: {
        expert: 'Expert',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        beginner: 'Beginner'
      },
      categories: {
        backend: {
          name: 'Backend',
          title: 'Server-Side Development',
          description: 'Building robust and scalable server applications'
        },
        frontend: {
          name: 'Frontend',
          title: 'User Interface Development',
          description: 'Creating interactive and responsive user experiences'
        },
        database: {
          name: 'Database',
          title: 'Data Management',
          description: 'Designing and optimizing database systems'
        },
        design: {
          name: 'Design',
          title: 'UI/UX Frameworks',
          description: 'Crafting beautiful and functional interfaces'
        },
        system: {
          name: 'System',
          title: 'System Administration',
          description: 'Managing and configuring operating systems and development tools'
        },
        tools: {
          name: 'Tools',
          title: 'Development Tools',
          description: 'IDEs, editors, and development environment tools for efficient coding'
        }
      },
      summary: {
        languages: 'Languages',
        categories: 'Categories',
        technologies: 'Technologies'
      }
    },

    // Roadmap Section
    roadmap: {
      label: 'My Journey',
      title: 'Development Roadmap',
      description: 'My continuous learning journey and professional milestones in software development',
      timeline: {
        python: {
          date: 'September 2020',
          title: 'Started Learning Python',
          description: 'Beginning my programming journey with Python fundamentals'
        },
        rails: {
          date: 'December 2023',
          title: 'Web Development with Ruby on Rails',
          description: 'Diving into web development and learning the Rails framework'
        },
        firstProjects: {
          date: 'January 2024',
          title: 'First Rails Projects',
          description: 'Working on real projects and gaining practical experience'
        },
        django: {
          date: 'August 2024',
          title: 'Django Development',
          description: 'Expanding backend skills with Django framework'
        },
        javascript: {
          date: 'November 2024',
          title: 'JavaScript Journey Begins',
          description: 'Starting frontend development with JavaScript'
        },
        react: {
          date: 'January 2025',
          title: 'React Development',
          description: 'Mastering modern frontend development with React'
        },
        degree: {
          date: 'July 2025',
          title: "Bachelor's Degree",
          description: 'Received my bachelor\'s degree in Computer Science'
        }
      },
      stats: {
        yearsOfLearning: 'Years of Learning',
        programmingLanguages: 'Programming Languages',
        majorMilestones: 'Major Milestones'
      }
    },

    // Contact Section
    contact: {
      label: 'Get in Touch',
      title: "Let's Connect",
      description: 'Ready to collaborate? Let\'s discuss your next project and bring your ideas to life',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Email',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Bardzheiev Anton. Crafted with passion and modern technologies.',
      status: {
        available: 'Available for new projects',
        remote: 'Remote work friendly'
      }
    },

    // Loading & Common
    common: {
      loading: 'Loading...',
      loadingProjects: 'Loading projects...'
    }
  },

  uk: {
    // Header & Navigation
    header: {
      portfolio: 'Моє Портфоліо',
      language: 'Мова'
    },
    nav: {
      about: 'Про мене',
      projects: 'Проекти',
      skills: 'Навички',
      contact: 'Контакти'
    },

    // About Section
    about: {
      welcome: 'Ласкаво просимо',
      title: 'Я',
      roles: ['Випускник Комп\'ютерних Наук', 'Початківець Розробник', 'Ентузіаст Технологій', 'Вирішувач Проблем'],
      description: 'Нещодавній випускник комп\'ютерних наук, який захоплюється створенням веб-додатків та вивченням нових технологій. Мені подобається створювати проекти, які поєднують креативність з програмуванням.',
      badges: {
        learning: 'Постійно Вчуся',
        creative: 'Креативно Мислю',
        motivated: 'Самомотивований'
      },
      buttons: {
        viewWork: 'Переглянути Роботи',
        getInTouch: 'Зв\'язатися'
      }
    },

    // Projects Section
    projects: {
      label: 'Портфоліо',
      title: 'Кращі Проекти',
      description: 'Колекція проектів, які демонструють мої навички та пристрасть до розробки',
      refreshButton: 'Оновити GitHub Дані',
      refreshing: 'Оновлення...',
      clickDetails: 'Натисніть для деталей',
      status: {
        production: 'У Виробництві',
        development: 'Активна Розробка',
        completed: 'Завершено',
        archived: 'Архівовано'
      },
      category: {
        'full-stack': 'Full-Stack',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'mobile': 'Мобільні',
        'data-viz': 'Візуалізація Даних',
        'ai-ml': 'ШІ/МН',
        'other': 'Інше'
      },
      modal: {
        overview: 'Огляд Проекту',
        features: 'Ключові Функції',
        challenges: 'Виклики та Навчання',
        mainChallenges: 'Основні Виклики:',
        whatLearned: 'Що Я Вивчив:',
        techStack: 'Технологічний Стек',
        repoLanguages: 'Мови Репозиторію:',
        repoStats: 'Статистика Репозиторію',
        projectDetails: 'Деталі Проекту',
        category: 'Категорія',
        created: 'Створено',
        size: 'Розмір',
        license: 'Ліцензія',
        topics: 'Теми',
        liveDemo: 'Жива Демо',
        viewCode: 'Переглянути Код'
      },
      stats: {
        stars: 'Зірки',
        forks: 'Форки',
        watchers: 'Спостерігачі',
        primaryLanguage: 'Основна Мова',
        lastCommit: 'Останній Коміт',
        openIssues: 'Відкриті Проблеми'
      },
      actions: {
        code: 'Код',
        demo: 'Демо'
      }
    },

    // Skills Section
    skills: {
      label: 'Навички',
      title: 'Технічна Експертиза',
      description: 'Технології та інструменти, які я використовую для втілення ідей',
      programmingLanguages: 'Мови Програмування',
      technicalExpertise: 'Технічна Експертиза',
      levels: {
        expert: 'Експерт',
        advanced: 'Просунутий',
        intermediate: 'Середній',
        beginner: 'Початківець'
      },
      categories: {
        backend: {
          name: 'Backend',
          title: 'Серверна Розробка',
          description: 'Створення надійних та масштабованих серверних додатків'
        },
        frontend: {
          name: 'Frontend',
          title: 'Розробка Інтерфейсів',
          description: 'Створення інтерактивних та адаптивних користувацьких інтерфейсів'
        },
        database: {
          name: 'База Даних',
          title: 'Управління Даними',
          description: 'Проектування та оптимізація систем баз даних'
        },
        design: {
          name: 'Дизайн',
          title: 'UI/UX Фреймворки',
          description: 'Створення красивих та функціональних інтерфейсів'
        },
        system: {
          name: 'Система',
          title: 'Системне Адміністрування',
          description: 'Управління та налаштування операційних систем і інструментів розробки'
        },
        tools: {
          name: 'Інструменти',
          title: 'Інструменти Розробки',
          description: 'IDE, редактори та інструменти середовища розробки для ефективного кодування'
        }
      },
      summary: {
        languages: 'Мов',
        categories: 'Категорій',
        technologies: 'Технологій'
      }
    },

    // Roadmap Section
    roadmap: {
      label: 'Моя Подорож',
      title: 'Карта Розвитку',
      description: 'Моя постійна подорож навчання та професійні віхи в розробці програмного забезпечення',
      timeline: {
        python: {
          date: 'Вересень 2020',
          title: 'Почав Вивчати Python',
          description: 'Початок моєї подорожі в програмування з основ Python'
        },
        rails: {
          date: 'Грудень 2023',
          title: 'Веб-розробка з Ruby on Rails',
          description: 'Поглиблення у веб-розробку та вивчення фреймворку Rails'
        },
        firstProjects: {
          date: 'Січень 2024',
          title: 'Перші Rails Проекти',
          description: 'Робота над реальними проектами та отримання практичного досвіду'
        },
        django: {
          date: 'Серпень 2024',
          title: 'Розробка на Django',
          description: 'Розширення backend навичок з фреймворком Django'
        },
        javascript: {
          date: 'Листопад 2024',
          title: 'Початок Подорожі з JavaScript',
          description: 'Початок frontend розробки з JavaScript'
        },
        react: {
          date: 'Січень 2025',
          title: 'Розробка на React',
          description: 'Освоєння сучасної frontend розробки з React'
        },
        degree: {
          date: 'Липень 2025',
          title: 'Ступінь Бакалавра',
          description: 'Отримав ступінь бакалавра з комп\'ютерних наук'
        }
      },
      stats: {
        yearsOfLearning: 'Років Навчання',
        programmingLanguages: 'Мов Програмування',
        majorMilestones: 'Основних Віх'
      }
    },

    // Contact Section
    contact: {
      label: 'Зв\'язатися',
      title: 'Давайте Співпрацювати',
      description: 'Готові до співпраці? Давайте обговоримо ваш наступний проект та втілимо ваші ідеї',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Пошта',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Барджеєв Антон. Створено з пристрастю та сучасними технологіями.',
      status: {
        available: 'Доступний для нових проектів',
        remote: 'Підтримую віддалену роботу'
      }
    },

    // Loading & Common
    common: {
      loading: 'Завантаження...',
      loadingProjects: 'Завантаження проектів...'
    }
  },

  pl: {
    // Header & Navigation
    header: {
      portfolio: 'Moje Portfolio',
      language: 'Język'
    },
    nav: {
      about: 'O mnie',
      projects: 'Projekty',
      skills: 'Umiejętności',
      contact: 'Kontakt'
    },

    // About Section
    about: {
      welcome: 'Witaj',
      title: 'Jestem',
      roles: ['Absolwentem Informatyki', 'Początkującym Deweloperem', 'Entuzjastą Technologii', 'Rozwiązywaczem Problemów'],
      description: 'Świeży absolwent informatyki, który pasjonuje się tworzeniem aplikacji webowych i nauką nowych technologii. Lubię tworzyć projekty łączące kreatywność z programowaniem.',
      badges: {
        learning: 'Ciągle Się Uczę',
        creative: 'Kreatywnie Myślę',
        motivated: 'Zmotywowany'
      },
      buttons: {
        viewWork: 'Zobacz Moje Prace',
        getInTouch: 'Skontaktuj Się'
      }
    },

    // Projects Section
    projects: {
      label: 'Portfolio',
      title: 'Wybrane Projekty',
      description: 'Kolekcja projektów pokazujących moje umiejętności i pasję do programowania',
      refreshButton: 'Odśwież Dane GitHub',
      refreshing: 'Odświeżanie...',
      clickDetails: 'Kliknij po szczegóły',
      status: {
        production: 'Produkcja',
        development: 'Aktywny Rozwój',
        completed: 'Ukończone',
        archived: 'Zarchiwizowane'
      },
      category: {
        'full-stack': 'Full-Stack',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'mobile': 'Mobilne',
        'data-viz': 'Wizualizacja Danych',
        'ai-ml': 'SI/ML',
        'other': 'Inne'
      },
      modal: {
        overview: 'Przegląd Projektu',
        features: 'Kluczowe Funkcje',
        challenges: 'Wyzwania i Nauka',
        mainChallenges: 'Główne Wyzwania:',
        whatLearned: 'Czego Się Nauczyłem:',
        techStack: 'Stos Technologiczny',
        repoLanguages: 'Języki Repozytorium:',
        repoStats: 'Statystyki Repozytorium',
        projectDetails: 'Szczegóły Projektu',
        category: 'Kategoria',
        created: 'Utworzone',
        size: 'Rozmiar',
        license: 'Licencja',
        topics: 'Tematy',
        liveDemo: 'Demo Na Żywo',
        viewCode: 'Zobacz Kod'
      },
      stats: {
        stars: 'Gwiazdki',
        forks: 'Forki',
        watchers: 'Obserwatorzy',
        primaryLanguage: 'Główny Język',
        lastCommit: 'Ostatni Commit',
        openIssues: 'Otwarte Problemy'
      },
      actions: {
        code: 'Kod',
        demo: 'Demo'
      }
    },

    // Skills Section
    skills: {
      label: 'Umiejętności',
      title: 'Ekspertyza Techniczna',
      description: 'Technologie i narzędzia, których używam do realizacji pomysłów',
      programmingLanguages: 'Języki Programowania',
      technicalExpertise: 'Ekspertyza Techniczna',
      levels: {
        expert: 'Ekspert',
        advanced: 'Zaawansowany',
        intermediate: 'Średniozaawansowany',
        beginner: 'Początkujący'
      },
      categories: {
        backend: {
          name: 'Backend',
          title: 'Rozwój Serwerowy',
          description: 'Budowanie solidnych i skalowalnych aplikacji serwerowych'
        },
        frontend: {
          name: 'Frontend',
          title: 'Rozwój Interfejsów',
          description: 'Tworzenie interaktywnych i responsywnych doświadczeń użytkownika'
        },
        database: {
          name: 'Baza Danych',
          title: 'Zarządzanie Danymi',
          description: 'Projektowanie i optymalizacja systemów baz danych'
        },
        design: {
          name: 'Design',
          title: 'Frameworki UI/UX',
          description: 'Tworzenie pięknych i funkcjonalnych interfejsów'
        },
        system: {
          name: 'System',
          title: 'Administracja Systemowa',
          description: 'Zarządzanie i konfiguracja systemów operacyjnych oraz narzędzi programistycznych'
        },
        tools: {
          name: 'Narzędzia',
          title: 'Narzędzia Programistyczne',
          description: 'IDE, edytory i narzędzia środowiska programistycznego dla efektywnego kodowania'
        }
      },
      summary: {
        languages: 'Języków',
        categories: 'Kategorii',
        technologies: 'Technologii'
      }
    },

    // Roadmap Section
    roadmap: {
      label: 'Moja Droga',
      title: 'Mapa Rozwoju',
      description: 'Moja ciągła podróż w nauce i kamienie milowe w rozwoju oprogramowania',
      timeline: {
        python: {
          date: 'Wrzesień 2020',
          title: 'Rozpocząłem Naukę Python',
          description: 'Początek mojej podróży programistycznej z podstawami Python'
        },
        rails: {
          date: 'Grudzień 2023',
          title: 'Rozwój Web z Ruby on Rails',
          description: 'Zagłębianie się w rozwój web i nauka frameworka Rails'
        },
        firstProjects: {
          date: 'Styczeń 2024',
          title: 'Pierwsze Projekty Rails',
          description: 'Praca nad rzeczywistymi projektami i zdobywanie praktycznego doświadczenia'
        },
        django: {
          date: 'Sierpień 2024',
          title: 'Rozwój Django',
          description: 'Rozszerzanie umiejętności backend z frameworkiem Django'
        },
        javascript: {
          date: 'Listopad 2024',
          title: 'Początek Podróży z JavaScript',
          description: 'Rozpoczęcie rozwoju frontend z JavaScript'
        },
        react: {
          date: 'Styczeń 2025',
          title: 'Rozwój React',
          description: 'Opanowywanie nowoczesnego rozwoju frontend z React'
        },
        degree: {
          date: 'Lipiec 2025',
          title: 'Tytuł Licencjata',
          description: 'Otrzymałem tytuł licencjata z informatyki'
        }
      },
      stats: {
        yearsOfLearning: 'Lat Nauki',
        programmingLanguages: 'Języków Programowania',
        majorMilestones: 'Głównych Kamieni Milowych'
      }
    },

    // Contact Section
    contact: {
      label: 'Skontaktuj Się',
      title: 'Nawiążmy Współpracę',
      description: 'Gotowy na współpracę? Porozmawiajmy o Twoim następnym projekcie i wcielmy Twoje pomysły w życie',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Email',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Bardzheiev Anton. Stworzone z pasją i nowoczesnymi technologiami.',
      status: {
        available: 'Dostępny dla nowych projektów',
        remote: 'Praca zdalna mile widziana'
      }
    },

    // Loading & Common
    common: {
      loading: 'Ładowanie...',
      loadingProjects: 'Ładowanie projektów...'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};