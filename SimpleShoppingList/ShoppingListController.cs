using Microsoft.AspNetCore.Mvc;
using System.Web.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleShoppingList
{
    public class ShoppingListController : Controller
    {
        List<ShoppingList> shoppingLists = new List<ShoppingList>
        {
            new ShoppingList() { Id=0, Name="Groceries"},
            new ShoppingList() { Id=1, Name="Hardware"}
        };

        // GET api/<ShoppingListController>/5
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public IHttpActionResult Get(int id)
        {
            ShoppingList result =
                shoppingLists.FirstOrDefault(s => s.Id == id);

            if (result == null)
            {
                return (IHttpActionResult)NotFound();
            }
            return (IHttpActionResult)Ok(result);
        }

        // POST api/<ShoppingListController>
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public void Post([Microsoft.AspNetCore.Mvc.FromBody] string value)
        {
        }
    }
}
