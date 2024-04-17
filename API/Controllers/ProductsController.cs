using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using System.Net.Http.Headers;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{ 
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _productsBrandRepo;
        private readonly IGenericRepository<ProductType> _productsTypeRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Product> _productsRepo;

        public ProductsController
        (
            IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productBrandsRepo,
            IGenericRepository<ProductType> productTypesRepo,
            IMapper mapper
        )
        {
            _productsBrandRepo = productBrandsRepo;
            _productsTypeRepo = productTypesRepo;
            _mapper = mapper;
            _productsRepo = productsRepo;
        }

        [HttpGet]
        //from query as parameters are sent as query parameters /api/products?serach=dupa&anotherparametr=dupa2
        //the individual parameters will automatically end up in the class properties 
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);

            var products = await _productsRepo.ListAsync(spec);

            var productsDto = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>
            (
                productParams.PageIndex,
                productParams.PageSize,
                totalItems,
                productsDto
            ));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var productBrands = await _productsBrandRepo.ListAllAsync();
            return Ok(productBrands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var productTypes = await _productsTypeRepo.ListAllAsync();
            return Ok(productTypes);
        }

        [HttpGet("{id}")]
        //for swagger purpose => we have to inform what type of response is expected
        [ProducesResponseType(StatusCodes.Status200OK)]
        //typeof informs the swagger of the type of response to expect in case of 404
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

            if(product == null) return NotFound(new ApiResponse(404));

            var productDto = _mapper.Map<Product, ProductToReturnDto>(product);
            return Ok(productDto);
        }
    }
}