import { useEffect, useState } from 'react';
import {
  Globe,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Eye,
  Clock,
  Code,
  Play,
  GitCommit,
  Zap,
  X,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectsSection = () => {
  const { t, language } = useLanguage(); // Get current language
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async () => {
    try {
      // Add language parameter to API call
      const response = await fetch(`http://127.0.0.1:8000/api/projects/?language=${language}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshGitHubData = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/projects/refresh-github/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          force_refresh: true,
          language: language // Include current language
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('GitHub data refreshed:', result);
        // Refresh the projects list
        await fetchProjects();
      }
    } catch (error) {
      console.error('Error refreshing GitHub data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch projects when language changes
  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, [language]); // Re-fetch when language changes

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'production': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusDisplayName = (status) => {
    return t(`projects.status.${status}`) || status;
  };

  const getCategoryDisplayName = (category) => {
    return t(`projects.category.${category}`) || category;
  };

  const ProjectModal = ({ project, onClose }) => {
    const gitStats = project?.github_stats;

    // Handle Escape key press and body scroll lock
    useEffect(() => {
      if (!project) return;

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      // Cleanup function to restore scroll
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }, [project, onClose]);

    // Handle click outside modal
    const handleBackdropClick = (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!project) return null;

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-6 pt-20"
        onClick={handleBackdropClick}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-700 shadow-2xl transform transition-all duration-300 scale-100 mx-4">
          {/* Header */}
          <div className="relative p-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {getStatusDisplayName(project.status)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {getCategoryDisplayName(project.category)}
                    </span>
                    {/* Show language badge */}
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                      {project.language?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-md"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {t('projects.modal.overview')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      {t('projects.modal.features')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Zap size={16} className="text-cyan-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(project.challenges || project.learning) && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      {t('projects.modal.challenges')}
                    </h3>
                    <div className="space-y-3">
                      {project.challenges && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            {t('projects.modal.mainChallenges')}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {project.challenges}
                          </p>
                        </div>
                      )}
                      {project.learning && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            {t('projects.modal.whatLearned')}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {project.learning}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {t('projects.modal.techStack')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack?.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-300/50 dark:border-slate-600/50"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {project.display_languages && project.display_languages.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {t('projects.modal.repoLanguages')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.display_languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* GitHub Stats Sidebar */}
              <div className="space-y-6">
                {gitStats && (
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Github size={20} />
                      {t('projects.modal.repoStats')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.stats.stars')}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {gitStats.stars || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GitFork size={16} className="text-blue-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.stats.forks')}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {gitStats.forks || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye size={16} className="text-green-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.stats.watchers')}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {gitStats.watchers || 0}
                        </span>
                      </div>
                      {gitStats.language && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code size={16} className="text-purple-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.stats.primaryLanguage')}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {gitStats.language}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-cyan-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.stats.lastCommit')}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatDate(gitStats.last_commit || gitStats.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {t('projects.modal.projectDetails')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.modal.category')}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {getCategoryDisplayName(project.category)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Language</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {project.language?.toUpperCase()}
                      </span>
                    </div>
                    {gitStats?.created_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{t('projects.modal.created')}</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatDate(gitStats.created_at)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                >
                  <Play size={20} />
                  {t('projects.modal.liveDemo')}
                </a>
              )}
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
              >
                <Github size={20} />
                {t('projects.modal.viewCode')}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 pt-32 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">{t('common.loadingProjects')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 pt-32 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg">
              <Globe className="text-white" size={24} />
            </div>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-wide uppercase">
              {t('projects.label')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            {t('projects.description')}
          </p>

          {/* refresh button */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={refreshGitHubData}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? t('projects.refreshing') : t('projects.refreshButton')}
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No projects found for {language.toUpperCase()} language.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const gitStats = project.github_stats;

              return (
                <div
                  key={project.id}
                  className="group relative rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusDisplayName(project.status)}
                        </span>
                        {project.featured && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                          {project.language?.toUpperCase()}
                        </span>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-transform">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Project title */}
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {project.name}
                    </h3>

                    {/* Category */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                      {getCategoryDisplayName(project.category)}
                    </p>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* GitHub Stats Row */}
                    {gitStats && (
                      <div className="flex items-center gap-4 mb-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500" />
                          <span>{gitStats.stars || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={12} className="text-blue-500" />
                          <span>{gitStats.forks || 0}</span>
                        </div>
                        {gitStats.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>{gitStats.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{formatDate(gitStats.last_commit || gitStats.updated_at)}</span>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack?.split(',').slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-full border border-slate-300/50 dark:border-slate-600/50 font-medium"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                      {project.stack?.split(',').length > 3 && (
                        <span className="text-slate-500 dark:text-slate-400 text-xs px-2 py-1">
                          +{project.stack.split(',').length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors group/link text-sm"
                      >
                        <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                        {t('projects.actions.code')}
                      </a>
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors group/link text-sm"
                        >
                          <Play size={16} className="group-hover/link:scale-110 transition-transform" />
                          {t('projects.actions.demo')}
                        </a>
                      )}
                      <span className="text-slate-400 dark:text-slate-500 text-xs">
                        {t('projects.clickDetails')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;