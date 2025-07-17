from django.db import models
import requests
from django.core.cache import cache
from datetime import datetime, timedelta


class Project(models.Model):
    STATUS_CHOICES = [
        ('production', 'Production'),
        ('development', 'Active Development'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    CATEGORY_CHOICES = [
        ('full-stack', 'Full-Stack'),
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('mobile', 'Mobile'),
        ('data-viz', 'Data Visualization'),
        ('ai-ml', 'AI/ML'),
        ('other', 'Other'),
    ]

    # Language choices - simple approach
    LANGUAGE_CHOICES = [
        ('en', 'English 🇺🇸'),
        ('uk', 'Ukrainian 🇺🇦'),
        ('pl', 'Polish 🇵🇱'),
    ]

    # Basic fields (existing)
    name = models.CharField(max_length=100)
    github_url = models.URLField()
    demo_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True)
    stack = models.CharField(max_length=200, blank=True)

    # Enhanced fields for GitHub integration
    repo_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="GitHub repository name (e.g., 'chnu-db', 'films-library')"
    )
    github_username = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Your GitHub username (e.g., 'iBarzha')"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='development'
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='other'
    )

    # Language field - which language this project is for
    language = models.CharField(
        max_length=10,
        choices=LANGUAGE_CHOICES,
        default='en',
        help_text="Which language version is this project for?"
    )

    # Project details
    features = models.JSONField(default=list, blank=True, help_text="List of key features")
    challenges = models.TextField(blank=True, help_text="Main challenges faced")
    learning = models.TextField(blank=True, help_text="What you learned from this project")

    # Display settings (existing)
    show = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False, help_text="Show as featured project")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # GitHub data cache
    github_data = models.JSONField(default=dict, blank=True)
    github_data_updated = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['language', 'order', '-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_language_display()})"

    @property
    def github_api_url(self):
        """Generate GitHub API URL for this repository"""
        if not self.github_username or not self.repo_name:
            return None
        return f"https://api.github.com/repos/{self.github_username}/{self.repo_name}"

    def fetch_github_data(self, force_refresh=False):
        """Fetch fresh data from GitHub API"""
        # Skip if no GitHub username or repo name
        if not self.github_username or not self.repo_name:
            return self.github_data

        # Check cache first (refresh every hour)
        cache_key = f"github_data_{self.id}"

        if not force_refresh and self.github_data_updated:
            time_diff = datetime.now() - self.github_data_updated.replace(tzinfo=None)
            if time_diff < timedelta(hours=1) and self.github_data:
                return self.github_data

        try:
            # Fetch repository data
            repo_response = requests.get(self.github_api_url, timeout=10)

            if repo_response.status_code == 200:
                repo_data = repo_response.json()

                # Fetch latest commit
                commits_url = f"{self.github_api_url}/commits"
                commits_response = requests.get(f"{commits_url}?per_page=1", timeout=10)
                last_commit = None

                if commits_response.status_code == 200:
                    commits_data = commits_response.json()
                    if commits_data:
                        last_commit = commits_data[0]['commit']['author']['date']

                # Fetch languages
                languages_url = f"{self.github_api_url}/languages"
                languages_response = requests.get(languages_url, timeout=10)
                languages = {}

                if languages_response.status_code == 200:
                    languages = languages_response.json()

                # Compile GitHub data
                github_data = {
                    'stars': repo_data.get('stargazers_count', 0),
                    'forks': repo_data.get('forks_count', 0),
                    'watchers': repo_data.get('watchers_count', 0),
                    'open_issues': repo_data.get('open_issues_count', 0),
                    'language': repo_data.get('language'),
                    'languages': languages,
                    'size': repo_data.get('size', 0),  # in KB
                    'created_at': repo_data.get('created_at'),
                    'updated_at': repo_data.get('updated_at'),
                    'last_commit': last_commit,
                    'default_branch': repo_data.get('default_branch', 'main'),
                    'topics': repo_data.get('topics', []),
                    'license': repo_data.get('license', {}).get('name') if repo_data.get('license') else None,
                    'has_wiki': repo_data.get('has_wiki', False),
                    'has_pages': repo_data.get('has_pages', False),
                }

                # Update model
                self.github_data = github_data
                self.github_data_updated = datetime.now()
                self.save(update_fields=['github_data', 'github_data_updated'])

                # Cache the data
                cache.set(cache_key, github_data, 3600)  # Cache for 1 hour

                return github_data

        except requests.RequestException as e:
            print(f"Error fetching GitHub data for {self.name}: {e}")

        return self.github_data  # Return cached data if API fails

    def get_display_languages(self):
        """Get top 3 languages used in the repository"""
        if not self.github_data or 'languages' not in self.github_data:
            return []

        languages = self.github_data['languages']
        if not languages:
            return []

        # Sort by bytes of code and get top 3
        sorted_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)
        return [lang[0] for lang in sorted_languages[:3]]

    def get_repo_size_mb(self):
        """Get repository size in MB"""
        if self.github_data and 'size' in self.github_data:
            return round(self.github_data['size'] / 1024, 2)
        return 0

    @property
    def is_github_data_stale(self):
        """Check if GitHub data needs refreshing"""
        if not self.github_data_updated or not self.github_username or not self.repo_name:
            return False

        time_diff = datetime.now() - self.github_data_updated.replace(tzinfo=None)
        return time_diff > timedelta(hours=1)


# Management command helper model
class GitHubAPIConfig(models.Model):
    """Store GitHub API configuration"""
    github_token = models.CharField(
        max_length=100,
        blank=True,
        help_text="GitHub Personal Access Token for higher rate limits"
    )
    last_rate_limit_reset = models.DateTimeField(null=True, blank=True)
    requests_remaining = models.IntegerField(default=60)

    class Meta:
        verbose_name = "GitHub API Configuration"
        verbose_name_plural = "GitHub API Configuration"

    def __str__(self):
        return f"GitHub API Config - {self.requests_remaining} requests remaining"