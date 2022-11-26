--> Demo Account:-
        ID - demo
        Password - demo

--> For fresh DataBase, Delete the '/db.sqlite3' file & run below commands:-
        python ./manage.py makemigrations
        python ./manage.py migrate		
		
--> For Production Server "DEBUG = False" & "ALLOWED_HOSTS" in Project 'settings.py'

--> Set "CSRF_TRUSTED_ORIGINS = ['https://trusted-origin-example.com']" to avoide getting CSRF Tocken Related Errors. (in  Django 4.0 or Above)
