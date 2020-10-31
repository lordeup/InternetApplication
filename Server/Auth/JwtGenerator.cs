using System;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Server.Models;

namespace Server.Auth
{
    public class JwtGenerator
    {
        private readonly IOptions<AuthOptions> _authOptions;

        public JwtGenerator(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        public string GenerateJwt(User user)
        {
            var authParams = _authOptions.Value;
            var credentials =
                new SigningCredentials(authParams.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Login),
                new Claim(JwtRegisteredClaimNames.Sub, user.IdUser.ToString()),
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