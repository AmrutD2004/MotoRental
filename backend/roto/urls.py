from django.urls import path, include
from .views import *
urlpatterns = [
    path('login/', login, name='login'),
    path('add-company/', add_company, name='add_company'),
    path('manage-company/',manage_company, name='manage_company'),
    path('add-vehicles/',add_vehicles, name='add_vehicles'),
    path('manage-vehicle/',manage_vehicle, name='manage_vehicle'),
    path('update-company/<int:company_id>/',update_company, name='update_company'),
    path('delete-company/<int:company_id>/',delete_company, name='delete_company'),
    path('update-vehicle/<int:vehicle_id>/',update_vehicle, name='update_vehicle'),
    path('user-signup/',user_signup, name='user_signup'),
    path('user-login/',user_login, name='user_login'),
    path('search-vehicle/',search_vehicle, name='search_vehicle'),
    path('detail-vehicle/<int:vehicle_id>/',detail_vehicle, name='detail_vehicle'),
    path('vehicle-booking/',vehicle_booking, name='vehicle_booking'),
    path('user-bookings/<int:user_id>',user_bookings, name='user_bookings'),
]