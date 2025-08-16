from django.db import models
from datetime import date
import uuid
from django.contrib.auth.models import User

# -----------------------------
# User Model
# -----------------------------
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, null=True, unique=True)
    password = models.CharField(max_length=100)
    mobile = models.BigIntegerField()
    reg_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# -----------------------------
# Company Model
# -----------------------------
class Company(models.Model):
    company_name = models.CharField(max_length=50)
    company_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.company_name

# -----------------------------
# Vehicle Model
# -----------------------------
FUEL_CHOICES = [
    ('Petrol', 'Petrol'),
    ('CNG', 'CNG'),
    ('Electric', 'Electric'),
]

class Vehicle(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    vehicle_name = models.CharField(max_length=50)
    vehicle_rent_price = models.DecimalField(max_digits=10, decimal_places=2)
    vehicle_desc = models.TextField(max_length=200, null=True, blank=True)
    image1 = models.ImageField(upload_to='vehicle_images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='vehicle_images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='vehicle_images/', null=True, blank=True)
    image4 = models.ImageField(upload_to='vehicle_images/', null=True, blank=True)
    vehicle_fuel_type = models.CharField(max_length=20, choices=FUEL_CHOICES)
    vehicle_model_year = models.CharField(max_length=20)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.vehicle_name

# -----------------------------
# Booking Model
# -----------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True , editable=False)
    booking_id = models.CharField(max_length=20, unique=True, null=True , editable=False)
    booking_desc = models.CharField(max_length=200, blank=True, null=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    is_returned = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Generate booking_id only if new
        if not self.booking_id:
            self.booking_id = uuid.uuid4().hex[:8].upper()

        # Calculate total_price based on days × vehicle price
        if self.start_date and self.end_date and self.vehicle:
            days = (self.end_date - self.start_date).days
            days = days if days > 0 else 1  # at least 1 day
            self.total_price = self.vehicle.vehicle_rent_price * days
        else:
            self.total_price = 0

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.vehicle} ({self.start_date} to {self.end_date})"