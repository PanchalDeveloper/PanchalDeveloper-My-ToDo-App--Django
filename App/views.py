from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from datetime import datetime
from App.models import Todo, TrashedTodo
from App import auth


# Website Home
def index(request):
    # Set TimeZone
    if request.method == "POST" and request.POST.get(
            'currTimeZone') and request.POST.get('timeZoneChanged') == 'True':
        request.session['django_timezone'] = request.POST['currTimeZone']
        return redirect(index)

    # Adding To-do
    if (request.user.is_anonymous):
        return redirect(auth.logIn)
    else:
        user = request.user
        todos = Todo.objects.all().filter(Auther=user)
        context = {"user": user, "todos": todos}

        if request.method == "POST":
            title = request.POST.get("title").capitalize()
            description = request.POST.get("desc")

            if (user is not None):
                todo = Todo(title=title, description=description, Auther=user)
                todo.save()
                messages.success(request, 'Added Todo Successfully !')
                return redirect(index)
    return render(request, "app/index.html", {
        'timezones': auth.timezones,
        **context
    })


# Update Todo


def updateTodo(request, todo_id):
    user = request.user
    try:
        todo = Todo.objects.get(id=todo_id)
    except:
        todo = None
    if (todo is not None):
        context = {"user": user, "todo": todo}

        if (todo.Auther == user):
            if request.method == "POST":
                title = request.POST.get("title").capitalize()
                description = request.POST.get("desc")

                if ((user is not None) and (not user.is_anonymous)):
                    todo.title = title
                    todo.description = description
                    todo.save()
                    messages.success(request, 'Todo Updated Successfully !')
                    return redirect(index)
    else:
        messages.error(request, 'No Todo Found.', extra_tags="danger")
        return redirect(index)
    return render(request, "app/updateTodo.html", {
        'timezones': auth.timezones,
        **context
    })


# View Deleted Todos in TrashBin


def trashBin(request):
    if (request.user.is_anonymous):
        return redirect(auth.logIn)
    else:
        user = request.user
        todos = TrashedTodo.objects.all().filter(Auther=user)
        context = {"user": user, "todos": todos}

    return render(request, "app/trashedTodos.html", {
        'timezones': auth.timezones,
        **context
    })


# Delete A Single Todo


def deleteTodo(request, todo_id):
    user = request.user
    try:
        todo = Todo.objects.get(id=todo_id)
    except:
        todo = None
    if (todo.Auther == user):
        if (todo is not None):
            if ((user is not None) and (not user.is_anonymous)):
                deletedTodo = TrashedTodo(id=todo.id, title=todo.title, description=todo.description, todoTime=todo.todoTime, Auther_id=todo.Auther_id)
                deletedTodo.save()
                todo.delete()
                messages.success(request, 'Deleted Todo Successfully !')
    else:
        messages.error(request, 'No Todo Found.', extra_tags="danger")
        return redirect(index)
    return redirect(index)


# Restore A Todo


def restoreTodo(request, todo_id):
    user = request.user
    try:
        deletedTodo = TrashedTodo.objects.get(id=todo_id)
    except:
        deletedTodo = None

    if (deletedTodo.Auther == user):
        if (deletedTodo is not None):
            if ((user is not None) and (not user.is_anonymous)):
                todo = Todo(id=deletedTodo.id, title=deletedTodo.title, description=deletedTodo.description, todoTime=deletedTodo.todoTime, Auther_id=deletedTodo.Auther_id)
                todo.save()
                todo = Todo.objects.get(id=deletedTodo.id)
                todo.todoTime = deletedTodo.todoTime
                todo.save()
                deletedTodo.delete()
                messages.success(request, 'Restored Todo Successfully !')
    else:
        messages.error(request, 'No Todo Found.', extra_tags="danger")
        return redirect(index)
    return redirect(index)


# Premanently Delete Todos from TrashBin


def delTrashTodo(request, todo_id):
    user = request.user
    try:
        todo = TrashedTodo.objects.get(id=todo_id)
    except:
        todo = None
    if (todo is not None):
        if ((user is not None) and (not user.is_anonymous)):
            if (todo.Auther == user):
                todo.delete()
                messages.success(request,
                                 'Successfully Deleted Todo Permanently !')
    else:
        messages.error(request, 'No Todo Found.', extra_tags="danger")
        return redirect(trashBin)
    return redirect(trashBin)


# Delete All Trashed Todos At Once


def clearTrashBin(request):
    if (request.method == 'POST'):
        user = request.user
        if ((user is not None) and (not user.is_anonymous)):
            try:
                todos = TrashedTodo.objects.all().filter(Auther=user)
                if (todos.first() is not None):
                    todos.delete()
                    messages.success(request,
                                     'Cleared Trash Bin Successfully !')
                else:
                    messages.warning(request, 'Trash Bin is Already Clear.')
            except:
                messages.error(request, 'No Todo Found.', extra_tags="danger")
    return redirect(index)
