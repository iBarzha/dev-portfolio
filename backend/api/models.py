from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=100)
    github_url = models.URLField()
    description = models.TextField(blank=True)
    stack = models.CharField(max_length=200, blank=True)
    show = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
