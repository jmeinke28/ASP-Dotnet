using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace PlotPocket.Server.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Show> Shows { get; set; } = new List<Show>();
    }
}
