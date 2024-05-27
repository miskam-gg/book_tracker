from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import views as auth_views
from .views import BookViewSet, BookListViewSet, ReviewViewSet, LikeViewSet, recommendations, FollowViewSet, \
    BookClubViewSet, CurrentUserView

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'booklists', BookListViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'bookclubs', BookClubViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('recommendations/', recommendations, name='recommendations'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('users/me/', CurrentUserView.as_view(), name='current_user'),
]
