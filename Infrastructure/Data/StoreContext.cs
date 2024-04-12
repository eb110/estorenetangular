using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }

        //to configure columns and tables db creation => go to ProductConfiguration.cs
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //sqlite can not store decimals -> convert to double
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach(var entType in modelBuilder.Model.GetEntityTypes())
                {
                    var properites = entType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    foreach(var prop in properites)
                    {
                        modelBuilder.Entity(entType.Name).Property(prop.Name).HasConversion<double>();
                    }
                }
            }
        }
    }
}