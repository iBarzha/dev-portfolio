from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    github_link = models.URLField()
    demo_link = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/')

    def __str__(self):
        return self.title
