using AutoMapper;
using Server.Models;
using Server.ViewModels;

namespace Server.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();

            CreateMap<UserType, UserTypeViewModel>();
            CreateMap<UserTypeViewModel, UserType>();

            CreateMap<Movie, MovieViewModel>();
            CreateMap<MovieViewModel, Movie>();

            CreateMap<MovieRating, MovieRatingViewModel>();
            CreateMap<MovieRatingViewModel, MovieRating>();

            CreateMap<MovieTag, MovieTagViewModel>();
            CreateMap<MovieTagViewModel, MovieTag>();

            CreateMap<MovieHasMovieTag, MovieHasMovieTagViewModel>();
            CreateMap<MovieHasMovieTagViewModel, MovieHasMovieTag>();

            CreateMap<Review, ReviewViewModel>();
            CreateMap<ReviewViewModel, Review>();
        }
    }
}
