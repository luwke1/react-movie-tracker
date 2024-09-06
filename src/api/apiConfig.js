const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '07113a2eb240cc4a2983b6899190ba47',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;