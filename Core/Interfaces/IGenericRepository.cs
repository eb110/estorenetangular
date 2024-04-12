using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    //only classes that derives from BaseEntity class
    //this is why it is useful to gather all entites around a simple concrete class
    //this will make sure that only entities can be applied to generic repository
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
    }
}