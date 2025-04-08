// using RestSharp;
// using PlotPocket.Server.Models.Responses;
// using System.Text.Json;

// namespace PlotPocket.Server.Services;

// public class TMDBService {
// 	private readonly RestClient _restClient;
// 	private readonly string? _apiKey;
// 	private readonly string? _baseUrl;
	
// 	public TMDBService(IConfiguration configuration) {
// 		/*
// 			Get your API key from the appSettings.json.
// 		*/
// 		_apiKey = configuration["TMDB:ApiKey"];
// 		 /* 
// 			 This is how we are reading the TMBD data in the appSettings.json file.
// 		 */
// 		_baseUrl = configuration["TMDB:BaseUrl"] ?? "";
// 		/*
// 			The base url that we are requesting to the api stays the same for all endpoints.
// 			the only thing that is changing is the uri. We will build the appropriate uri in the
// 			each below method.
// 		*/
// 		_restClient = new RestClient(_baseUrl);
// 	}
	
// 	public async Task<TrendingResponse> GetTrendingShowsAsync(string timeWindow = "day") {
//     var request = new RestRequest($"/trending/all/{timeWindow}?api_key={_apiKey}")
//                   .AddHeader("accept", "application/json"); // This header says that we are expecting JSON as a response.

//     var response = await _restClient.GetAsync(request);
		
// 		/*
// 			We have received JSON as a response from the API. Because we are hitting on of the Trending endpoints,
// 			the JSON that we receive back (stored in the response's Content property) is of type TrendingResponse that
// 			have defined based on this structure we get back from the API.
// 		*/
//     TrendingResponse? trendingRespResp = JsonSerializer.Deserialize<TrendingResponse>(response.Content);

//     return trendingRespResp ?? new TrendingResponse { Results = new List<Trending>() };
// 	}
	
// 	/**
// 	 * TODO:
// 	 * Implement methods to hit the following endpoints. Write any helper methods that you see fit
// 	 * following good design practices.
// 	 * 
// 	 * Trending
// 	 * ----------
// 	 * - All Trending (DONE above)
// 	 * - Trending Movies
// 	 * - Trending TvShows
// 	 * 
// 	 * Movies
// 	 * ----------
// 	 * - Now Playing Movies
// 	 * - Top Rated Movies
// 	 * - Popular Movies
// 	 * 
// 	 * TvShows
// 	 * ----------
// 	 * - Airing Today TvShows
// 	 * - Top Rated TvShows
// 	 * - Popular TvShows
// 	 * 
// 	 * */

// }