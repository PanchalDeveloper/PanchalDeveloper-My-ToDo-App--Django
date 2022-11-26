from django.urls import path
from App import views, auth

urlpatterns = [
    # Views Path
    path('', views.index, name='home'),
    path('home', views.index, name='_home'),
    path('update-todo/<int:todo_id>', views.updateTodo, name='updateTodo'),
    path('delete-todo/<int:todo_id>', views.deleteTodo, name='deleteTodo'),
    path('trash-bin', views.trashBin, name='trashBin'),
    path('restore-todo/<int:todo_id>', views.restoreTodo, name='restoreTodo'),
    path('delete-trash-todo/<int:todo_id>', views.delTrashTodo, name='delTrashTodo'),
    path('clear-trash-bin', views.clearTrashBin, name='clearTrashBin'),
    path('login', auth.logIn, name='logIn'),
    path('signup', auth.signUp, name='signUp'),
    path('logout', auth.logOut, name='logOut'),
    path('delete-account', auth.delMyAc, name='delMyAc'),
    path('change-password', auth.changePassword, name='changePassword'),
]