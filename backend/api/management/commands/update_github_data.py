from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Project
import time


class Command(BaseCommand):
    help = 'Update GitHub data for all projects'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Force refresh even if data is not stale',
        )
        parser.add_argument(
            '--project-id',
            type=int,
            help='Update specific project by ID',
        )
        parser.add_argument(
            '--delay',
            type=int,
            default=1,
            help='Delay between API calls in seconds (default: 1)',
        )

    def handle(self, *args, **options):
        force = options['force']
        project_id = options.get('project_id')
        delay = options['delay']

        if project_id:
            projects = Project.objects.filter(id=project_id, show=True)
            if not projects.exists():
                self.stdout.write(
                    self.style.ERROR(f'Project with ID {project_id} not found or not visible')
                )
                return
        else:
            projects = Project.objects.filter(show=True)

        total_projects = projects.count()
        self.stdout.write(f'Updating GitHub data for {total_projects} projects...')

        updated_count = 0
        failed_count = 0

        for i, project in enumerate(projects, 1):
            self.stdout.write(f'[{i}/{total_projects}] Updating {project.name}...', ending='')

            try:
                github_data = project.fetch_github_data(force_refresh=force)
                if github_data:
                    updated_count += 1
                    stars = github_data.get('stars', 0)
                    forks = github_data.get('forks', 0)
                    self.stdout.write(
                        self.style.SUCCESS(f' ✓ ({stars} stars, {forks} forks)')
                    )
                else:
                    failed_count += 1
                    self.stdout.write(self.style.ERROR(' ✗ Failed'))

            except Exception as e:
                failed_count += 1
                self.stdout.write(self.style.ERROR(f' ✗ Error: {e}'))

            # Add delay to respect GitHub rate limits
            if i < total_projects:
                time.sleep(delay)

        self.stdout.write('\n' + '=' * 50)
        self.stdout.write(
            self.style.SUCCESS(f'✓ Updated: {updated_count} projects')
        )
        if failed_count > 0:
            self.stdout.write(
                self.style.ERROR(f'✗ Failed: {failed_count} projects')
            )
        self.stdout.write(f'Completed at: {timezone.now()}')