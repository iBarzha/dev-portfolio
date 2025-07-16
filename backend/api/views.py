from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Project
from .serializers import (
    ProjectSerializer,
    ProjectDetailSerializer,
    ProjectUpdateGitHubSerializer
)
from django.utils import timezone
from datetime import timedelta
import threading


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Project model with GitHub integration

    Provides:
    - List view with basic GitHub stats
    - Detail view with complete GitHub data
    - Action to refresh GitHub data
    - Filtering by category, status, featured
    """

    # Add the required queryset attribute
    queryset = Project.objects.filter(show=True).order_by('order', '-created_at')
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = self.queryset

        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)

        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        # Filter by featured
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(featured=True)

        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(stack__icontains=search)
            )

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectSerializer

    def list(self, request, *args, **kwargs):
        """List projects with automatic GitHub data refresh for stale data"""
        queryset = self.get_queryset()

        # Check for stale GitHub data and refresh in background
        stale_projects = [p for p in queryset if p.is_github_data_stale]
        if stale_projects:
            # Refresh stale data in background thread
            thread = threading.Thread(
                target=self._refresh_github_data_background,
                args=(stale_projects,)
            )
            thread.start()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """Retrieve single project with fresh GitHub data"""
        instance = self.get_object()

        # Refresh GitHub data if stale
        if instance.is_github_data_stale:
            instance.fetch_github_data()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='refresh-github')
    def refresh_github_data(self, request):
        """
        Manually refresh GitHub data for projects

        POST /api/projects/refresh-github/
        Body: {
            "project_ids": [1, 2, 3],  # Optional: specific project IDs
            "force_refresh": true       # Optional: force refresh even if not stale
        }
        """
        serializer = ProjectUpdateGitHubSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        project_ids = serializer.validated_data.get('project_ids', [])
        force_refresh = serializer.validated_data.get('force_refresh', False)

        # Get projects to update
        if project_ids:
            projects = Project.objects.filter(id__in=project_ids, show=True)
        else:
            projects = Project.objects.filter(show=True)

        # Update GitHub data
        updated_projects = []
        failed_projects = []

        for project in projects:
            try:
                github_data = project.fetch_github_data(force_refresh=force_refresh)
                if github_data:
                    updated_projects.append({
                        'id': project.id,
                        'name': project.name,
                        'github_stats': github_data
                    })
                else:
                    failed_projects.append({
                        'id': project.id,
                        'name': project.name,
                        'error': 'Failed to fetch GitHub data'
                    })
            except Exception as e:
                failed_projects.append({
                    'id': project.id,
                    'name': project.name,
                    'error': str(e)
                })

        return Response({
            'message': f'GitHub data refresh completed',
            'updated_count': len(updated_projects),
            'failed_count': len(failed_projects),
            'updated_projects': updated_projects,
            'failed_projects': failed_projects,
            'timestamp': timezone.now()
        })

    @action(detail=True, methods=['post'], url_path='refresh-github')
    def refresh_single_github_data(self, request, pk=None):
        """
        Refresh GitHub data for a single project

        POST /api/projects/{id}/refresh-github/
        """
        project = self.get_object()

        try:
            github_data = project.fetch_github_data(force_refresh=True)
            if github_data:
                serializer = ProjectDetailSerializer(project)
                return Response({
                    'message': f'GitHub data refreshed for {project.name}',
                    'project': serializer.data,
                    'timestamp': timezone.now()
                })
            else:
                return Response({
                    'error': f'Failed to fetch GitHub data for {project.name}',
                    'timestamp': timezone.now()
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'error': f'Error refreshing GitHub data: {str(e)}',
                'timestamp': timezone.now()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='categories')
    def categories(self, request):
        """Get available project categories"""
        categories = Project.objects.filter(show=True).values_list('category', flat=True).distinct()
        return Response({
            'categories': list(categories),
            'category_choices': dict(Project.CATEGORY_CHOICES)
        })

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        """Get overall portfolio statistics"""
        projects = Project.objects.filter(show=True)

        total_stars = sum(
            p.github_data.get('stars', 0)
            for p in projects
            if p.github_data
        )

        total_forks = sum(
            p.github_data.get('forks', 0)
            for p in projects
            if p.github_data
        )

        languages = {}
        for project in projects:
            if project.github_data and 'languages' in project.github_data:
                for lang, bytes_count in project.github_data['languages'].items():
                    languages[lang] = languages.get(lang, 0) + bytes_count

        # Get top 5 languages
        top_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:5]

        return Response({
            'total_projects': projects.count(),
            'featured_projects': projects.filter(featured=True).count(),
            'total_stars': total_stars,
            'total_forks': total_forks,
            'top_languages': [{'name': lang, 'bytes': bytes_count} for lang, bytes_count in top_languages],
            'projects_by_status': {
                status_choice[0]: projects.filter(status=status_choice[0]).count()
                for status_choice in Project.STATUS_CHOICES
            },
            'projects_by_category': {
                category_choice[0]: projects.filter(category=category_choice[0]).count()
                for category_choice in Project.CATEGORY_CHOICES
            }
        })

    def _refresh_github_data_background(self, projects):
        """Background task to refresh GitHub data"""
        for project in projects:
            try:
                project.fetch_github_data()
            except Exception as e:
                print(f"Background refresh failed for {project.name}: {e}")

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectSerializer

    def list(self, request, *args, **kwargs):
        """List projects with automatic GitHub data refresh for stale data"""
        queryset = self.get_queryset()

        # Check for stale GitHub data and refresh in background
        stale_projects = [p for p in queryset if p.is_github_data_stale]
        if stale_projects:
            # Refresh stale data in background thread
            thread = threading.Thread(
                target=self._refresh_github_data_background,
                args=(stale_projects,)
            )
            thread.start()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """Retrieve single project with fresh GitHub data"""
        instance = self.get_object()

        # Refresh GitHub data if stale
        if instance.is_github_data_stale:
            instance.fetch_github_data()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='refresh-github')
    def refresh_github_data(self, request):
        """
        Manually refresh GitHub data for projects

        POST /api/projects/refresh-github/
        Body: {
            "project_ids": [1, 2, 3],  # Optional: specific project IDs
            "force_refresh": true       # Optional: force refresh even if not stale
        }
        """
        serializer = ProjectUpdateGitHubSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        project_ids = serializer.validated_data.get('project_ids', [])
        force_refresh = serializer.validated_data.get('force_refresh', False)

        # Get projects to update
        if project_ids:
            projects = Project.objects.filter(id__in=project_ids, show=True)
        else:
            projects = Project.objects.filter(show=True)

        # Update GitHub data
        updated_projects = []
        failed_projects = []

        for project in projects:
            try:
                github_data = project.fetch_github_data(force_refresh=force_refresh)
                if github_data:
                    updated_projects.append({
                        'id': project.id,
                        'name': project.name,
                        'github_stats': github_data
                    })
                else:
                    failed_projects.append({
                        'id': project.id,
                        'name': project.name,
                        'error': 'Failed to fetch GitHub data'
                    })
            except Exception as e:
                failed_projects.append({
                    'id': project.id,
                    'name': project.name,
                    'error': str(e)
                })

        return Response({
            'message': f'GitHub data refresh completed',
            'updated_count': len(updated_projects),
            'failed_count': len(failed_projects),
            'updated_projects': updated_projects,
            'failed_projects': failed_projects,
            'timestamp': timezone.now()
        })

    @action(detail=True, methods=['post'], url_path='refresh-github')
    def refresh_single_github_data(self, request, pk=None):
        """
        Refresh GitHub data for a single project

        POST /api/projects/{id}/refresh-github/
        """
        project = self.get_object()

        try:
            github_data = project.fetch_github_data(force_refresh=True)
            if github_data:
                serializer = ProjectDetailSerializer(project)
                return Response({
                    'message': f'GitHub data refreshed for {project.name}',
                    'project': serializer.data,
                    'timestamp': timezone.now()
                })
            else:
                return Response({
                    'error': f'Failed to fetch GitHub data for {project.name}',
                    'timestamp': timezone.now()
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({
                'error': f'Error refreshing GitHub data: {str(e)}',
                'timestamp': timezone.now()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='categories')
    def categories(self, request):
        """Get available project categories"""
        categories = Project.objects.filter(show=True).values_list('category', flat=True).distinct()
        return Response({
            'categories': list(categories),
            'category_choices': dict(Project.CATEGORY_CHOICES)
        })

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        """Get overall portfolio statistics"""
        projects = Project.objects.filter(show=True)

        total_stars = sum(
            p.github_data.get('stars', 0)
            for p in projects
            if p.github_data
        )

        total_forks = sum(
            p.github_data.get('forks', 0)
            for p in projects
            if p.github_data
        )

        languages = {}
        for project in projects:
            if project.github_data and 'languages' in project.github_data:
                for lang, bytes_count in project.github_data['languages'].items():
                    languages[lang] = languages.get(lang, 0) + bytes_count

        # Get top 5 languages
        top_languages = sorted(languages.items(), key=lambda x: x[1], reverse=True)[:5]

        return Response({
            'total_projects': projects.count(),
            'featured_projects': projects.filter(featured=True).count(),
            'total_stars': total_stars,
            'total_forks': total_forks,
            'top_languages': [{'name': lang, 'bytes': bytes_count} for lang, bytes_count in top_languages],
            'projects_by_status': {
                status_choice[0]: projects.filter(status=status_choice[0]).count()
                for status_choice in Project.STATUS_CHOICES
            },
            'projects_by_category': {
                category_choice[0]: projects.filter(category=category_choice[0]).count()
                for category_choice in Project.CATEGORY_CHOICES
            }
        })

    def _refresh_github_data_background(self, projects):
        """Background task to refresh GitHub data"""
        for project in projects:
            try:
                project.fetch_github_data()
            except Exception as e:
                print(f"Background refresh failed for {project.name}: {e}")