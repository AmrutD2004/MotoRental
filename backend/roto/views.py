from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        return Response({'message' : 'Login Successfull !..', 'username':username},status = 200)
    return Response({'message' : 'Invalid Credentials !..'},status = 401)

@api_view(['POST'])
def add_company(request):
    company_name = request.data.get('company_name')
    try:
        Company.objects.create(company_name=company_name)
        return Response({'message' : 'Company Added Successfully !..'},status = 200)
    except:
        return Response({'message' : 'Company Cannot Added !..'},status = 401)
    

@api_view(['GET'])
def manage_company(request):

    companies = Company.objects.all()
    companyData = Companyserializer(companies, many=True)
    return Response(companyData.data)

from rest_framework.parsers import MultiPartParser, FormParser
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_vehicles(request):
    serializer = VehicleCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Vehicle Added Successfully'}, status=201)

    return Response(serializer.errors, status=400)




@api_view(['GET'])
def manage_vehicle(request):
    vehicles = Vehicle.objects.all()
    
    serializer = Vehicleserializer(vehicles, many=True, context={'request': request})
    return Response(serializer.data, status=200)

@api_view(['PUT'])
def update_company(request, company_id):
    company = Company.objects.get(id=company_id)
    updatedCompany = Companyserializer(company, data=request.data)
    if updatedCompany.is_valid():
        updatedCompany.save()
        return Response({'message' : 'Company Updated Successfully !..'},status = 200)
    


@api_view(['DELETE'])
def delete_company(request, company_id):
   try:
        company = Company.objects.get(id=company_id)
        company.delete()
        return Response({'message' : 'Company Deleted Successfully !..'},status = 200)
   except:
       return Response({'message' : 'Company Not found'},status = 404)



@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_vehicle(request, vehicle_id):
    vehicle = Vehicle.objects.get(id=vehicle_id)
    updatedVehicle = VehicleCreateSerializer(vehicle, data=request.data)
    if updatedVehicle.is_valid():
        updatedVehicle.save()
        return Response({'message' : 'Vehicle Updated Successfully !..'},status = 200)
    else:
        return Response({'message' : 'Vehicle Cannot Updated try again !..'},status = 401)
    


@api_view(['POST'])
def user_signup(request):
    userData = Userserializer(data=request.data)
    try:
        if userData.is_valid():
            userData.save()
            return Response({'message' : 'SignUp Successfully !..'},status = 200)
    except:
        return Response({'message' : 'Try Again !..'},status = 401)
    


@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email, password=password)
        return Response({'message' : 'Login Successfully !..','userID':user.id, 'fullname':user.first_name},status = 200)
    except:
        return Response({'message' : 'Invalid Credentials !..'},status = 401)
    

@api_view(['GET'])
def search_vehicle(request):
    company_id = request.GET.get('company')
    vehicle_fuel_type = request.GET.get('fueltype')

    try:
        vehicles = Vehicle.objects.filter(company_id=company_id, vehicle_fuel_type=vehicle_fuel_type)
        serializer = Vehicleserializer(vehicles, many=True, context={'request': request})
        return Response({'searchedVehicle': serializer.data}, status=200)
    except:
        return Response({'message' : 'Somthing went wrong !..'},status = 401)



@api_view(['GET'])
def detail_vehicle(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response({'error': 'Vehicle not found'}, status=404)

    detailvehicle = Vehicleserializer(vehicle, context={'request': request})
    return Response({'detailVehicle': detailvehicle.data}, status=200)




from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def vehicle_booking(request):
    try:
        # Get data from request
        data = request.data
        
        # Validate required fields exist
        required_fields = ['user_id', 'vehicle_id', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                return Response({'error': f'Missing required field: {field}'}, status=400)
        
        # Prepare booking data
        booking_data = {
            'user': data['user_id'],
            'vehicle': data['vehicle_id'],
            'start_date': data['start_date'],
            'end_date': data['end_date'],
            'booking_desc': data.get('description', ''),
        }
        
        serializer = BookingSerializer(data=booking_data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'booking_id': serializer.data['booking_id'],
                'total_price': serializer.data['total_price']
            }, status=201)
        
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=400)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)


@api_view(['GET'])
def user_bookings(request, user_id):
    bookings = Booking.objects.filter(user=user_id)  # Query from model, not serializer
    userBookings = BookingSerializer(bookings, many=True, context={'request': request})
    return Response({'userBookings': userBookings.data}, status=200)

@api_view(['GET'])
def all_bookings(request):
    bookings = Booking.objects.all()
    allBookings = BookingSerializer(bookings, many=True)
    return Response(allBookings.data)


@api_view(['PUT'])
def update_booking_status(request, booking_id):
    try:
        booking = Booking.objects.get(booking_id=booking_id)
        status = request.data.get('status')
        
        if status not in ['PENDING', 'APPROVED', 'CANCELLED']:
            return Response({'error': 'Invalid status'}, status=400)
        booking.status = status
        booking.save()
        return Response({'message': 'Booking status updated'}, status=200)
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=404)
        
        