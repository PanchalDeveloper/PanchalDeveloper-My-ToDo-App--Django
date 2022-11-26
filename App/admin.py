from django.contrib import admin
from App.models import Todo, TrashedTodo

# Register your models here.

admin.site.register(Todo)
admin.site.register(TrashedTodo)
