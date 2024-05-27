from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Book, BookList, Review, Like, Follow, BookClub


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


# Регистрация моделей в админ-панели
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Book)
admin.site.register(BookList)
admin.site.register(Review)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.register(BookClub)
