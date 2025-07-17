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
      }
    },

    // Projects Section
    projects: {
      label: 'Portfolio',
      title: 'My Projects',
      description: 'Projects I\'ve built while learning and practicing programming',
      refreshButton: 'Refresh GitHub Data',
      refreshing: 'Refreshing...',
      clickDetails: 'Click for details',
      status: {
        production: 'Live',
        development: 'In Progress',
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
      title: 'What I Know',
      description: 'Technologies I\'ve learned and worked with',
      programmingLanguages: 'Programming Languages',
      technicalExpertise: 'Technical Skills',
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
          description: 'Building the behind-the-scenes parts of applications'
        },
        frontend: {
          name: 'Frontend',
          title: 'User Interface Development',
          description: 'Creating what users see and interact with'
        },
        database: {
          name: 'Database',
          title: 'Data Management',
          description: 'Storing and organizing information'
        },
        design: {
          name: 'Design',
          title: 'UI/UX Tools',
          description: 'Making applications look good and work well'
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
      title: 'Learning Path',
      description: 'My journey in learning programming and computer science',
      timeline: {
        python: {
          date: 'September 2020',
          title: 'Started Learning Python',
          description: 'First programming language - learned basics and fundamentals'
        },
        rails: {
          date: 'December 2023',
          title: 'Web Development with Ruby on Rails',
          description: 'Started building web applications'
        },
        firstProjects: {
          date: 'January 2024',
          title: 'First Rails Projects',
          description: 'Built my first real applications and learned from mistakes'
        },
        django: {
          date: 'August 2024',
          title: 'Django Development',
          description: 'Expanded knowledge with another web framework'
        },
        javascript: {
          date: 'November 2024',
          title: 'JavaScript Journey Begins',
          description: 'Started learning frontend development'
        },
        react: {
          date: 'January 2025',
          title: 'React Development',
          description: 'Learning modern frontend with React'
        },
        degree: {
          date: 'July 2025',
          title: "Bachelor's Degree",
          description: 'Graduated with a degree in Computer Science'
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
      description: 'Feel free to reach out if you want to chat about programming, projects, or opportunities',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Email',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Bardzheiev Anton. Built with passion for learning.',
      status: {
        available: 'Open to opportunities',
        remote: 'Open to remote work'
      }
    },

    // Loading & Common
    common: {
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
      }
    },

    // Projects Section
    projects: {
      label: 'Портфоліо',
      title: 'Мої Проекти',
      description: 'Проекти, які я створив під час навчання та практики програмування',
      refreshButton: 'Оновити GitHub Дані',
      refreshing: 'Оновлення...',
      clickDetails: 'Натисніть для деталей',
      status: {
        production: 'Робочий',
        development: 'В Процесі',
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
        liveDemo: 'Жива Демо',
        viewCode: 'Переглянути Код'
      },
      stats: {
        stars: 'Зірки',
        forks: 'Форки',
        watchers: 'Спостерігачі',
        primaryLanguage: 'Основна Мова',
        lastCommit: 'Останній Коміт',
      },
      actions: {
        code: 'Код',
        demo: 'Демо'
      }
    },

    // Skills Section
    skills: {
      label: 'Навички',
      title: 'Що Я Знаю',
      description: 'Технології, які я вивчив та з якими працював',
      programmingLanguages: 'Мови Програмування',
      technicalExpertise: 'Технічні Навички',
      levels: {
        expert: 'Впевнений',
        advanced: 'Просунутий',
        intermediate: 'проміжний',
        beginner: 'Початківець'
      },
      categories: {
        backend: {
          name: 'Backend',
          title: 'Серверна Розробка',
          description: 'Створення серверної частини додатків'
        },
        frontend: {
          name: 'Frontend',
          title: 'Розробка Інтерфейсів',
          description: 'Створення того, що бачать та з чим взаємодіють користувачі'
        },
        database: {
          name: 'База Даних',
          title: 'Управління Даними',
          description: 'Зберігання та організація інформації'
        },
        design: {
          name: 'Дизайн',
          title: 'UI/UX Інструменти',
          description: 'Роблю додатки красивими та зручними'
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
      title: 'Шлях Навчання',
      description: 'Моя подорож у вивченні програмування та комп\'ютерних наук',
      timeline: {
        python: {
          date: 'Вересень 2020',
          title: 'Почав Вивчати Python',
          description: 'Перша мова програмування - вивчив основи та фундаментальні принципи'
        },
        rails: {
          date: 'Грудень 2023',
          title: 'Веб-розробка з Ruby on Rails',
          description: 'Почав створювати веб-додатки'
        },
        firstProjects: {
          date: 'Січень 2024',
          title: 'Перші Rails Проекти',
          description: 'Створив свої перші справжні додатки та вчився на помилках'
        },
        django: {
          date: 'Серпень 2024',
          title: 'Розробка на Django',
          description: 'Розширив знання з іншим веб-фреймворком'
        },
        javascript: {
          date: 'Листопад 2024',
          title: 'Початок Подорожі з JavaScript',
          description: 'Почав вивчати frontend розробку'
        },
        react: {
          date: 'Січень 2025',
          title: 'Розробка на React',
          description: 'Вивчаю сучасний frontend з React'
        },
        degree: {
          date: 'Липень 2025',
          title: 'Ступінь Бакалавра',
          description: 'Закінчив з дипломом комп\'ютерних наук'
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
      title: 'Давайте Знайомитися',
      description: 'Не соромтеся звертатися, якщо хочете поговорити про програмування, проекти чи можливості',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Пошта',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Барджеєв Антон. Створено з пристрастю до навчання.',
      status: {
        available: 'Відкритий до можливостей',
        remote: 'Відкритий до віддаленої роботи'
      }
    },

    // Loading & Common
    common: {
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
      }
    },

    // Projects Section
    projects: {
      label: 'Portfolio',
      title: 'Moje Projekty',
      description: 'Projekty, które stworzyłem podczas nauki i praktyki programowania',
      refreshButton: 'Odśwież Dane GitHub',
      refreshing: 'Odświeżanie...',
      clickDetails: 'Kliknij po szczegóły',
      status: {
        production: 'Działający',
        development: 'W Trakcie',
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
        liveDemo: 'Demo Na Żywo',
        viewCode: 'Zobacz Kod'
      },
      stats: {
        stars: 'Gwiazdki',
        forks: 'Forki',
        watchers: 'Obserwatorzy',
        primaryLanguage: 'Główny Język',
        lastCommit: 'Ostatni Commit',
      },
      actions: {
        code: 'Kod',
        demo: 'Demo'
      }
    },

    // Skills Section
    skills: {
      label: 'Umiejętności',
      title: 'Co Umiem',
      description: 'Technologie, których się nauczyłem i z którymi pracowałem',
      programmingLanguages: 'Języki Programowania',
      technicalExpertise: 'Umiejętności Techniczne',
      levels: {
        expert: 'Pewny Siebie',
        advanced: 'zaawansowany',
        intermediate: 'pośredn',
        beginner: 'Początkujący'
      },
      categories: {
        backend: {
          name: 'Backend',
          title: 'Rozwój Serwerowy',
          description: 'Budowanie części aplikacji działającej za kulisami'
        },
        frontend: {
          name: 'Frontend',
          title: 'Rozwój Interfejsów',
          description: 'Tworzenie tego, co użytkownicy widzą i z czym wchodzą w interakcję'
        },
        database: {
          name: 'Baza Danych',
          title: 'Zarządzanie Danymi',
          description: 'Przechowywanie i organizowanie informacji'
        },
        design: {
          name: 'Design',
          title: 'Narzędzia UI/UX',
          description: 'Sprawianie, żeby aplikacje wyglądały dobrze i działały sprawnie'
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
      title: 'Ścieżka Nauki',
      description: 'Moja podróż w nauce programowania i informatyki',
      timeline: {
        python: {
          date: 'Wrzesień 2020',
          title: 'Rozpocząłem Naukę Python',
          description: 'Pierwszy język programowania - nauczyłem się podstaw i fundamentów'
        },
        rails: {
          date: 'Grudzień 2023',
          title: 'Rozwój Web z Ruby on Rails',
          description: 'Zacząłem budować aplikacje webowe'
        },
        firstProjects: {
          date: 'Styczeń 2024',
          title: 'Pierwsze Projekty Rails',
          description: 'Stworzyłem swoje pierwsze prawdziwe aplikacje i uczyłem się na błędach'
        },
        django: {
          date: 'Sierpień 2024',
          title: 'Rozwój Django',
          description: 'Poszerzyłem wiedzę o kolejny framework webowy'
        },
        javascript: {
          date: 'Listopad 2024',
          title: 'Początek Podróży z JavaScript',
          description: 'Zacząłem uczyć się rozwoju frontend'
        },
        react: {
          date: 'Styczeń 2025',
          title: 'Rozwój React',
          description: 'Uczę się nowoczesnego frontend z React'
        },
        degree: {
          date: 'Lipiec 2025',
          title: 'Tytuł Licencjata',
          description: 'Ukończyłem studia z tytułem licencjata informatyki'
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
      title: 'Nawiążmy Kontakt',
      description: 'Śmiało skontaktuj się, jeśli chcesz porozmawiać o programowaniu, projektach czy możliwościach',
      platforms: {
        github: 'GitHub',
        linkedin: 'LinkedIn',
        email: 'Email',
        telegram: 'Telegram'
      }
    },

    // Footer
    footer: {
      copyright: '© 2025 Bardzheiev Anton. Stworzone z pasją do nauki.',
      status: {
        available: 'Otwarty na możliwości',
        remote: 'Otwarty na pracę zdalną'
      }
    },

    // Loading & Common
    common: {
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