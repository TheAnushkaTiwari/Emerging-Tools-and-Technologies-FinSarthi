from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    # Link to the standard Django User
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Demographics (Crucial for the Persona Engine)
    age = models.IntegerField(help_text="Used to determine risk appetite and schemes")
    
    OCCUPATION_CHOICES = [
        ('student', 'Student'),
        ('entry_level', 'Early Career (0-5 yrs)'),
        ('mid_senior', 'Mid/Senior Professional'),
        ('retired', 'Retired'),
        ('business', 'Business Owner'),
    ]
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES)
    
    # Financial Context (Optional for now, but good for resume)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} ({self.occupation})"