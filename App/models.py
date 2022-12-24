from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=200,default="")
    description = models.TextField(max_length=100000,default="")
    todoTime = models.DateTimeField(auto_now_add=True)
    Auther = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    
    def __str__(self):
        return f"{self.title} | {self.Auther} | {self.todoTime}"
    
class TrashedTodo(models.Model):
    title = models.CharField(max_length=200,default="")
    description = models.TextField(max_length=100000,default="")
    todoTime = models.DateTimeField(auto_now_add=False)
    Auther = models.ForeignKey(User, on_delete=models.CASCADE,default=None,null=True)
    
    def __str__(self):
        return f"{self.title} | {self.Auther} | {self.todoTime}"
    