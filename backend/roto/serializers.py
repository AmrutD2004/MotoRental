from rest_framework import serializers
from .models import *

class Companyserializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'company_date']
        
class VehicleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'vehicle_name',
            'company',
            'vehicle_rent_price',
            'vehicle_desc',
            'image1',
            'image2',
            'image3',
            'image4',
            'vehicle_fuel_type',
            'vehicle_model_year',
            'is_available'
        ]

class Vehicleserializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)

    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()

    class Meta:
        model = Vehicle
        fields = [
            'id', 'vehicle_name', 'company', 'company_name',
            'vehicle_rent_price', 'vehicle_desc',
            'image1', 'image2', 'image3', 'image4',
            'vehicle_fuel_type', 'vehicle_model_year', 'is_available'
        ]

    def _get_image_url(self, image):
        if not image:
            return None
        # Ensure we're returning the full Cloudinary URL
        if hasattr(image, 'url'):
            return image.url
        return None

    def get_image1(self, obj):
        return self._get_image_url(obj.image1)

    def get_image2(self, obj):
        return self._get_image_url(obj.image2)

    def get_image3(self, obj):
        return self._get_image_url(obj.image3)

    def get_image4(self, obj):
        return self._get_image_url(obj.image4)



class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'mobile', 'reg_date']


class BookingSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    vehicle_name = serializers.CharField(source='vehicle.vehicle_name', read_only=True)
    mobile = serializers.CharField(source='user.mobile', read_only=True)
    class Meta:
        model = Booking
        fields = ['user', 'first_name', 'vehicle','vehicle_name', 'mobile', 'start_date', 'end_date', 'total_price', 'booking_id', 'booking_desc', 'booking_date', 'is_returned', 'status'] 
        read_only_fields = ('booking_id', 'total_price', 'status')

    