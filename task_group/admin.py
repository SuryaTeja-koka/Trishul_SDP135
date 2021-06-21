from django.contrib import admin
from .models import Catagories, Task, Appointment, User

admin.site.register(Task)
admin.site.register(Appointment)
admin.site.register(User)

# Register your models here.
