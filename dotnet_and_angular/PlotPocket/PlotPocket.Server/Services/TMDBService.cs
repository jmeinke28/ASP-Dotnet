using RestSharp;
using PlotPocket.Server.Models.Responses;
using PlotPocket.Server.Models.Dtos;
using System.Text.Json;

namespace PlotPocket.Server.Services;

public class TMDBService {
    private readonly RestClient _restClient;
    private readonly string? _apiKey;
    private readonly string? _baseUrl;
    
    public TMDBService(IConfiguration configuration) {
        _apiKey = configuration["TMDB:ApiKey"];
        _baseUrl = configuration["TMDB:BaseUrl"] ?? "";
        _restClient = new RestClient(_baseUrl);
    }

    // 1. Get Trending (All Media)
    public async Task<TrendingResponse> GetTrendingShowsAsync(string timeWindow = "day") {
        var request = new RestRequest($"/trending/all/{timeWindow}?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TrendingResponse? trendingResp = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

        return trendingResp ?? new TrendingResponse { Results = new List<Trending>() };
    }

    // 2. Get Trending Movies
    public async Task<TrendingResponse> GetTrendingMoviesAsync(string timeWindow = "day") {
        var request = new RestRequest($"/trending/movie/{timeWindow}?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TrendingResponse? trendingMovies = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

        return trendingMovies ?? new TrendingResponse { Results = new List<Trending>() };
    }

    // 3. Get Trending TV Shows
    public async Task<TrendingResponse> GetTrendingTvShowsAsync(string timeWindow = "day") {
        var request = new RestRequest($"/trending/tv/{timeWindow}?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TrendingResponse? trendingTvShows = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

        return trendingTvShows ?? new TrendingResponse { Results = new List<Trending>() };
    }

    // 4. Get Now Playing Movies
    public async Task<MovieResponse> GetNowPlayingMoviesAsync() {
        var request = new RestRequest($"/movie/now_playing?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        MovieResponse? nowPlayingMovies = JsonSerializer.Deserialize<MovieResponse>(response.Content);

        return nowPlayingMovies ?? new MovieResponse { Results = new List<Movie>() };
    }

    // 5. Get Top Rated Movies
    public async Task<MovieResponse> GetTopRatedMoviesAsync() {
        var request = new RestRequest($"/movie/top_rated?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        MovieResponse? topRatedMovies = JsonSerializer.Deserialize<MovieResponse>(response.Content);

        return topRatedMovies ?? new MovieResponse { Results = new List<Movie>() };
    }

    // 6. Get Popular Movies
    public async Task<MovieResponse> GetPopularMoviesAsync() {
        var request = new RestRequest($"/movie/popular?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        MovieResponse? popularMovies = JsonSerializer.Deserialize<MovieResponse>(response.Content);

        return popularMovies ?? new MovieResponse { Results = new List<Movie>() };
    }

    // 7. Get Airing Today TV Shows
    public async Task<TvShowResponse> GetAiringTodayTvShowsAsync() {
        var request = new RestRequest($"/tv/airing_today?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TvShowResponse? airingTodayTvShows = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

        return airingTodayTvShows ?? new TvShowResponse { Results = new List<TvShow>() };
    }

    // 8. Get Top Rated TV Shows
    public async Task<TvShowResponse> GetTopRatedTvShowsAsync() {
        var request = new RestRequest($"/tv/top_rated?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TvShowResponse? topRatedTvShows = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

        return topRatedTvShows ?? new TvShowResponse { Results = new List<TvShow>() };
    }

    // 9. Get Popular TV Shows
    public async Task<TvShowResponse> GetPopularTvShowsAsync() {
        var request = new RestRequest($"/tv/popular?api_key={_apiKey}")
                      .AddHeader("accept", "application/json");

        var response = await _restClient.GetAsync(request);

        TvShowResponse? popularTvShows = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

        return popularTvShows ?? new TvShowResponse { Results = new List<TvShow>() };
    }
}