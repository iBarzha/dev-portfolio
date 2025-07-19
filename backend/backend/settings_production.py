"""
Production settings for PythonAnywhere deployment
"""
from .settings import *
import os
from decouple import config

SECRET_KEY = config('SECRET_KEY', default='django-insecure-fallback-key-for-development-only')

DEBUG = False

ALLOWED_HOSTS = [
    'barzha.pythonanywhere.com',
    'dev-portfolio-barzha.vercel.app',
    'localhost',
    '127.0.0.1'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/home/Barzha/dev-portfolio/backend/db.sqlite3',
    }
}

STATIC_URL = '/static/'
STATIC_ROOT = '/home/Barzha/dev-portfolio/backend/staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = '/home/Barzha/dev-portfolio/backend/media'
MEDIA_URL = '/media/'
MEDIA_ROOT = '/home/yourusername/dev-portfolio/backend/media'

CORS_ALLOWED_ORIGINS = [
    "https://dev-portfolio-barzha.vercel.app",
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True