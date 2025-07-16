from rest_framework import serializers
from .models import Project, GitHubAPIConfig


class ProjectSerializer(serializers.ModelSerializer):
    github_stats = serializers.SerializerMethodField()
    display_languages = serializers.SerializerMethodField()
    repo_size_mb = serializers.SerializerMethodField()
    is_github_data_stale = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'github_url',
            'demo_url',
            'description',
            'stack',
            'repo_name',
            'github_username',
            'status',
            'category',
            'features',
            'challenges',
            'learning',
            'show',
            'order',
            'featured',
            'created_at',
            'updated_at',
            'github_stats',
            'display_languages',
            'repo_size_mb',
            'is_github_data_stale',
        ]

    def get_github_stats(self, obj):
        """Return GitHub statistics"""
        if not obj.github_data:
            return None

        return {
            'stars': obj.github_data.get('stars', 0),
            'forks': obj.github_data.get('forks', 0),
            'watchers': obj.github_data.get('watchers', 0),
            'open_issues': obj.github_data.get('open_issues', 0),
            'language': obj.github_data.get('language'),
            'size': obj.github_data.get('size', 0),
            'created_at': obj.github_data.get('created_at'),
            'updated_at': obj.github_data.get('updated_at'),
            'last_commit': obj.github_data.get('last_commit'),
            'default_branch': obj.github_data.get('default_branch', 'main'),
            'topics': obj.github_data.get('topics', []),
            'license': obj.github_data.get('license'),
            'has_wiki': obj.github_data.get('has_wiki', False),
            'has_pages': obj.github_data.get('has_pages', False),
        }

    def get_display_languages(self, obj):
        """Return top 3 languages used in the repository"""
        return obj.get_display_languages()

    def get_repo_size_mb(self, obj):
        """Return repository size in MB"""
        return obj.get_repo_size_mb()

    def get_is_github_data_stale(self, obj):
        """Check if GitHub data needs refreshing"""
        return obj.is_github_data_stale


class ProjectDetailSerializer(ProjectSerializer):
    """Detailed serializer with all GitHub data"""
    full_github_data = serializers.SerializerMethodField()

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['full_github_data']

    def get_full_github_data(self, obj):
        """Return complete GitHub data"""
        return obj.github_data


class ProjectUpdateGitHubSerializer(serializers.Serializer):
    """Serializer for updating GitHub data"""
    project_ids = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        help_text="List of project IDs to update. If empty, updates all projects."
    )
    force_refresh = serializers.BooleanField(
        default=False,
        help_text="Force refresh even if data is not stale"
    )