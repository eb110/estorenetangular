//we cant use the generic repository for redis
//implement in program.cs

using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            //connect to redis!!
            _database = redis.GetDatabase();
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);

            //redis stores the data as json strings - have to deserialize it
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            //create or update => automatically handled by redis
            var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket),
            //business decission => memory cost so ideally this value should be calculated accorind to 
            //the theoretical number of customers etc et => 30 days in tis example
            TimeSpan.FromDays(30));
            if(!created) return null;

            //return newly created/updated basket
            return await GetBasketAsync(basket.Id);
        }
    }
}