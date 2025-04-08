using System.Text.Json.Serialization;

namespace PlotPocket.Server.Models.Responses;

public class MovieResponse {
    /*
        TODO: 
        Define the model based on the response from the Movie endpoints from
        The Movie Database's API. Be sure to use the [JsonPropertyName("<property>")] attribue
        above each of your C# properties to ensure that the JSON maps properly to your objects.
    */
}

public class Date {
   /*
			  This model is used on the Movie's "Now Playing" endpoint.
			  You will notice with that endpoint that there are some dates
			  for the minimum and maximum dates that the movies were playing.

			  This Date model is not strictly necessary as we are not
			  doing anything with this in our app. So may omit this if
			  you would like.
		   
        TODO: 
        Define the model based on the response from the Movie endpoints from
        The Movie Database's API. Be sure to use the [JsonPropertyName("<property>")] attribue
        above each of your C# properties to ensure that the JSON maps properly to your objects.
    */
}

public class Movie : ApiMediaItem {
   /*
        TODO: 
        Define the model based on the response from the Movie endpoints from
        The Movie Database's API. Be sure to use the [JsonPropertyName("<property>")] attribue
        above each of your C# properties to ensure that the JSON maps properly to your objects.
    */
}