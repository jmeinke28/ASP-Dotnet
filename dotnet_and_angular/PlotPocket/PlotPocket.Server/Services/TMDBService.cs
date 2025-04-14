using System.Text.Json;
using PlotPocket.Server.Models.Responses;
using RestSharp;

namespace PlotPocket.Server.Services;

public class TMDBService
{
    private readonly RestClient _restClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public TMDBService(IConfiguration configuration)
    {
        _apiKey = configuration["TMDB:ApiKey"] ?? throw new ArgumentNullException("TMDB:ApiKey");
        _baseUrl = configuration["TMDB:BaseUrl"] ?? throw new ArgumentNullException("TMDB:BaseUrl");
        _restClient = new RestClient(_baseUrl);
    }

    private static T DeserializeOrDefault<T>(string? json)
        where T : new()
    {
        if (string.IsNullOrWhiteSpace(json))
            return new T();

        try
        {
            return JsonSerializer.Deserialize<T>(json) ?? new T();
        }
        catch
        {
            return new T();
        }
    }

    public async Task<TrendingResponse> GetTrendingShowsAsync(string timeWindow = "day")
    {
        var request = new RestRequest($"/trending/all/{timeWindow}?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TrendingResponse>(response?.Content);
    }

    public async Task<TrendingResponse> GetTrendingMoviesAsync(string timeWindow = "day")
    {
        var request = new RestRequest($"/trending/movie/{timeWindow}?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TrendingResponse>(response?.Content);
    }

    public async Task<TrendingResponse> GetTrendingTvShowsAsync(string timeWindow = "day")
    {
        var request = new RestRequest($"/trending/tv/{timeWindow}?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TrendingResponse>(response?.Content);
    }

    public async Task<MovieResponse> GetNowPlayingMoviesAsync()
    {
        var request = new RestRequest($"/movie/now_playing?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<MovieResponse>(response?.Content);
    }

    public async Task<MovieResponse> GetTopRatedMoviesAsync()
    {
        var request = new RestRequest($"/movie/top_rated?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<MovieResponse>(response?.Content);
    }

    public async Task<MovieResponse> GetPopularMoviesAsync()
    {
        var request = new RestRequest($"/movie/popular?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<MovieResponse>(response?.Content);
    }

    public async Task<TvShowResponse> GetAiringTodayTvShowsAsync()
    {
        var request = new RestRequest($"/tv/airing_today?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TvShowResponse>(response?.Content);
    }

    public async Task<TvShowResponse> GetTopRatedTvShowsAsync()
    {
        var request = new RestRequest($"/tv/top_rated?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TvShowResponse>(response?.Content);
    }

    public async Task<TvShowResponse> GetPopularTvShowsAsync()
    {
        var request = new RestRequest($"/tv/popular?api_key={_apiKey}").AddHeader(
            "accept",
            "application/json"
        );

        var response = await _restClient.GetAsync(request);

        return DeserializeOrDefault<TvShowResponse>(response?.Content);
    }
}
