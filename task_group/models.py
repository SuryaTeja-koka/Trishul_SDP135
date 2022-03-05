from django.db import models
from django.urls import reverse


class User(models.Model):
    fullname = models.CharField(max_length=100)


class Catagories (models.Model):
    catagories_name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.catagories_name

    def get_absolute_url(self):
        return reverse("task_group:cdetail", kwargs={'pk': self.pk})


class Task(models.Model):
    Catagories = models.ForeignKey(
        Catagories, related_name='Task', on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    created_date = models.DateTimeField(auto_now_add=True)
   # dead_line = models.DateTimeField()
    done = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_date"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("task_group:tdetail", kwargs={'pk': self.pk})


class Appointment(models.Model):
    DocId = models.CharField(max_length=100, blank=False)
    DocName = models.CharField(max_length=100, blank=False)
    Doc_Mail = models.EmailField(max_length=100, blank=False)
    Date_Time = models.DateTimeField(max_length=100, blank=False)
    Specilization = models.CharField(max_length=100, default="", blank=False)
    Patient_Name = models.CharField(max_length=100, blank=False)
    done = models.BooleanField(default=False)

    class Meta:
        db_table = "appointment"


Designation = (
    ('doctor', 'DOCTOR'),
    ('patient', 'PATIENT'),
)


class User(models.Model):
    fullname = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=False)
    username = models.CharField(max_length=100, blank=False)
    password = models.CharField(max_length=100, blank=False)
    mobileno = models.CharField(max_length=100, blank=False)
    location = models.CharField(max_length=100, blank=False)

    choice = models.CharField(
        max_length=10, choices=Designation, default='doctor')

    class Meta:
        db_table = "user_table"


class MyModel(models.Model):
    designation = models.CharField(
        max_length=10, choices=Designation, default='doctor')
