import requests


def get_book_info_from_google_books(isbn):
    api_url = f'https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}'
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        if 'items' in data:
            book_data = data['items'][0]['volumeInfo']
            return {
                'title': book_data.get('title', ''),
                'author': ', '.join(book_data.get('authors', [])),
                'published_date': book_data.get('publishedDate', ''),
                'description': book_data.get('description', '')
            }
    return None
