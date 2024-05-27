from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import CustomUser, Book, BookList, Review, Like


class BookTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')
        self.book = Book.objects.create(title='Test Book', author='Test Author', isbn='1234567890123')

    def test_create_book(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('book-list')
        data = {'title': 'New Book', 'author': 'New Author', 'isbn': '9876543210987'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class BookListTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')
        self.book = Book.objects.create(title='Test Book', author='Test Author', isbn='1234567890123')
        self.booklist = BookList.objects.create(user=self.user, book=self.book, status='want_to_read')

    def test_create_booklist(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('booklist-list')
        data = {'book': self.book.id, 'status': 'reading'}  # Передаем ID книги напрямую
        response = self.client.post(url, data, format='json')
        print(response.data)  # Вывод ошибки
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ReviewTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')
        self.book = Book.objects.create(title='Test Book', author='Test Author', isbn='1234567890123')
        self.review = Review.objects.create(user=self.user, book=self.book, rating=5, review_text='Great book!')

    def test_create_review(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('review-list')
        data = {'book': self.book.id, 'rating': 4, 'review_text': 'Interesting read.'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LikeTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')
        self.book = Book.objects.create(title='Test Book', author='Test Author', isbn='1234567890123')
        self.review = Review.objects.create(user=self.user, book=self.book, rating=5, review_text='Great book!')
        self.like = Like.objects.create(user=self.user, review=self.review)

    def test_create_like(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('like-list')
        data = {'review': self.review.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
