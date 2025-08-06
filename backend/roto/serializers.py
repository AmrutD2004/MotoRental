from rest_framework import serializers
from .models import *

class Companyserializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_date']

class Vehicleserializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source = 'company.company_name' ,read_only = True)
    image1 = serializers.ImageField(required = False)
    image2 = serializers.ImageField(required = False)
    image3 = serializers.ImageField(required = False)
    image4 = serializers.ImageField(required = False)
    class Meta:
        model = Vehicle
        fields = ['id', 'company', 'company_name' ,'vehicle_name','vehicle_rent_price', 'vehicle_desc', 'vehicle_fuel_type', 'vehicle_model_year', 'image1', 'image2', 'image3', 'image4', 'is_available'  ]


class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'mobile', 'reg_date']