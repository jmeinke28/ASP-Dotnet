using RestSharp;
using PlotPocket.Server.Models.Responses;
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
	
	public async Task<TrendingResponse> GetTrendingShowsAsync(string timeWindow = "day") {
    var request = new RestRequest($"/trending/all/{timeWindow}?api_key={_apiKey}")
                  .AddHeader("accept", "application/json"); 

    var response = await _restClient.GetAsync(request);
		
    TrendingResponse? trendingResp = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

    return trendingResp ?? new TrendingResponse();

	}

	public async Task<TrendingResponse> GetTrendingMoviesAsync(string timeWindow = "day") {
		var request = new RestRequest($"/trending/movie/{timeWindow}?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		TrendingResponse? trendingResp = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

		return trendingResp ?? new TrendingResponse();
	}

	public async Task<TrendingResponse> GetTrendingTvShowsAsync(string timeWindow = "day") {
		var request = new RestRequest($"/trending/tv/{timeWindow}?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		TrendingResponse? trendingResp = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

		return trendingResp ?? new TrendingResponse();
	}

	public async Task<MovieResponse> GetNowPlayingMoviesAsync() {
		var request = new RestRequest($"/movie/now_playing?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		MovieResponse? movieResp = JsonSerializer.Deserialize<MovieResponse>(response.Content);

		return movieResp ?? new MovieResponse();
	}

	public async Task<MovieResponse> GetTopRatedMoviesAsync() {
		var request = new RestRequest($"/movie/top_rated?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		MovieResponse? movieResp = JsonSerializer.Deserialize<MovieResponse>(response.Content);

		return movieResp ?? new MovieResponse();
	}

	public async Task<MovieResponse> GetPopularMoviesAsync() {
		var request = new RestRequest($"/movie/popular?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		MovieResponse? movieResp = JsonSerializer.Deserialize<MovieResponse>(response.Content);

		return movieResp ?? new MovieResponse();
	}

	public async Task<TvShowResponse> GetAiringTodayTvShowsAsync() {
		var request = new RestRequest($"/tv/airing_today?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		TvShowResponse? tvShowResp = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

		return tvShowResp ?? new TvShowResponse();
	}

	public async Task<TvShowResponse> GetTopRatedTvShowsAsync() {
		var request = new RestRequest($"/tv/top_rated?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);	

		TvShowResponse? tvShowResp = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

		return tvShowResp ?? new TvShowResponse();
	}

	public async Task<TvShowResponse> GetPopularTvShowsAsync() {
		var request = new RestRequest($"/tv/popular?api_key={_apiKey}").AddHeader("accept", "application/json");

		var response = await _restClient.GetAsync(request);

		TvShowResponse? tvShowResp = JsonSerializer.Deserialize<TvShowResponse>(response.Content);

		return tvShowResp ?? new TvShowResponse();
	}
}