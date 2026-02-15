from django.contrib import admin

# Register your models here.
from .models import UserProfile

# This makes the UserProfile table visible in the Admin
admin.site.register(UserProfile)
