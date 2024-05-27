from sqlite3 import IntegrityError

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .filters import BookFilter
from .models import Book, BookList, Like, Review, Follow, BookClub
from .serializers import BookSerializer, BookListSerializer, LikeSerializer, ReviewSerializer, FollowSerializer, \
    BookClubSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated

from .utils import get_book_info_from_google_books


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class SomeProtectedView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view"})


class BookListViewSet(viewsets.ModelViewSet):
    queryset = BookList.objects.all()  # Добавьте эту строку
    serializer_class = BookListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BookList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'author', 'isbn']
    filterset_class = BookFilter

    def create(self, request, *args, **kwargs):
        isbn = request.data.get('isbn')
        book_info = get_book_info_from_google_books(isbn)

        if book_info:
            request.data['title'] = book_info.get('title', request.data.get('title', ''))
            request.data['author'] = book_info.get('author', request.data.get('author', ''))
            request.data['published_date'] = book_info.get('published_date', request.data.get('published_date', ''))
            request.data['description'] = book_info.get('description', request.data.get('description', ''))

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Like.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
def recommendations(request):
    user = request.user
    # Пример простого алгоритма рекомендаций на основе прочитанных книг
    read_books = BookList.objects.filter(user=user, status='read')
    recommended_books = Book.objects.exclude(id__in=[book.book.id for book in read_books]).order_by('?')[:10]
    serializer = BookSerializer(recommended_books, many=True)
    return Response(serializer.data)


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(follower=self.request.user)
        except IntegrityError as e:
            raise ValidationError({"detail": str(e)})


class BookClubViewSet(viewsets.ModelViewSet):
    queryset = BookClub.objects.all()
    serializer_class = BookClubSerializer
    permission_classes = [permissions.IsAuthenticated]


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

