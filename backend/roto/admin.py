from django.contrib import admin
from .models import *

# Register your models here.

class BookingAdmin(admin.ModelAdmin):
    readonly_fields = ('booking_id', 'total_price')  # Show as read-only fields
    list_display = ('booking_id', 'user', 'vehicle', 'start_date', 'end_date', 'total_price', 'is_returned')

admin.site.register(User)
admin.site.register(Company)
admin.site.register(Vehicle)
admin.site.register(Booking, BookingAdmin)
