using System;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Server.Models;

namespace Server.Auth
{
    public class TokenGenerator
    {
        private readonly IOptions<AuthOptions> _authOptions;

        public TokenGenerator(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        public string GenerateToken(User user, string userType)
        {
            var authParams = _authOptions.Value;
            var credentials =
                new SigningCredentials(authParams.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Login),
                new Claim(JwtRegisteredClaimNames.Sub, user.IdUser.ToString()),
                new Claim("role", userType)
            };

            var jwtSecurityToken = new JwtSecurityToken(
                authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.UtcNow.AddDays(authParams.Lifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }
    }
}
