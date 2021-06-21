from django.conf import settings
from django.core.mail import EmailMessage
from django.shortcuts import render, redirect
from django.http import HttpResponse

from task_group.models import Appointment, User
from task_group.forms import RegistrationForm


from django.db.models import Q


def project(request):
    return render(request, "index.html")


def indexfunction(request):
    return render(request, "index.html")


def loginfunction(request):
    return render(request, "plogin.html")


def pappointmentfunction(request, uname):
    ap = Appointment.objects.filter(uname=uname)
    return render(request, "pappointment.html/", {'ap': ap})


def visualizationfunction(request):
    return render(request, "SDP_135_Survey_DataVisualization.html")


def mp2function(request):
    return render(request, "mp2index.html")


def registerfunction(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/login')
    else:
        form = RegistrationForm()
    return render(request, 'pregistration.html', {'form': form})


def pappointmentfunction(request, uname):
    ap = Appointment.objects.filter(Patient_Name=uname)
    return render(request, "pappointment.html", {'ap': ap})


def appointmentfunction(request):
    ap = Appointment.objects.all()
    return render(request, "appointment.html", {'ap': ap})


def sendmail(request):
    subject = "Y19 PFSD Django Sessions"
    email = "tejasurya274@gmail.com"  # to whom you want to send
    # to will take list of email IDs
    email = EmailMessage(subject, "All The Best", to=[email])
    email.send()
    return HttpResponse("Success")


def deleteuser(request, id):
    Appointment.objects.filter(id=id).delete()
    ap = Appointment.objects.all()
    return render(request, "appointment.html", {'ap': ap})


def updateuser(request, id):
    Appointment.objects.filter(id=id).update(done=True)

    # t.update(done='True')  # this will update only
    ap = Appointment.objects.all()
    return render(request, "appointment.html", {'ap': ap})


def checkuserfunction(request):
    if request.method == "POST":
        uname = request.POST['uname']
        pwd = request.POST['pwd']
        choice = request.POST.get('choice')
        flag = User.objects.filter(
            Q(username__iexact=uname) & Q(password__iexact=pwd) & Q(choice__iexact=choice))
        if flag:
            if(choice == 'doctor'):
                return redirect("/tasklist")
            else:
                return redirect("/pappointment/"+uname)
        else:
            return HttpResponse("Login Invalid")
    else:
        return render("plogin.html")

    return render("plogin.html")
