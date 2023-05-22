const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '17ebf0c89e914f6ffdd442c413a6c3ac',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;