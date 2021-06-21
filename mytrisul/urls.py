
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),

    path('index/', views.indexfunction, name="index"),
    path('login/', views.loginfunction, name="login"),
    path('register/', views.registerfunction, name="register"),
    path('visualization/', views.visualizationfunction, name="visualization"),
    path('mp2/', views.mp2function, name="mp2"),
    path('appointment/', views.appointmentfunction, name="appointment"),
    path('checkuser/', views.checkuserfunction, name="checkuser"),
    path('pappointment/<str:uname>',
         views.pappointmentfunction, name="pappointment"),

    path('deleteuser/<int:id>', views.deleteuser, name="deleteuser"),
    path('updateuser/<int:id>', views.updateuser, name="updateuser"),

    path('', views.project, name="project"),
    path('', include('task_group.urls')),

]
