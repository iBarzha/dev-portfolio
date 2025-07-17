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
      roles: ['Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Creative Coder'],
      description: 'I craft exceptional digital experiences with modern technologies. Passionate about creating responsive, user-friendly applications that solve real-world problems.',
      badges: {
        cleanCode: 'Clean Code',
        modernDesign: 'Modern Design',
        performance: 'Performance'
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
      proficiency: 'Skill Proficiency'
    },

    // Achievements Section
    achievements: {
      label: 'Achievements',
      title: 'My Journey',
      description: 'Milestones and accomplishments that define my professional growth',
      stats: {
        projects: 'Projects Completed',
        satisfaction: 'Client Satisfaction',
        awards: 'Awards Won',
        experience: 'Years in Field',
        linesOfCode: 'Lines of Code',
        availability: 'Availability',
        dedication: 'Dedication'
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
      roles: ['Full-Stack Розробник', 'Вирішувач Проблем', 'Ентузіаст Технологій', 'Креативний Програміст'],
      description: 'Я створюю виняткові цифрові рішення з використанням сучасних технологій. Захоплююся створенням адаптивних, зручних додатків, які вирішують реальні проблеми.',
      badges: {
        cleanCode: 'Чистий Код',
        modernDesign: 'Сучасний Дизайн',
        performance: 'Продуктивність'
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
      proficiency: 'Рівень Навичок'
    },

    // Achievements Section
    achievements: {
      label: 'Досягнення',
      title: 'Моя Подорож',
      description: 'Віхи та досягнення, які визначають мій професійний ріст',
      stats: {
        projects: 'Завершених Проектів',
        satisfaction: 'Задоволення Клієнтів',
        awards: 'Отриманих Нагород',
        experience: 'Років Досвіду',
        linesOfCode: 'Рядків Коду',
        availability: 'Доступність',
        dedication: 'Відданість'
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
      copyright: '© 2025 Бардзєєв Антон. Створено з пристрастю та сучасними технологіями.',
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
      roles: ['Full-Stack Deweloperem', 'Rozwiązywaczem Problemów', 'Entuzjastą Technologii', 'Kreatywnym Programistą'],
      description: 'Tworzę wyjątkowe doświadczenia cyfrowe przy użyciu nowoczesnych technologii. Pasjonuję się tworzeniem responsywnych, przyjaznych użytkownikowi aplikacji, które rozwiązują rzeczywiste problemy.',
      badges: {
        cleanCode: 'Czysty Kod',
        modernDesign: 'Nowoczesny Design',
        performance: 'Wydajność'
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
      proficiency: 'Poziom Umiejętności'
    },

    // Achievements Section
    achievements: {
      label: 'Osiągnięcia',
      title: 'Moja Droga',
      description: 'Kamienie milowe i osiągnięcia definiujące mój rozwój zawodowy',
      stats: {
        projects: 'Ukończonych Projektów',
        satisfaction: 'Zadowolenie Klientów',
        awards: 'Zdobytych Nagród',
        experience: 'Lat Doświadczenia',
        linesOfCode: 'Linii Kodu',
        availability: 'Dostępność',
        dedication: 'Zaangażowanie'
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