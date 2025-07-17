from django.contrib import admin
from .models import Project, GitHubAPIConfig


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'language', 'status', 'category', 'featured', 'show', 'order', 'github_username',
                    'repo_name')
    list_editable = ('show', 'order', 'featured', 'status')
    list_filter = ('language', 'status', 'category', 'featured', 'show', 'created_at')
    search_fields = ('name', 'description', 'stack', 'github_username', 'repo_name')
    readonly_fields = ('created_at', 'updated_at', 'github_data_updated')

    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'language', 'description', 'status', 'category', 'featured'),
            'description': 'Basic project information. Language determines which language version this project is for.'
        }),
        ('URLs & Links', {
            'fields': ('github_url', 'demo_url')
        }),
        ('GitHub Integration', {
            'fields': ('github_username', 'repo_name'),
            'description': 'Fill these fields to enable GitHub API integration'
        }),
        ('Technical Details', {
            'fields': ('stack', 'features', 'challenges', 'learning'),
            'classes': ('collapse',),
            'description': 'Write content in the language specified above'
        }),
        ('Display Settings', {
            'fields': ('show', 'order'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'github_data_updated'),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        """Order by language first, then by order"""
        return super().get_queryset(request)

    def save_model(self, request, obj, form, change):
        """Auto-set order based on language if not specified"""
        if not change and obj.order == 0:  # New object with default order
            # Get the highest order for this language
            max_order = Project.objects.filter(language=obj.language).aggregate(
                max_order=models.Max('order')
            )['max_order'] or 0
            obj.order = max_order + 1
        super().save_model(request, obj, form, change)


@admin.register(GitHubAPIConfig)
class GitHubAPIConfigAdmin(admin.ModelAdmin):
    list_display = ('github_token', 'requests_remaining', 'last_rate_limit_reset')
    readonly_fields = ('last_rate_limit_reset',)