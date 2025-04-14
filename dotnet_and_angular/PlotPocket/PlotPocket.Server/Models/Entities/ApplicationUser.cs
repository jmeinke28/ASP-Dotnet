using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PlotPocket.Server.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Show> Shows { get; set; } = new List<Show>();
    }
}
