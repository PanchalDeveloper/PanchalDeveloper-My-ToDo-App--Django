from tabnanny import check
from unittest import expectedFailure
from django.shortcuts import render, redirect
from django.contrib import messages
from datetime import datetime
from App.models import Todo
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from App import views

# Available Time Zones
timezones = {
    'India (Kolkata)': 'Asia/Kolkata',
    'Japan': 'Japan',
    'London': 'Europe/London',
    'Los Angeles': 'America/Los_Angeles',
    'New York': 'America/New_York',
    'Paris': 'Europe/Paris',
    'South Korea (Seoul)': 'Asia/Seoul',
    'Singapore': 'Asia/Singapore',
}


def logIn(request):

    if (request.user.is_anonymous):
        if request.method == "POST":
            userId = request.POST.get("userId")
            password = request.POST.get("password")
            user = User.objects.filter(username=userId).first()

            if (user is not None):
                if (check_password(password, user.password) and authenticate(username=userId, password=password)):
                    login(request, user=user)
                    messages.success(request, 'Logged-in Successfully !')
                    return redirect(views.index)
                else:
                    messages.error(request, 'Incorrect Password',
                                   extra_tags='danger')
            else:
                messages.error(request, 'User doesn\'t exist',
                               extra_tags='danger')
    else:
        return redirect(views.index)
    return render(request, 'app\\login.html', {'timezones': timezones})


def signUp(request):
    if request.method == "POST":
        firstName = request.POST.get("firstName")
        lastName = request.POST.get("lastName")
        userId = request.POST.get("emailId")
        email = request.POST.get("emailId")
        password = request.POST.get("password")
        confPassword = request.POST.get("confPassword")

        user = User.objects.filter(username=userId).first()

        if (user is not None):
            messages.error(
                request, 'This E-Mail ID already exist in our Database.', extra_tags='danger')
        else:
            if (len(firstName) < 2):
                messages.error(
                    request, 'First Name is too short.', extra_tags='danger')
            elif (lastName == firstName):
                messages.error(
                    request, 'Last Name can\'t be same as The First Name.', extra_tags='danger')
            elif (len(password) < 8):
                messages.error(
                    request, 'Password should be at least 8 characters long.', extra_tags='danger')
            elif (password != confPassword):
                messages.error(
                    request, 'Both The Passwords must be same.', extra_tags='danger')
            else:
                user = User.objects.create_user(
                    username=userId, email=email, password=password)
                user.first_name = firstName
                user.last_name = lastName
                user.save()
                login(request, user=user)
                messages.success(
                    request, 'Your Account has been created Successfully !')
                return redirect(logIn)
    return render(request, 'app\\signup.html', {'timezones': timezones})


def changePassword(request):
    if request.method == "POST":
        userId = request.POST.get("userId")
        oldPassword = request.POST.get("oldPassword")
        newPassword = request.POST.get("newPassword")

        user = User.objects.filter(username=userId).first()
        if (user is not None):
            if (not (newPassword == oldPassword)):
                if (len(newPassword) >= 8):
                    if (check_password(oldPassword, user.password) and authenticate(username=userId, password=oldPassword)):
                        user.set_password(newPassword)
                        user.save()
                        messages.success(
                            request, 'Password Changed Successfully !')
                        login(request, user=user)
                        return redirect(views.index)
                    else:
                        messages.error(
                            request, 'Incorrect Old Password.', extra_tags='danger')
                else:
                    messages.error(
                        request, 'New Password should be at least 8 characters long.', extra_tags='danger')
            else:
                messages.error(
                    request, 'New and Old Passwords should\'t be the same.', extra_tags='danger')
        else:
            messages.error(request, 'User doesn\'t exist', extra_tags='danger')
    return render(request, 'app\\changePassword.html', {'timezones': timezones})

def delMyAc(request):
    if request.method == "POST":
        userId = request.user.id
        user = User.objects.get(id=userId)
        password = request.POST.get("popUpConfirmPass")

        print('user ',user," password ", password)
        if ((user is not None) and (not user.is_anonymous)):
            if (check_password(password, user.password) and authenticate(username=user.username, password=password)):
                user.delete()
                logout(request)
                messages.success(
                    request, 'Your Account has been Deleted Successfully!')
                return redirect(views.index)
            else:
                messages.error(
                    request, 'Incorrect Password.', extra_tags='danger')
        else:
            messages.error(request, 'User doesn\'t exist', extra_tags='danger')
    return redirect(logIn)


def logOut(request):
    logout(request)
    messages.success(request, 'Logged Out Successfully !')
    return redirect(views.index)