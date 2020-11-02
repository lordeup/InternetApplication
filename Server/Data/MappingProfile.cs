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

            CreateMap<Movie, MovieViewModel>();
            CreateMap<MovieViewModel, Movie>();
        }
    }
}