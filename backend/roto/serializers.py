from rest_framework import serializers
from .models import *

class Companyserializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_date']

class Vehicleserializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()

    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_name', 'company', 'company_name', 'vehicle_rent_price',
                  'vehicle_desc', 'image1', 'image2', 'image3', 'image4',
                  'vehicle_fuel_type', 'vehicle_model_year', 'is_available']

    def get_image1(self, obj):
        request = self.context.get('request')
        if obj.image1 and hasattr(obj.image1, 'url'):
            return request.build_absolute_uri(obj.image1.url)
        return None

    def get_image2(self, obj):
        request = self.context.get('request')
        if obj.image2 and hasattr(obj.image2, 'url'):
            return request.build_absolute_uri(obj.image2.url)
        return None

    def get_image3(self, obj):
        request = self.context.get('request')
        if obj.image3 and hasattr(obj.image3, 'url'):
            return request.build_absolute_uri(obj.image3.url)
        return None

    def get_image4(self, obj):
        request = self.context.get('request')
        if obj.image4 and hasattr(obj.image4, 'url'):
            return request.build_absolute_uri(obj.image4.url)
        return None


class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'mobile', 'reg_date']


class BookingSerializer(serializers.ModelSerializer):
    vehicle_name = serializers.CharField(source='vehicle.vehicle_name', read_only=True)
    class Meta:
        model = Booking
        fields = ['user', 'vehicle','vehicle_name', 'start_date', 'end_date', 'total_price', 'booking_id', 'booking_desc', 'booking_date', 'is_returned'] 
        read_only_fields = ('booking_id', 'total_price')

