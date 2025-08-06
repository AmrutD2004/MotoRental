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
    
    try:
        vehicleData = Vehicleserializer(data=request.data)
        if vehicleData.is_valid():
            vehicleData.save()
        return Response({'message' : 'Vehicle Added Successfully !..'},status = 200)
    except:
        return Response({'message' : 'Vehicle Cannot Added try again !..'},status = 401)


@api_view(['GET'])
def manage_vehicle(request):

    vehicles = Vehicle.objects.all()
    vehicleData = Vehicleserializer(vehicles, many=True)
    return Response(vehicleData.data)

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
    updatedVehicle = Vehicleserializer(vehicle, data=request.data)
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