import django_filters
from .models import Book


class BookFilter(django_filters.FilterSet):
    published_date = django_filters.DateFromToRangeFilter()

    class Meta:
        model = Book
        fields = ['author', 'published_date']
