import zoneinfo
from django.utils import timezone

class TimezoneMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
        tz_name = request.session.get('django_timezone')
        if not tz_name:
            tz_name = 'Asia/Kolkata'
        if tz_name:
            timezone.activate(zoneinfo.ZoneInfo(tz_name))
        else:
            timezone.deactivate()
        return self.get_response(request)