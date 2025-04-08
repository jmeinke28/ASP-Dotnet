// using Microsoft.CodeAnalysis;
// using Microsoft.EntityFrameworkCore;
// using PlotPocket.Server.Data;
// using PlotPocket.Server.Models.Dtos;
// using PlotPocket.Server.Models.Entities;
// using PlotPocket.Server.Models.Responses;

// namespace PlotPocket.Server.Services;

// public class ShowService {
//     /*
//         TODO:
//         Declare appropriate instance variables needed to:
//             - Access the database
//             - Access the appsettings.json coniguration file so as to reach the
//                 TMDB property we created there.
//     */

//     public ShowService(/* Use dependency injection to pass in necessary objects */) {
//         /*
//             TODO:
//             Set instance variables accordingly.
//         */
//     }

//     /**
//      * Below can be used for converting return objects from the Trending endpoints 
//      * to ShowDtos. 
//      * 
//      * TODO: Make sure to fill in the ShowDto properties on the return of this method.
//      *          You should **NOT** need to modify anything else.
//      * 
//      **/
//     public ShowDto MediaItemToShowDto(MediaItem mediaItem, string? userId) {
//         string? dateToParse = mediaItem switch {
//             Movie movie => movie.ReleaseDate,
//             TvShow tvShow => tvShow.FirstAirDate,
//             Trending trendingShow => trendingShow.ReleaseDate ?? trendingShow.FirstAirDate,
//             _ => null
//         };

//         var date = DateTime.TryParse(dateToParse, out DateTime parsedDate) ? parsedDate : (DateTime?)null;        
        
//         int existingShowId = null != userId ? this.ShowExistsForLoggedInUser(mediaItem.Id, userId) : 0;
        
//         string? title;
//         if(mediaItem is Trending trendingMedia) {
//             title = trendingMedia.MediaType == "movie" ? trendingMedia.Title : trendingMedia?.Name;

//         } else {
//             title = (mediaItem as Movie)?.Title ?? (mediaItem as TvShow)?.Name;
//         }


// 				return new ShowDto {
//             Id = existingShowId,
//             ShowApiId = mediaItem.Id,
//             Type = mediaItem is Trending trendingItem ? trendingItem.MediaType : (mediaItem is Movie ? "Movie" : "TV Show"),
//             Title = /* TODO: Set value */,
//             Date = /* TODO: Set value */,
//             PosterPath = /* TODO: Set value */
//         };        
//     }

//     public ShowDto ShowToShowDto(Show show){
//         // TODO: Implement
//     }    

//     public ShowDto MovieToShowDto(Movie movie, string? userId) {
//        // TODO: Implement
//     }

//     public ShowDto TvShowToShowDto(TvShow tvShow, string? userId) {
//         // TODO: Implement
//     }
    
//     public int ShowExistsForLoggedInUser(int showApiId, string? userId) {
//         int existingShowId = 0;
//         if (null != userId) {
//             // TODO: Implement
//         }

//         return existingShowId;
//     }
    
// }
